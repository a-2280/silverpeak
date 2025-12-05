import Locations from "@/components/Locations";
import Image from "next/image";
import Link from "next/link";

export default function locations() {
  return (
    <div className="snap-y snap-mandatory overflow-y-auto no-scrollbar px-[25px] lg:flex lg:justify-between">
      <section className="h-[100dvh] w-full flex flex-col justify-center snap-center ease-out lg:flex-1 lg:justify-start lg:pt-[178.42px] lg:invisible relative">
        <div className="flex flex-col gap-[25px]">
          <h1 className="w-full max-w-[387px] lg:!text-[24px] lg:max-w-[458px]">
            We engineer to exceed expectations. Every project balances
            efficiency, beauty, and safety. Scroll to view some of our favorite
            work.
          </h1>
          <Link href="/about" className="lg:!text-[13px]">
            about silverpeak
          </Link>
        </div>
        <div className="absolute bottom-[22.5%] left-1/2 transform -translate-x-1/2">
          <Image src="/downArrow.svg" alt="down arrow" height={15} width={15} />
        </div>
      </section>
      <Locations />
    </div>
  );
}
