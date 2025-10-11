import Link from "next/link";

export default function AboutMessage() {
  return (
    <div className="flex flex-col max-w-[458px] gap-[25px] pointer-events-auto">
      <h1 className="!text-[24px]">
        We engineer to exceed expectations. Every project balances efficiency,
        beauty, and safety. Scroll to view some of our favorite work.
      </h1>
      <Link href="/about" className="!text-[13px]">
        about silverpeak
      </Link>
    </div>
  );
}
