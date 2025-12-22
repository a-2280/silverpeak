"use client";
import { useRef, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import DesktopCarousel from "./DesktopCarousel";

function buildCarouselItems(gallery) {
  const items = [];
  let i = 0;

  while (i < gallery.length) {
    const current = gallery[i];
    const next = gallery[i + 1];

    if (current?.pairWithNext && next?.image) {
      items.push({
        type: "paired",
        images: [current.image, next.image],
      });
      i += 2;
    } else if (current?.image) {
      items.push({
        type: "single",
        image: current.image,
      });
      i += 1;
    } else {
      i += 1;
    }
  }

  return items;
}

export default function LocationGallery({ currentLocation }) {
  const scrollRef = useRef(null);
  const descriptionRef = useRef(null);

  const carouselItems = buildCarouselItems(currentLocation?.gallery || []);
  // Triple the array for infinite scroll
  const tripled = [...carouselItems, ...carouselItems, ...carouselItems];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || carouselItems.length === 0) return;

    // Center the first image (start at middle section of tripled array)
    const itemWidth = container.scrollWidth / 3;
    container.scrollLeft = itemWidth;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth } = container;
      const sectionWidth = scrollWidth / 3;

      // Reset scroll position when reaching boundaries for infinite scroll
      if (scrollLeft >= sectionWidth * 2) {
        container.scrollLeft = scrollLeft - sectionWidth;
      } else if (scrollLeft <= 0) {
        container.scrollLeft = scrollLeft + sectionWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => container.removeEventListener("scroll", handleScroll);
  }, [carouselItems.length]);

  return (
    <>
      <div className="flex flex-col h-[100dvh] lg:hidden">
        <div className="pt-[25px] w-screen pl-[25px] mt-19.5">
          <h2 className="mb-[9px]">{currentLocation?.title}</h2>
          <p className="mb-[23px]">{currentLocation?.subtitle}</p>
        </div>
        <div
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory no-scrollbar"
        >
          <div className="flex gap-[3px]">
            {tripled.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-center"
                data-carousel-item
              >
                {item.type === "single" ? (
                  <Image
                    src={urlFor(item.image).quality(100).url()}
                    alt={currentLocation?.title}
                    width={283}
                    height={302}
                    className="h-[302px] max-[390px]:h-[202px] w-[283px] object-cover"
                  />
                ) : (
                  <div className="flex w-[283px]" style={{ gap: "3px" }}>
                    <div className="flex-1">
                      <Image
                        src={urlFor(item.images[0]).quality(100).url()}
                        alt={currentLocation?.title}
                        width={137}
                        height={302}
                        className="h-[302px] max-[390px]:h-[202px] w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Image
                        src={urlFor(item.images[1]).quality(100).url()}
                        alt={currentLocation?.title}
                        width={137}
                        height={302}
                        className="h-[302px] max-[390px]:h-[202px] w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          ref={descriptionRef}
          className="flex-1 overflow-y-auto mb-16 mx-[25px] mt-[25px] pb-[63px] no-scrollbar"
        >
          {currentLocation?.description && (
            <PortableText
              value={currentLocation.description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="!alt-p !leading-[13px] max-lg:!leading-[16px]">
                      {children}
                    </p>
                  ),
                },
              }}
            />
          )}
        </div>
      </div>
      <DesktopCarousel currentLocation={currentLocation} />
    </>
  );
}
