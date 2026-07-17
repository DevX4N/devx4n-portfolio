import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://devx4n.dev"),
  title: "Alexandre | DevX4N — Desenvolvedor de Software",
  description: "Portfólio de Alexandre (DevX4N), desenvolvedor de software com projetos em C#, TypeScript, JavaScript, aplicações desktop e interfaces web.",
  keywords: ["Alexandre", "DevX4N", "desenvolvedor C#", "desenvolvedor front-end", "TypeScript", "portfólio"],
  authors: [{ name: "Alexandre — DevX4N", url: "https://github.com/DevX4N" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile", locale: "pt_BR", url: "/", siteName: "DevX4N",
    title: "Alexandre | DevX4N — Desenvolvedor de Software",
    description: "Sistemas úteis, interfaces intuitivas e aplicações modernas em C#, TypeScript e JavaScript.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Alexandre | DevX4N — Desenvolvedor de Software" }],
  },
  twitter: { card: "summary_large_image", title: "Alexandre | DevX4N", description: "Desenvolvedor de Software · C# · TypeScript · Front-end", images: ["/og.png"] },
  icons: { icon: "/og.png", shortcut: "/og.png" },
};

const person = {
  "@context": "https://schema.org", "@type": "Person", name: "Alexandre", alternateName: "DevX4N",
  jobTitle: "Desenvolvedor de Software", address: { "@type": "PostalAddress", addressRegion: "Santa Catarina", addressCountry: "BR" },
  email: "mailto:alexandrepereirax643@gmail.com", sameAs: ["https://github.com/DevX4N", "https://instagram.com/filh0x"],
  knowsAbout: ["C#", "TypeScript", "JavaScript", "HTML", "CSS", "React", "Next.js", "WinForms"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-theme="dark" suppressHydrationWarning><body className={`${geist.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />{children}</body></html>;
}
