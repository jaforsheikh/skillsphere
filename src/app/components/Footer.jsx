export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">SkillSphere</h2>
          <p className="mt-3 text-sm">
            A modern online learning platform to help you build real-world skills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/courses" className="hover:text-white transition">Courses</a></li>
            <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
            <li><a href="/login" className="hover:text-white transition">Login</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">Email: support@skillsphere.com</p>
          <p className="text-sm mt-1">Phone: +880 1234-567890</p>

          <div className="flex gap-4 mt-4">
            <span className="hover:text-white cursor-pointer transition">🌐</span>
            <span className="hover:text-white cursor-pointer transition">📘</span>
            <span className="hover:text-white cursor-pointer transition">📸</span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} SkillSphere. All rights reserved.
      </div>
    </footer>
  );
}