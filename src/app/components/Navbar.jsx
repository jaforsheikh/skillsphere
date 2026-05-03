"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "../../lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-white md:text-4xl"
        >
          Skill<span className="text-blue-500">Sphere</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-semibold text-slate-200 transition hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="font-semibold text-slate-200 transition hover:text-blue-400"
          >
            Courses
          </Link>
          {user && (
            <Link
              href="/profile"
              className="font-semibold text-slate-200 transition hover:text-blue-400"
            >
              My Profile
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isPending ? null : user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
              >
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="hidden max-w-35 truncate font-bold text-white sm:block">
                  {user.name || "User"}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-blue-500 px-6 py-3 font-bold text-blue-300 transition hover:bg-blue-500 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}