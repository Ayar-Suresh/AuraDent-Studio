import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AuraDent Smile Studio | Premium Dental Care",
  description: "Experience dentistry redefined. Precision 3D imaging, minimally invasive techniques, and a luxury environment designed around your comfort.",
  keywords: ["dentist", "dental clinic", "smile design", "teeth whitening", "dental implants", "root canal"],
  openGraph: {
    title: "AuraDent Smile Studio",
    description: "Your Smile, Reimagined in 3D",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
