"use client";

import courses from "@/data/courses.json";
import Image from "next/image";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function CourseDetails({ params }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return <div className="text-white p-10">Course not found</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white px-6 py-20">
        <div className="max-w-5xl mx-auto">

          <Image
            src={course.thumbnail}
            alt={course.title}
            width={1000}
            height={500}
            className="rounded-2xl w-full h-[400px] object-cover"
          />

          <h1 className="mt-6 text-4xl font-bold">{course.title}</h1>

          <p className="mt-2 text-slate-400">By {course.instructor}</p>

          <p className="mt-4 text-slate-300">{course.description}</p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">
              What you will learn
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              {course.learn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-2xl font-bold text-blue-400">
            Price: ${course.price}
          </p>

        </div>
      </div>
    </ProtectedRoute>
  );
}