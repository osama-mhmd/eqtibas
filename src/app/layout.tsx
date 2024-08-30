import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "@/styles/globals.css";

const ibm = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400"] });

export const metadata: Metadata = {
  title: "اقتباس | الصفحة الرئيسية",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={ibm.className}>
        {children}
        <footer className="bg-gray-100 border-t border-t-gray-400">
          <div className="py-10 container mx-auto text-center px-2">
            صنع بواسطة{" "}
            <a
              className="underline text-blue-800"
              href="https://os-mhmd.vercel.app"
            >
              أسامة محمد
            </a>{" "}
            &copy; 2024
          </div>
        </footer>
      </body>
    </html>
  );
}
