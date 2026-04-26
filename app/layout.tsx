import type { Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col overflow-x-hidden antialiased">

        <Navbar />

        <main className="min-w-0 flex-grow">
          {children}
        </main>

        <Footer />

        <WhatsAppFloatingButton />

      </body>
    </html>
  );
}
