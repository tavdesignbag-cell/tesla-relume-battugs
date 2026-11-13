import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-roboto-family",
  display: "swap",
});

export const metadata = {
  title: "Tesla",
  icons: {
    icon: { url: "/assets/tesla-logo.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" className={`${inter.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
