import BannerSlider from "./components/BannerSlider";
import CoursesSection from "./components/CoursesSection";
import TopInstructors from "./components/TopInstructors";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <BannerSlider />
      <CoursesSection />
      <TopInstructors />
      <ContactSection />
      <Footer />
    </main>
  );
}