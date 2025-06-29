import "./globals.css";
import Image from "next/image";
import logo from "../public/logo.png";

export const metadata = {
  title: "MoodTunes",
  description: "Let Your Emotions Pick the Song",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <Image src={logo} alt="MoodTunes" width={200} height={200} />
          <div style={{ marginLeft: "0px" }}>
            <h1>Mood Tunes</h1>
            <p>Let Your Emotions Pick the Song</p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
