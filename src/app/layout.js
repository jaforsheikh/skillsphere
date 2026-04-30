import "./globals.css";

export const metadata = {
  title: "SkillSphere",
  description: "Modern Online Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}