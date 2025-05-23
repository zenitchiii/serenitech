const ResourcesPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg p-10 animate-fadeIn">
        <h1 className="text-4xl font-bold font-sans mb-6 text-primary-foreground">
          Resources & Tools
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Here are the technologies and tools that power <span className="font-semibold text-primary">SereniTech</span>. We've chosen a modern, performant stack to ensure a fast, secure, and delightful experience.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
            Core Stack
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              <span className="font-medium text-foreground">Vite</span> – for fast build and development environment.
            </li>
            <li>
              <span className="font-medium text-foreground">React.js</span> – JavaScript library for building UI.
            </li>
            <li>
              <span className="font-medium text-foreground">Next.js</span> – framework built on React for full-stack apps.
            </li>
            <li>
              <span className="font-medium text-foreground">Tailwind CSS</span> – utility-first CSS framework for rapid styling.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
            Libraries & Tools
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              <span className="font-medium text-foreground">Shadcn UI</span> – beautiful component library styled with Tailwind.
            </li>
            <li>
              <span className="font-medium text-foreground">Clerk</span> – seamless authentication and user management.
            </li>
            <li>
              <span className="font-medium text-foreground">Vapi</span> – AI assistant infrastructure.
            </li>
            <li>
              <span className="font-medium text-foreground">Convex</span> – serverless database for modern apps.
            </li>
            <li>
              <span className="font-medium text-foreground">Svix</span> – reliable webhook service.
            </li>
            <li>
              <span className="font-medium text-foreground">Lucide Icons</span> – icon set for React apps.
            </li>
            <li>
              <span className="font-medium text-foreground">Framer Motion</span> – smooth and declarative animations.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default ResourcesPage;
