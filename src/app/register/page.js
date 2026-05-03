"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/profile");
    }
  }, [isPending, session, router]);

  const handleGoogleLogin = async () => {
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/profile",
    });

    if (result?.error) {
      toast.error(result.error.message || "Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: "/images/avatar.png",
    });
    if (result?.error) {
      toast.error(
        result.error.message ||
          result.error.statusText ||
          "Registration failed"
      );
      return;
    }
    toast.success("Registration successful");
    router.push("/profile");
    router.refresh();
  };
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-300">Checking account...</p>
        </div>
      </main>
    );
  }
  if (session?.user) {
    return null;
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 pt-24 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl"
      >
        <h1 className="text-center text-3xl font-bold">Registration</h1>
        <p className="mt-2 text-center text-slate-400">
          Create your SkillSphere account
        </p>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-lg font-bold text-blue-600">
            G
          </span>
          Continue with Google
        </button>
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-sm text-slate-500">or register with email</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            required
            value={form.name}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password minimum 8 characters"
            required
            minLength={8}
            value={form.password}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
          >
            Register
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}