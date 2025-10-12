"use client";

import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

export default function ProjectsClient({ projects, locations }) {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className="lg:flex lg:h-screen">
      <div className="w-screen flex flex-col items-start px-[25px] mt-[78.42px] mb-[78px] lg:w-1/2 lg:px-[57px] lg:justify-center">
        <h1 className="mb-[59px] mt-[57px] hidden lg:flex !text-[24px]">
          {projects.title}
        </h1>
        <h2 className="mb-[37px] mt-[25px] lg:hidden">{projects.title}</h2>
        <div className="w-full mb-[25px] lg:mb-[59px]">
          {locations?.map((job, i) => (
            <div key={i} className="lg:max-w-[440px]">
              <div className="flex justify-between items-center py-1">
                <p className="!alt-p lg:!text-[15px]">{job.title}</p>
                <Link
                  href={`/projects/${job.currentSlug}` ?? "#"}
                  onMouseEnter={() => setHoveredImage(job.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  link
                </Link>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="lg:mb-[73px] lg:max-w-[585px] lg:max-h-[340px] overflow-y-scroll no-scrollbar">
          <PortableText
            value={projects.main}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="!alt-p lg:!text-[15px]">{children}</p>
                ),
              },
            }}
          />
        </div>
      </div>
      <div className="hidden w-1/2 lg:flex">
        <Image
          src={hoveredImage ? urlFor(hoveredImage).url() : "/red.png"}
          alt=""
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
