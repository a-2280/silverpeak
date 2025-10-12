import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="h-[100dvh] w-screen flex flex-col justify-between overflow-x-hidden bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
