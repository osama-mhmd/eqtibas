import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/redux-provider";

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
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
