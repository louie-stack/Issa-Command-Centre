import "./globals.css";
import ParticleField from "../components/ParticleField";

export const metadata = {
  title: "ISSA | Command Centre",
  description: "AI Filmmaker. Creative Director. Four AI agents running your creative pipeline, research, and business ops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#08080D", position: "relative" }}>
        <ParticleField />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
