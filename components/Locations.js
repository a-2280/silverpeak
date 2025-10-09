"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const revalidate = 3600;

async function getData() {
  const query = `
    *[_type == 'location'] | order(_createdAt asc) {
  title,
    subtitle,
    "currentSlug": slug.current,
    image,
    attributes,
    description
}
    `;

  const data = await client.fetch(query);

  return data;
}

export default function Locations({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getData().then(setData);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-location]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.location));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [data]);

  return (
    <div className="h-max flex flex-col justify-center lg:flex-1">
      {data.map((location, index) => (
        <section
          key={index}
          data-location={index}
          className="h-screen flex flex-col justify-center snap-center lg:snap-start lg:h-fit"
        >
          <h2 className="mb-[11px] lg:hidden">
            [{index + 1}] {location.title}
          </h2>
          <p className="mb-[23px] lg:hidden">{location.subtitle}</p>
          {location.image && (
            <div className="relative">
              <Image
                src={urlFor(location.image).url()}
                alt={location.title}
                width={387}
                height={412}
                priority
                className="w-full h-auto max-h-[300px] min-h-[300px] max-[390px]:max-h-[200px] max-[390px]:min-h-[200px] object-cover mb-[20px] lg:max-h-[781.184px] lg:min-h-[781.184px] lg:mb-[10px]"
              />
              <p className="hidden !text-[13px] lg:block lg:absolute bottom-3 left-[-42px]">
                [{index + 1}]
              </p>
            </div>
          )}
          <div className="flex justify-between items-start lg:hidden">
            <ul>
              {location.attributes?.map((attr, i) => (
                <li key={i} className="flex items-center gap-[4.64px]">
                  <Image
                    src="/arrow.svg"
                    alt="arrow"
                    width={11}
                    height={11}
                    className="scale-x-[-1]"
                  />
                  {attr}
                </li>
              ))}
            </ul>
            <Link href={`/locations/${location.currentSlug}`}>read more</Link>
          </div>
        </section>
      ))}

      {data[activeIndex] && (
        <div
          className={`hidden lg:block lg:absolute lg:left-[57px] ${isOpen ? "lg:top-[555px]" : "lg:top-[511px]"} `}
        >
          <div className={`${isOpen ? "invisible" : ""}`}>
            <h2 className="mb-[13px] !text-[15px]">
              [{activeIndex + 1}] {data[activeIndex].title}
            </h2>
            <p className="mb-[25px] !text-[13px]">
              {data[activeIndex].subtitle}
            </p>
          </div>
          <div>
            <ul className="mb-[25px]">
              {data[activeIndex].attributes?.map((attr, i) => (
                <li
                  key={i}
                  className="flex items-center gap-[10px] !text-[15px]"
                >
                  <Image
                    src="/arrow.svg"
                    alt="arrow"
                    width={15}
                    height={15}
                    className="scale-x-[-1] "
                  />
                  {attr}
                </li>
              ))}
            </ul>
            <button className="!text-[13px]" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "read less" : "read more"}
            </button>
          </div>
          <div
            className={`max-h-[420px] w-[481px] absolute top-[-375px] left-0 ${isOpen ? "flex flex-col" : "hidden"}`}
          >
            <div className="">
              <h1 className="!text-[24px] max-w-[276px] mb-[25px]">
                {data[activeIndex].title}
              </h1>
              <p className="mb-[25px] !text-[13px]">
                {data[activeIndex].subtitle}
              </p>
            </div>
            <div className="max-h-[325px] overflow-y-scroll no-scrollbar">
              <PortableText
                value={data[activeIndex].description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="!alt-p">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
