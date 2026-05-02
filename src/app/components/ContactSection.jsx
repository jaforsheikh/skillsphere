import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-900 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Contact Us
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Ready to Start Learning?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Join SkillSphere and start building career-ready skills today.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="mailto:support@skillsphere.com"
            className="rounded-full bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
          >
            Contact Support
          </a>
          <Link
            href="/courses"
            className="rounded-full border border-blue-400 px-8 py-3 font-semibold text-blue-300 hover:bg-blue-500 hover:text-white"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </section>
  );
}