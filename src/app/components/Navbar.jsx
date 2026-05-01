"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Instructors", href: "/#instructors" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <FaGraduationCap className="text-xl" />
          </div>

          <span className="text-2xl font-bold text-white">
            Skill<span className="text-blue-400">Sphere</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Image
                  src={user.avatar || "/images/avatar.png"}
                  alt={user.name || "User"}
                  width={34}
                  height={34}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-white">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-blue-400 px-5 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-white lg:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-300 transition hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <Image
                      src={user.avatar || "/images/avatar.png"}
                      alt={user.name || "User"}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <span className="text-white">{user.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-full bg-red-500 px-5 py-3 font-semibold text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-blue-400 px-5 py-3 text-center font-semibold text-blue-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-blue-600 px-5 py-3 text-center font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}