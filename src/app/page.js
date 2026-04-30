"use client";

import CoursesSection from "./components/CoursesSection";
import BannerSlider from "./components/BannerSlider";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <BannerSlider />
      <CoursesSection />
    </main>
  );
}