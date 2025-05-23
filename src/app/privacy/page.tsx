const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-center py-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg p-10 animate-fadeIn">
        <h1 className="text-4xl font-bold font-sans mb-6 text-primary-foreground">
          Privacy Policy
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Your privacy is important to us at <span className="font-semibold text-primary">SereniTech</span>. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-3">
            Information We Collect
          </h2>
          <p className="text-muted-foreground mb-2">
            We collect personal information that you provide directly to us, such as your name, email address, and any messages or feedback you send.
          </p>
          <p className="text-muted-foreground">
            We may also automatically collect certain technical information such as your IP address and device details when you visit our website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To provide and maintain our services.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>To improve and personalize your experience.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-3">
            Data Security
          </h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-3">
            Your Rights
          </h2>
          <p className="text-muted-foreground mb-2">
            You have the right to access, update, or delete your personal information. You may also opt out of receiving marketing communications from us.
          </p>
          <p className="text-muted-foreground">
            To exercise these rights, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact</a> page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-3">
            Changes to This Policy
          </h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy occasionally to reflect changes in our practices or legal requirements. We encourage you to review this page periodically.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
