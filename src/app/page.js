"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TopInstructors from "@/app/components/TopInstructors";
import {
  FaArrowRight,
  FaBookOpen,
  FaClock,
  FaGraduationCap,
  FaLightbulb,
  FaPlay,
  FaStar,
  FaTrophy,
} from "react-icons/fa";

const heroSlides = [
  {
    id: 1,
    title: "Upgrade Your Skills Today",
    subtitle: "Learn from Industry Experts",
    description:
      "Build career-ready skills with practical courses, expert instructors, and modern learning paths.",
    image: "/images/banner/banner1.jpg",
  },
  {
    id: 2,
    title: "Learn Anytime, Anywhere",
    subtitle: "Flexible Online Learning",
    description:
      "Access premium courses, track your progress, and grow your knowledge from anywhere.",
    image: "/images/banner/banner2.jpg",
  },
  {
    id: 3,
    title: "Master In-Demand Skills",
    subtitle: "Career Focused Courses",
    description:
      "Explore development, design, marketing, freelancing, and AI-powered learning resources.",
    image: "/images/banner/banner3.jpg",
  },
];

const learningTips = [
  {
    icon: <FaLightbulb />,
    title: "Study with Focus",
    description:
      "Use 45–60 minute deep work sessions and avoid distractions while learning.",
  },
  {
    icon: <FaClock />,
    title: "Manage Your Time",
    description:
      "Create a weekly learning schedule and complete small tasks consistently.",
  },
  {
    icon: <FaBookOpen />,
    title: "Practice Daily",
    description:
      "Do not only watch tutorials. Build small projects after every lesson.",
  },
];
export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const popularCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 3);
  }, [courses]);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    async function loadHomeData() {
      try {
        const [coursesRes, instructorsRes] = await Promise.all([
          fetch("/api/courses", { cache: "no-store" }),
          fetch("/api/instructors", { cache: "no-store" }),
        ]);
        const coursesData = await coursesRes.json();
        const instructorsData = await instructorsRes.json();
        if (coursesRes.ok) {
          setCourses(coursesData);
        }
        if (instructorsRes.ok) {
          setInstructors(instructorsData);
        }
      } catch (error) {
        console.error("Home data loading error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section / Banner Slider */}
      <section className="relative min-h-190 overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-slate-950/75"></div>
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-slate-950/40"></div>
        </div>
        <div className="relative z-10 mx-auto flex min-h-170 max-w-7xl items-center px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-300">
              <FaGraduationCap />
              Online Learning Platform
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              {slide.title}
            </h1>
            <h2 className="mt-5 text-2xl font-semibold text-blue-300 md:text-3xl">
              {slide.subtitle}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {slide.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700"
              >
                Start Learning
                <FaArrowRight />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/15"
              >
                <FaPlay />
                View Courses
              </Link>
            </div>
            <div className="mt-10 flex gap-3">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    activeSlide === index
                      ? "w-10 bg-blue-500"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Popular Courses */}
      <section id="popular-courses" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Popular Courses
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Top Rated Courses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Explore the top 3 highest-rated courses selected from all course
              data.
            </p>
          </div>
          {loading ? (
            <div className="mt-16 text-center text-slate-400">
              Loading popular courses...
            </div>
          ) : (
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {popularCourses.map((course) => (
                <article
                  key={course.id}
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
                    <h3 className="text-2xl font-bold">{course.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Instructor: {course.instructor}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                      <span className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaBookOpen className="text-green-400" />
                        {course.lessons} Lessons
                      </span>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                    >
                      View Details
                      <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 rounded-full border border-blue-400 px-8 py-4 font-bold text-blue-300 transition hover:bg-blue-600 hover:text-white"
            >
              View All Courses
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-900/60 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Learning Tips
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Learn Smarter Every Day
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Improve your learning with practical study techniques and time
              management habits.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {learningTips.map((tip, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl transition hover:-translate-y-2 hover:border-blue-500/60"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                  {tip.icon}
                </div>
                <h3 className="text-2xl font-bold">{tip.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TopInstructors instructors={instructors} />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-linear-to-r from-blue-600 to-indigo-700 p-10 text-center shadow-2xl md:p-16">
          <FaTrophy className="mx-auto text-5xl text-yellow-300" />
          <h2 className="mt-6 text-4xl font-black md:text-5xl">
            Ready to Upgrade Your Skills?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Start learning with SkillSphere and build practical skills for your
            future career.
          </p>
          <Link
            href="/courses"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-slate-100"
          >
            Browse Courses
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}