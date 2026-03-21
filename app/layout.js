import "./globals.css";

export const metadata = {
  title: "ISSA | Command Centre",
  description: "AI Filmmaker. Creative Director. Four AI agents running your creative pipeline, research, and business ops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
