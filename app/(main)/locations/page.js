"use client";

import Locations from "@/components/Locations";
import Link from "next/link";
import { useState } from "react";

export default function locations() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="snap-y snap-mandatory overflow-y-auto no-scrollbar px-[25px] lg:flex lg:justify-between lg:px-[57px]">
      <section
        className={`h-screen w-full flex flex-col justify-center snap-center lg:flex-1 lg:justify-start lg:pt-[178.42px] ease-out ${isOpen ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 transition-all duration-300"}`}
      >
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
      </section>
      <Locations isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
