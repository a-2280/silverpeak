import Locations from "@/components/Locations";
import Link from "next/link";

export default function pageOne() {
  return (
    <div className="snap-y snap-mandatory overflow-y-auto no-scrollbar px-[25px]">
      <section className="h-screen w-full flex flex-col justify-center snap-center">
        <div className="flex flex-col gap-[25px]">
          <h1 className="w-full">
            We engineer to exceed expectations. Every project balances
            efficiency, beauty, and safety. Scroll to view some of our favorite
            work.
          </h1>
          <Link href="/about">about silverpeak</Link>
        </div>
      </section>
      <Locations />
    </div>
  );
}
