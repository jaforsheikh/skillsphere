export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32 text-white">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
          SkillSphere Legal
        </p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          Terms & Conditions
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          By using SkillSphere, users agree to follow our platform rules, use
          learning content responsibly, and avoid any misuse of course materials.
          These terms are created to keep the learning experience safe,
          respectful, and useful for every student.
        </p>
        <div className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">1. Use of Platform</h2>
            <p className="mt-3 leading-8 text-slate-400">
              SkillSphere is an online learning platform. Users should use this
              platform only for learning, exploring courses, managing their
              profile, and accessing educational content.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">2. Account Responsibility</h2>
            <p className="mt-3 leading-8 text-slate-400">
              Users are responsible for maintaining the accuracy of their
              profile information. If users update their name or profile image,
              they should provide appropriate and respectful information.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">3. Course Content</h2>
            <p className="mt-3 leading-8 text-slate-400">
              Course details, curriculum, images, and descriptions are provided
              for learning purposes. Users should not copy, misuse, or
              redistribute course materials without permission.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">4. Authentication</h2>
            <p className="mt-3 leading-8 text-slate-400">
              Users can register and login using email/password or Google
              authentication. Protected pages such as course details and profile
              pages are only available after login.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">5. Fair Usage</h2>
            <p className="mt-3 leading-8 text-slate-400">
              Users must not attempt to damage, interrupt, hack, or misuse the
              application. Any activity that affects the platform experience for
              others is not allowed.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">6. Changes to Terms</h2>
            <p className="mt-3 leading-8 text-slate-400">
              SkillSphere may update these terms in the future to improve the
              platform, add new features, or meet project requirements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}