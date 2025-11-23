import "./globals.css";
import { GeistSans, GeistMono } from "geist/font";

export const metadata = {
  title: "Wezet Platform",
  description: "Wellness Booking Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
