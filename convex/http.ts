import { httpRouter } from "convex/server";
import { api } from "./_generated/api";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as WebhookEvent;
    } catch (err) {
      return new Response("Invalid signature", { status: 400 });
    }

    if (evt.type === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      // Grab first email address
      const email = email_addresses?.[0]?.email_address || "";

      // Compose full name safely
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.error("Error syncing user:", error);
        return new Response("Error syncing user", { status: 500 });
      }
    }

    if (evt.type === "user.updated") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      // Grab first email address
      const email = email_addresses?.[0]?.email_address || "";

      // Compose full name safely
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.error("Error syncing user:", error);
        return new Response("Error syncing user", { status: 500 });
      }
    }

    return new Response("Webhook Processed Successfully", { status: 200 });
  }),
});

export default http;
