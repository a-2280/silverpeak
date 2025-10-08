import "./globals.css";

export const metadata = {
  title: "Silverpeak",
  description: "Engineering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Figtree/Figtree-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Figtree/Figtree-SemiBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IBM/IBMPlexMono-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
