import { Cairo } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata = {
  title: "ENS-Company",
  description: "ENS-Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased relative`}>
        <NavBar />
        {children}
        <Footer />
        <div className="fixed bottom-5 left-10 group">
          <a
            href="https://wa.me/01553841793"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center"
          >
            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 px-3 py-1 text-sm text-white bg-green-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              تواصل معنا بشكل مباشر
            </span>

            {/* WhatsApp Icon */}
            <img src="/icons/wa.png" className="w-10 h-10" alt="whatsapp" />
          </a>
        </div>
      </body>
    </html>
  );
}
