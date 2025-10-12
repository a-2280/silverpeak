"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AboutMessage from "./AboutMessage";

async function getData() {
  const query = `
    *[_type == 'location'] | order(_createdAt asc) {
  title,
    subtitle,
    "currentSlug": slug.current,
    image,
    gallery,
    attributes,
    description
}
    `;

  const data = await client.fetch(query);

  return data;
}

export default function Locations() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    getData().then(setData);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-location]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newIndex = parseInt(
              entry.target.getAttribute("data-location")
            );
            if (newIndex !== activeIndex) {
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveIndex(newIndex);
                setIsTransitioning(false);
              }, 150);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [data, activeIndex]);

  return (
    <div className="h-max flex flex-col justify-center lg:flex-1">
      {data.map((location, index) => (
        <section
          key={index}
          data-location={index}
          className="h-[100dvh] flex flex-col justify-center snap-center lg:snap-start lg:h-fit"
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
          {activeIndex === index && (
            <div className="hidden lg:flex flex-col absolute top-[177px] left-[57px] pointer-events-none gap-[186px]">
              <AboutMessage />
              <div
                className={`transition-all duration-100 ${
                  isTransitioning
                    ? "opacity-0 translate-x-[2px]"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <h2 className={`mb-[13px] !text-[15px]`}>
                  [{index + 1}] {location.title}
                </h2>
                <p className="mb-[25px] !text-[13px]">{location.subtitle}</p>
                <div className="flex flex-col gap-[25px] justify-between items-start">
                  <ul>
                    {location.attributes?.map((attr, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-[4.64px] !text-[15px]"
                      >
                        <Image
                          src="/arrow.svg"
                          alt="arrow"
                          width={15}
                          height={15}
                          className="scale-x-[-1]"
                        />
                        {attr}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/locations/${location.currentSlug}`}
                    className="!text-[13px] pointer-events-auto"
                  >
                    read more
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
