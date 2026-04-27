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
      <body className="flex min-h-screen flex-col antialiased">
        {/*
          overflow-x solo en el contenido: en móvil (Safari) un body con overflow-x
          puede recortar sombras/transforms del botón fixed de WhatsApp.
        */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden">
          <Navbar />

          <main className="min-w-0 flex-grow max-md:-mt-2 md:mt-0">
            {children}
          </main>

          <Footer />
        </div>

        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
