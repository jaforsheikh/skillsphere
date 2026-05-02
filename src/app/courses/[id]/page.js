"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaBookOpen, FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok) {
          setCourse(data);
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error("Course fetch error:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      getCourse();
    }
  }, [id]);
  if (loading) {
    return (
      <ProtectedRoute>
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-slate-300">Loading course details...</p>
          </div>
        </main>
      </ProtectedRoute>
    );
  }
  if (!course) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-slate-950 px-6 pt-32 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold">Course Not Found</h1>
            <p className="mt-4 text-slate-400">
              The course you are looking for does not exist.
            </p>
            <Link
              href="/courses"
              className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Back to Courses
            </Link>
          </div>
        </main>
      </ProtectedRoute>
    );
  }
  const curriculum = course.curriculum || [
    "Introduction and course overview",
    "Core concepts and fundamentals",
    "Hands-on practical lessons",
    "Real project implementation",
    "Final review and next steps",
  ];
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10 md:h-115">
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
                {course.fullDescription || course.description}
              </p>
              <p className="mt-4 text-slate-400">
                Instructor:{" "}
                <span className="text-white">{course.instructor}</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" /> {course.rating}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="text-blue-400" /> {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <FaBookOpen className="text-green-400" /> {course.lessons}{" "}
                  Lessons
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
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold">What you will learn</h2>
              <div className="mt-6 grid gap-4">
                {(course.learn || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <FaCheckCircle className="shrink-0 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold">Course Curriculum</h2>
              <div className="mt-6 space-y-4">
                {curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-300"
                  >
                    <span className="mr-3 font-bold text-blue-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}