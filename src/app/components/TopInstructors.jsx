"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaStar,
  FaUsers,
  FaTimes,
  FaBookOpen,
  FaBriefcase,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";

export default function TopInstructors({ instructors = [] }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  return (
    <section id="instructors" className="px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-400">
            Top Instructors
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            Learn From Expert Mentors
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Meet our experienced instructors who help learners build
            career-ready skills.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {instructors.slice(0, 4).map((instructor) => (
            <button
              type="button"
              key={instructor.id}
              onClick={() => setSelectedInstructor(instructor)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/70 hover:bg-white/10"
            >
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500/50 bg-slate-900">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  sizes="128px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold">{instructor.name}</h3>

              <p className="mt-2 text-blue-300">{instructor.expertise}</p>

              <div className="mt-5 flex items-center justify-center gap-5 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <FaUsers className="text-green-400" />
                  {instructor.courses} Courses
                </span>

                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  {instructor.rating}
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold text-blue-400 opacity-0 transition group-hover:opacity-100">
                Click to view details
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedInstructor && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900 p-8 text-white shadow-2xl md:p-10">
            <button
              type="button"
              onClick={() => setSelectedInstructor(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-500"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex justify-center md:block">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-blue-500/50 bg-slate-950">
                  <Image
                    src={selectedInstructor.image}
                    alt={selectedInstructor.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
                  Instructor Details
                </p>

                <h3 className="mt-3 text-4xl font-black">
                  {selectedInstructor.name}
                </h3>

                <p className="mt-2 text-xl font-semibold text-blue-300">
                  {selectedInstructor.expertise}
                </p>

                <p className="mt-5 leading-8 text-slate-300">
                  {selectedInstructor.bio ||
                    `${selectedInstructor.name} is an experienced mentor specializing in ${selectedInstructor.expertise}. This instructor helps learners build practical skills with clear guidance, real-world examples, and career-focused lessons.`}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="flex items-center justify-center gap-3 text-slate-300 md:justify-start">
                      <FaBookOpen className="text-green-400" />
                      <span>{selectedInstructor.courses} Courses</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="flex items-center justify-center gap-3 text-slate-300 md:justify-start">
                      <FaStar className="text-yellow-400" />
                      <span>{selectedInstructor.rating} Rating</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="flex items-center justify-center gap-3 text-slate-300 md:justify-start">
                      <FaBriefcase className="text-blue-400" />
                      <span>
                        {selectedInstructor.experience ||
                          "5+ Years Experience"}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="flex items-center justify-center gap-3 text-slate-300 md:justify-start">
                      <FaGraduationCap className="text-purple-400" />
                      <span>
                        {selectedInstructor.students || "1000+ Students"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-blue-600/10 p-5">
                  <p className="flex items-center justify-center gap-3 text-blue-200 md:justify-start">
                    <FaEnvelope />
                    {selectedInstructor.email ||
                      `${selectedInstructor.name
                        .toLowerCase()
                        .replaceAll(" ", ".")}@skillsphere.com`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}