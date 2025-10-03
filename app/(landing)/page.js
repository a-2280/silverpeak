import FullScreenCarousel from "@/components/FullScreenCarousel";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <FullScreenCarousel />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-[20.12px] lg:gap-[25px]">
        <Image
          src="/logo_stacked_white.svg"
          alt="Logo"
          width={161.166}
          height={80.88}
          className="lg:w-[241.111px] lg:h-[121px]"
        />
        <Link href="/locations" className="lg:!text-[13px] !text-white">
          Welcome
        </Link>
      </div>
    </>
  );
}
