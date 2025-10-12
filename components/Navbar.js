"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleMobileClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (open) {
      const handleClickOutside = (e) => {
        const target = e.target;
        if (!target.closest("a")) {
          setOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center py-[28px] px-[25px] bg-white z-10 lg:bg-transparent lg:py-0 lg:items-start lg:justify-center lg:mt-[20px] lg:invert lg:mix-blend-difference">
        <Link href="/locations" className="lg:hidden">
          <Image
            src="/logo_left_black.svg"
            alt="Logo"
            width={114}
            height={20.4}
            className="w-[114px] h-[20.4px]"
          ></Image>
        </Link>
        <div className="lg:absolute lg:left-[57px] lg:top-0">
          <button
            className={`lg:!text-[13px] ${open ? "invisible" : ""} lg:${open ? "invisible" : ""}`}
            onClick={() => {
              // On mobile, toggle mobile menu; on desktop, toggle desktop menu
              if (window.innerWidth < 1024) {
                handleMobileClick();
              } else {
                handleClick();
              }
            }}
          >
            Menu
          </button>
          <ul
            className={`mt-[-1.1rem] flex gap-[38px] ${open ? "" : "hidden"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <li>
              <Link
                href="/locations"
                className={`!text-[13px] ${pathname === "/locations" ? "!text-blue" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`!text-[13px] ${pathname === "/projects" ? "!text-blue" : ""}`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`!text-[13px] ${pathname === "/about" ? "!text-blue" : ""}`}
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
