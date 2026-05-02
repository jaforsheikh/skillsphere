"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaBookOpen,
  FaStar,
  FaTimes,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";

export default function TopInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    fetch("/api/instructors")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);

  return (
    <section id="instructors" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Expert Mentors
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Learn From Top Instructors
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Click any instructor to view full profile details.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((ins) => (
            <button
              key={ins.id}
              onClick={() => setSelectedInstructor(ins)}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-2 hover:border-blue-400/50 hover:bg-white/10"
            >
              <Image
                src={ins.image}
                alt={ins.name}
                width={150}
                height={150}
                className="mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-blue-500/20 transition group-hover:ring-blue-500/60"
              />

              <h3 className="mt-5 text-xl font-bold">{ins.name}</h3>
              <p className="mt-2 text-slate-400">{ins.expertise}</p>

              <div className="mt-5 flex justify-center gap-5 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <FaBookOpen className="text-green-400" /> {ins.courses} Courses
                </span>

                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" /> {ins.rating}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedInstructor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <button
              onClick={() => setSelectedInstructor(null)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-red-500"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center gap-6 md:flex-row md:text-left">
              <Image
                src={selectedInstructor.image}
                alt={selectedInstructor.name}
                width={180}
                height={180}
                className="h-44 w-44 rounded-3xl object-cover"
              />

              <div>
                <h3 className="text-3xl font-bold">
                  {selectedInstructor.name}
                </h3>

                <p className="mt-2 text-blue-400">
                  {selectedInstructor.expertise}
                </p>

                <p className="mt-4 text-slate-300">
                  {selectedInstructor.bio}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <FaBookOpen className="mx-auto text-green-400" />
                <p className="mt-2 text-xl font-bold">
                  {selectedInstructor.courses}
                </p>
                <p className="text-xs text-slate-400">Courses</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <FaStar className="mx-auto text-yellow-400" />
                <p className="mt-2 text-xl font-bold">
                  {selectedInstructor.rating}
                </p>
                <p className="text-xs text-slate-400">Rating</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <FaBriefcase className="mx-auto text-blue-400" />
                <p className="mt-2 text-xl font-bold">
                  {selectedInstructor.experience}
                </p>
                <p className="text-xs text-slate-400">Experience</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <FaUsers className="mx-auto text-purple-400" />
                <p className="mt-2 text-xl font-bold">
                  {selectedInstructor.students}+
                </p>
                <p className="text-xs text-slate-400">Students</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedInstructor(null)}
              className="mt-8 w-full rounded-full bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </section>
  );
}