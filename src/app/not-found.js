import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="text-8xl font-black text-blue-500">404</p>
        <h1 className="mt-6 text-4xl font-black">Page Not Found</h1>
        <p className="mt-4 text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-bold transition hover:bg-blue-700"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </main>
  );
}