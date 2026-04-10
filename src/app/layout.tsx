import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Public_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kamus BISINDO — Bahasa Isyarat Indonesia",
    template: "%s | Kamus BISINDO",
  },
  description:
    "Pelajari Bahasa Isyarat Indonesia (BISINDO) dengan kamus digital interaktif. Akses ribuan kosa kata dalam format video berkualitas tinggi untuk menghubungkan gerakan dan makna.",
  keywords: [
    "BISINDO",
    "Bahasa Isyarat Indonesia",
    "Sign Language",
    "Kamus Isyarat",
    "Tuli",
    "Deaf",
    "Inklusi",
  ],
  authors: [{ name: "Kamus BISINDO" }],
  openGraph: {
    title: "Kamus BISINDO — Bahasa Isyarat Indonesia",
    description:
      "Pelajari Bahasa Isyarat Indonesia dengan kamus digital interaktif.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${publicSans.variable} antialiased`}
    >
      <head>
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="pt-20 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
