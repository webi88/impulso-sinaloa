import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Impulso Sinaloa — Trabajo, Inversión y Futuro",
  description:
    "Frente ciudadano empresarial por el desarrollo y la seguridad de Sinaloa. Más inversión, más empleo, mejor futuro para nuestra gente.",
  openGraph: {
    title: "Impulso Sinaloa",
    description: "Trabajo, Inversión y Futuro para Sinaloa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
