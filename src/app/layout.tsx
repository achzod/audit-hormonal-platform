import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Audit Métabolique Complet | AchZod Coaching",
  description: "Analyse ton métabolisme en 5 minutes • Rapport personnalisé complet • 5000+ transformations réussies",
  keywords: "audit métabolique, coaching sportif, transformation physique, nutrition, biohacking",
  openGraph: {
    title: "Audit Métabolique Complet | AchZod Coaching",
    description: "Analyse ton métabolisme en 5 minutes • Rapport personnalisé complet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
