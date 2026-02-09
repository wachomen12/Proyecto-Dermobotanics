import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "R&R Dermobotanics | Spa & Estética Integral en Manta, Ecuador",
  description: "Cuidado consciente de la piel combinando ciencia y naturaleza. Servicios de Spa, Estética Integral y productos dermobotánicos en Manta, Ecuador.",
  keywords: "spa manta, estética manta, cuidado de la piel, productos naturales, dermobotánicos, Ecuador",
  openGraph: {
    title: "R&R Dermobotanics | Spa & Estética Integral",
    description: "Ciencia y naturaleza en perfecta armonía para el cuidado de tu piel",
    type: "website",
    locale: "es_EC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased selection:bg-gold-400/20 selection:text-elegant-charcoal`}>
        {children}
      </body>
    </html>
  );
}
