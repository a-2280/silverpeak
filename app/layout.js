import "./globals.css";

export const metadata = {
  title: "Silverpeak",
  description: "Engineering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
