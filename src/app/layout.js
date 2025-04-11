import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Car Finder",
  description: "Find your dream car",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
