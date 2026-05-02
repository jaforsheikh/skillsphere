import courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaCheckCircle, FaClock, FaStar } from "react-icons/fa";

export default function CourseDetailsPage({ params }) {
  const course = courses.find((item) => item.id === params.id);

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 pt-32 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
          <Link
            href="/courses"
            className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold"
          >
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative h-[320px] overflow-hidden rounded-3xl border border-white/10 md:h-[460px]">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
              {course.category}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-4 text-lg text-slate-300">
              {course.description}
            </p>

            <p className="mt-4 text-slate-400">Instructor: {course.instructor}</p>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <FaStar className="text-yellow-400" /> {course.rating}
              </span>

              <span className="flex items-center gap-2">
                <FaClock className="text-blue-400" /> {course.duration}
              </span>

              <span className="flex items-center gap-2">
                <FaBookOpen className="text-green-400" /> {course.lessons} Lessons
              </span>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Course Price</p>
              <p className="mt-2 text-4xl font-bold text-blue-400">
                ${course.price}
              </p>

              <button className="mt-6 w-full rounded-full bg-blue-600 py-3 font-semibold transition hover:bg-blue-700">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-bold">What you will learn</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {course.learn.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-300">
                <FaCheckCircle className="text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}