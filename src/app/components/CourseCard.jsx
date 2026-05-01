import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaClock, FaStar } from "react-icons/fa";

export default function CourseCard({ course }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-2 hover:border-blue-400/50">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
          {course.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{course.title}</h3>

        <p className="mt-2 text-sm text-slate-400">By {course.instructor}</p>

        <p className="mt-3 text-slate-300">{course.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
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

        <div className="mt-6 flex items-center justify-between">
          <p className="text-2xl font-bold text-white">${course.price}</p>

          <Link
            href={`/courses/${course.id}`}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}