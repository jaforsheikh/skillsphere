"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaClock,
  FaSearch,
  FaStar,
  FaFire,
  FaArrowRight,
} from "react-icons/fa";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function getCourses() {
      try {
        const res = await fetch("/api/courses", {
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Courses fetch error:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }
    getCourses();
  }, []);
  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [courses, searchText]);
  const trendingCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 3);
  }, [courses]);
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-300">Loading courses...</p>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            All Courses
          </p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Explore Our Courses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Here, all course data will be displayed. Search courses by title and
            click the details button to view full course information.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchText}
              placeholder="Search courses by title..."
              className="w-full rounded-full border border-white/10 bg-white/5 px-14 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </motion.div>
        {filteredCourses.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">No Courses Found</h2>
            <p className="mt-3 text-slate-400">
              Try searching with another course title.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/60"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={course.image || course.thumbnail}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
                    {course.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{course.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Instructor: {course.instructor}
                  </p>
                  <p className="mt-4 text-slate-300">
                    {course.shortDescription || course.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
                    <span className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaClock className="text-blue-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaBookOpen className="text-green-400" />
                      {course.lessons} Lessons
                    </span>
                  </div>
                  <div className="mt-7 flex items-center justify-between">
                    <p className="text-3xl font-bold text-white">
                      ${course.price}
                    </p>
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-700"
                    >
                      Details
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
      <section className="mx-auto mt-24 max-w-7xl">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl md:p-12">
          <div className="text-center">
            <p className="inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
              <FaFire />
              Trending Courses
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Top Trending Right Now
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              These courses are selected based on high ratings and learner
              interest.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {trendingCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm font-bold text-orange-300">
                    #{index + 1} Trending
                  </span>
                  <span className="flex items-center gap-2 text-yellow-400">
                    <FaStar />
                    {course.rating}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold">{course.title}</h3>
                <p className="mt-3 text-sm text-slate-400">
                  By {course.instructor}
                </p>
                <Link
                  href={`/courses/${course.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300"
                >
                  View Details
                  <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}