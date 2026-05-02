import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata = {
  title: "SkillSphere - Online Learning Platform",
  description: "SkillSphere is a modern online learning platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}