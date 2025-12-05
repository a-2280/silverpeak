import Link from "next/link";

export default function Success() {
  return (
    <div className="h-[100dvh] w-screen flex flex-col justify-center items-center gap-4">
      <h1>Your message was sent!</h1>
      <Link href="/locations" className="!text-[1rem]">
        Go back
      </Link>
    </div>
  );
}
