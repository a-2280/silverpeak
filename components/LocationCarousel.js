"use client";
import { useRef, useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";

export default function LocationCarousel({ locations }) {
  const scrollRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || locations.length === 0) return;

    const itemWidth = container.scrollWidth / 3;
    container.scrollLeft = itemWidth;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth } = container;
      const sectionWidth = scrollWidth / 3;

      if (scrollLeft >= sectionWidth * 2) {
        container.scrollLeft = scrollLeft - sectionWidth;
      } else if (scrollLeft <= 0) {
        container.scrollLeft = scrollLeft + sectionWidth;
      }

      // Calculate which image is centered
      const containerCenter = scrollLeft + container.offsetWidth / 2;
      const items = container.querySelectorAll("[data-carousel-item]");

      items.forEach((item, index) => {
        const itemLeft = item.offsetLeft;
        const itemCenter = itemLeft + item.offsetWidth / 2;

        if (Math.abs(containerCenter - itemCenter) < item.offsetWidth / 2) {
          setFocusedIndex(index);
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => container.removeEventListener("scroll", handleScroll);
  }, [locations.length]);

  const tripled = [...locations, ...locations, ...locations];

  // Map the tripled index back to the original location
  const currentLocation = focusedIndex !== null ? tripled[focusedIndex] : null;

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={scrollRef}
        className="overflow-x-auto snap-x snap-mandatory no-scrollbar mt-19.5"
      >
        <div className="flex gap-[3px]">
          {tripled.map((location, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
              data-carousel-item
            >
              <div
                className={
                  focusedIndex === index
                    ? "absolute pt-[25px] w-screen left-0 pl-[25px]"
                    : "invisible absolute"
                }
              >
                <h2 className="mb-[11px]">{location.title}</h2>
                <p className="mb-[23px]">{location.subtitle}</p>
              </div>
              <Image
                src={urlFor(location.image).url()}
                alt={location.title}
                width={283}
                height={302}
                className="h-[302px] w-[283px] object-cover mt-[82px]"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-16 mx-[25px] pt-[25px] pb-[63px] no-scrollbar">
        {currentLocation && currentLocation.description && (
          <PortableText
            value={currentLocation.description}
            components={{
              block: {
                normal: ({ children }) => <p className="!alt-p">{children}</p>,
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
