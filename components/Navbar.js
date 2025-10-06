import Image from "next/image";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between py-[28px] px-[25px] bg-green-400/25 z-10">
      <Image
        src="/logo_left_black.svg"
        alt="Logo"
        width={114}
        height={20.4}
      ></Image>
      <button>Menu</button>
    </div>
  );
}
