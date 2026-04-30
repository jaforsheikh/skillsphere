export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          SkillSphere — Online Learning Platform
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Learn new skills with modern online courses
        </h1>

        <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
          Browse premium courses, learn from top instructors, and grow your
          career with SkillSphere.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600">
            Explore Courses
          </button>

          <button className="rounded-full border border-slate-600 px-8 py-3 font-semibold text-white transition hover:border-blue-400 hover:text-blue-300">
            Become Instructor
          </button>
        </div>
      </section>
    </main>
  );
}