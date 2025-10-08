import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between py-[28px] px-[25px] bg-white z-10">
      <Link href="/locations">
        <Image
          src="/logo_left_black.svg"
          alt="Logo"
          width={114}
          height={20.4}
        ></Image>
      </Link>

      <button>Menu</button>
    </div>
  );
}
