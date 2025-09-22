import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-between mb-4">
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
