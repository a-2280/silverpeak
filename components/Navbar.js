import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between py-[28px] px-[25px] bg-white z-10 lg:bg-transparent lg:py-0 lg:items-start lg:justify-center lg:mt-[20px] lg:invert lg:mix-blend-difference">
      <Link href="/locations" className="lg:hidden">
        <Image
          src="/logo_left_black.svg"
          alt="Logo"
          width={114}
          height={20.4}
          className="w-[114px] h-[20.4px]"
        ></Image>
      </Link>
      <button className="lg:absolute lg:left-[57px] lg:top-0 lg:!text-[13px]">
        Menu
      </button>
      <Link href="/locations" className="hidden lg:flex">
        <Image
          src="/logo_stacked_black.svg"
          alt="Logo"
          width={114}
          height={57}
          className="w-[114px] h-[57px] flex margin-auto"
        ></Image>
      </Link>
    </div>
  );
}
