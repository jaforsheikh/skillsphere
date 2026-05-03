"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ];
  const privateLinks = user
    ? [{ name: "My Profile", href: "/profile" }]
    : [];
  const finalLinks = [...navLinks, ...privateLinks];
  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logout successful");
    window.location.href = "/";
  };
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-3xl font-black tracking-wide text-white">
          Skill<span className="text-blue-400">Sphere</span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {finalLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-300 transition hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          {isPending ? (
            <span className="text-sm text-slate-400">Checking...</span>
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2"
              >
                <Image
                  src={user.image || "/images/avatar.png"}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="max-w-35 truncate text-sm font-semibold text-white">
                  {user.name || "User"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-blue-400 px-6 py-3 text-sm font-bold text-blue-300 transition hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-3xl text-white lg:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {finalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-6 py-3 font-bold text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-blue-400 px-6 py-3 text-center font-bold text-blue-300"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-blue-600 px-6 py-3 text-center font-bold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}