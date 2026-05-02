import Link from "next/link";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Link href="/" className="text-3xl font-black">
            Skill<span className="text-blue-400">Sphere</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            SkillSphere is an online learning platform for upgrading practical
            skills with expert-led courses.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link href="/courses" className="hover:text-blue-400">
              Courses
            </Link>
            <Link href="/profile" className="hover:text-blue-400">
              My Profile
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Contact Info</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              support@skillsphere.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-400" />
              +880 1700 000000
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Social & Legal</h3>
          <div className="mt-4 flex gap-4 text-xl text-slate-400">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" className="hover:text-blue-400">
              <FaGithub />
            </a>
          </div>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/terms" className="hover:text-blue-400">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-blue-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} SkillSphere. All rights reserved.
      </div>
    </footer>
  );
}