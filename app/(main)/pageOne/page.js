import Link from "next/link";

export default function pageOne() {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="flex flex-col gap-[25px]">
        <h1 className="w-[300px] max-w-[387px]">
          We engineer to exceed expectations. Every project balances efficiency,
          beauty, and safety. Scroll to view some of our favorite work.
        </h1>
        <Link href="/about">about silverpeak</Link>
      </div>
    </div>
  );
}
