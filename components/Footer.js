"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Contact from "./Contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full fixed bottom-0 left-0 flex justify-between items-center py-[19px] px-[28px] bg-white flex-wrap z-10 lg:bg-transparent lg:flex-row lg:items-start">
        <div className="lg:flex lg:flex-col lg:gap-[10px] lg:w-1/2">
          <p className="text-nowrap lg:!text-[13px]">
            +1 (801) 499 5045 /{" "}
            <button
              className="!no-underline lg:!text-[13px] hover:!text-blue"
              onClick={() => setOpen(!open)}
            >
              EMAIL
            </button>
          </p>
          <p className="text-end w-fit text-nowrap lg:!text-[13px]">
            &copy;{currentYear} SILVERPEAK ENGINEERING
          </p>
        </div>
        {isAboutPage && (
          <div className="hidden lg:flex lg:w-1/2">
            <p className="text-end w-fit text-nowrap lg:!text-[13px]">
              177 E. Antelope Drive Suite B, Layton, UT 84041
            </p>
          </div>
        )}
      </div>
      {open && <Contact onClose={() => setOpen(false)} />}
    </>
  );
}
