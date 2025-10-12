import Image from "next/image";
import Link from "next/link";
import Contact from "./Contact";
import { useState } from "react";

export default function MobileNavbar({ onClose }) {
  const currentYear = new Date().getFullYear();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-blue h-[100dvh] w-screen absolute z-30 p-[28px] flex flex-col justify-between"
        onClick={onClose}
      >
        <Link href="/locations">
          <Image
            src="/logo_left_white.svg"
            alt="logo"
            height={20.396}
            width={114}
            className="h-[20.396px] w-[114px]"
            onClick={(e) => e.stopPropagation()}
          />
        </Link>
        <ul
          className="flex flex-col gap-[36px]"
          onClick={(e) => e.stopPropagation()}
        >
          <li>
            <Link
              href="/locations"
              className="!text-[20px] !text-white"
              onClick={onClose}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="!text-[20px] !text-white"
              onClick={onClose}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="!text-[20px] !text-white"
              onClick={onClose}
            >
              About
            </Link>
          </li>
        </ul>
        <div
          className="flex justify-between items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-nowrap !text-[10px] !text-white">
            +1 (801) 499 5045 /{" "}
            <button
              className="!no-underline !text-[10px] !text-white"
              onClick={() => setOpen(!open)}
            >
              EMAIL
            </button>
          </p>
          <p className="text-end w-fit text-nowrap !text-[10px] !text-white">
            &copy;{currentYear} SILVERPEAK ENGINEERING
          </p>
        </div>
      </div>
      {open && <Contact onClose={() => setOpen(false)} />}
    </>
  );
}
