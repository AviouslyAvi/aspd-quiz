import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personality and Life Experience Questionnaire",
  description:
    "A self-reflection questionnaire derived from DSM-5 ASPD criteria. Educational tool, not a clinical diagnosis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
