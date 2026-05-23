import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antisocial Personality Disorder (ASPD) Self-Inquiry Questionnaire",
  description:
    "A 30-item self-inquiry questionnaire measuring how closely your behavioral patterns mirror the clinical markers of Antisocial Personality Disorder. Derived from DSM-5 ASPD criteria and the PCL-R. Educational tool, not a clinical diagnosis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
