import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pangolins.io"),
  title: {
    default: "Pangolins",
    template: "%s | Pangolins"
  },
  alternates: {
    canonical: "/"
  },
  description:
    "Pangolins is a bilingual Morpho curator website focused on low-risk, high-liquidity onchain risk management."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
