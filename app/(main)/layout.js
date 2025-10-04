import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-between px-[25px] overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
