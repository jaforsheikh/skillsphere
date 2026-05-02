"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
export default function CoursesSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Popular Courses
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Explore Our Best Courses
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Learn practical skills from expert instructors and build your career faster.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}