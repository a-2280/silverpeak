"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMobileClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center py-[28px] px-[25px] bg-[#F0F0F0] z-10 lg:bg-transparent lg:py-0 lg:items-start lg:justify-center lg:mt-[20px] lg:invert lg:mix-blend-difference">
        <Link href="/locations" className="lg:hidden">
          <Image
            src="/logo_left_black.svg"
            alt="Logo"
            width={114}
            height={20.4}
            className="w-[114px] h-[20.4px] -ml-1"
          ></Image>
        </Link>
        <div
          className="lg:absolute lg:left-[25px] lg:top-0"
          onMouseEnter={() => {
            if (window.innerWidth >= 1024) {
              setIsClosing(false);
              setOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 1024) {
              setOpen(false);
              setIsClosing(true);
              setTimeout(() => {
                setIsClosing(false);
              }, 300);
            }
          }}
        >
          <button
            className={`lg:!text-[13px] ${open ? "invisible" : ""} lg:${open ? "invisible" : ""}`}
            onClick={handleMobileClick}
          >
            Menu
          </button>
          <ul
            className={`mt-[-1.3rem] flex gap-[38px] ${open || isClosing ? "" : "hidden"}`}
          >
            <li className={open ? "" : "opacity-0"}>
              <Link
                href="/locations"
                className={`!text-[13px] hover:!text-blue ${pathname === "/locations" ? "!text-blue" : ""}`}
              >
                Home
              </Link>
            </li>
            <li
              className={
                open
                  ? "animate-slideIn"
                  : isClosing
                    ? "animate-slideOutRight"
                    : "opacity-0"
              }
              style={{ animationDelay: open ? "0.1s" : "0.1s" }}
            >
              <Link
                href="/projects"
                className={`!text-[13px] hover:!text-blue ${pathname === "/projects" ? "!text-blue" : ""}`}
              >
                Projects
              </Link>
            </li>
            <li
              className={
                open
                  ? "animate-slideIn"
                  : isClosing
                    ? "animate-slideOutRight"
                    : "opacity-0"
              }
              style={{ animationDelay: open ? "0.2s" : "0s" }}
            >
              <Link
                href="/about"
                className={`!text-[13px] hover:!text-blue ${pathname === "/about" ? "!text-blue" : ""}`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
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
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <MobileNavbar onClose={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
