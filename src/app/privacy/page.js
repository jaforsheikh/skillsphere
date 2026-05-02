export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32 text-white">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
          SkillSphere Privacy
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          SkillSphere respects user privacy. We use account information only for
          authentication, profile display, and learning experience improvement.
          This page explains what information is used and how it supports the
          platform.
        </p>
        <div className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            <p className="mt-3 leading-8 text-slate-400">
              We may collect basic account information such as name, email
              address, and profile image. This information is used to show user
              data on the My Profile page and navbar.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">2. Authentication Data</h2>
            <p className="mt-3 leading-8 text-slate-400">
              SkillSphere uses BetterAuth for authentication. Users can login
              with email/password or Google. Authentication data is used to keep
              protected routes secure.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">3. Profile Updates</h2>
            <p className="mt-3 leading-8 text-slate-400">
              Users can update their name and profile image from the My Profile
              page. Uploaded images are used only for profile display inside the
              application.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">4. How We Use Information</h2>
            <p className="mt-3 leading-8 text-slate-400">
              User information is used to personalize the application, display
              profile details, manage login status, and provide access to
              protected pages such as course details.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">5. Data Protection</h2>
            <p className="mt-3 leading-8 text-slate-400">
              We aim to keep user information safe and only use it for the
              features required by SkillSphere. Users should avoid sharing
              sensitive information through profile fields.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">6. Third-Party Login</h2>
            <p className="mt-3 leading-8 text-slate-400">
              When users login with Google, Google may provide basic profile
              information such as name, email, and profile image so the account
              can be displayed properly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}