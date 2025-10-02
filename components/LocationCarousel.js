"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export default function LocationCarousel({ locations, initialSlug }) {
  const initialIndex = locations?.findIndex(
    (loc) => loc.currentSlug === initialSlug
  ) ?? -1;
  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const scrollRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);
  const isUpdatingRef = useRef(false);

  const activeLocation = locations?.[activeIndex];
  const useInfiniteScroll = (locations?.length ?? 0) >= 3;
  const ITEM_WIDTH = 286;
  const OFFSET = locations?.length ?? 0;

  const displayLocations = useMemo(
    () => locations && useInfiniteScroll ? [...locations, ...locations, ...locations] : locations || [],
    [locations, useInfiniteScroll]
  );

  // Keep ref in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Initial scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !locations) return;

    const startIndex = useInfiniteScroll ? OFFSET + (initialIndex >= 0 ? initialIndex : 0) : (initialIndex >= 0 ? initialIndex : 0);
    const targetScroll = startIndex * ITEM_WIDTH - (container.clientWidth / 2 - 141.5);
    container.scrollLeft = targetScroll;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle scroll updates
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !locations) return;

    let rafId = null;
    let scrollEndTimeout = null;

    const handleScroll = () => {
      if (rafId || isUpdatingRef.current) return;

      rafId = requestAnimationFrame(() => {
        const scrollPosition = container.scrollLeft + container.clientWidth / 2;
        const centerIndex = Math.round(scrollPosition / ITEM_WIDTH);
        const actualIndex = useInfiniteScroll ? centerIndex % locations.length : centerIndex;

        // Only update if changed and valid
        if (
          activeIndexRef.current !== actualIndex &&
          actualIndex >= 0 &&
          actualIndex < locations.length
        ) {
          activeIndexRef.current = actualIndex;
          setActiveIndex(actualIndex);

          // Defer history update to not block render
          queueMicrotask(() => {
            window.history.replaceState(null, "", `/locations/${locations[actualIndex].currentSlug}`);
          });
        }

        rafId = null;
      });
    };

    const handleScrollEnd = () => {
      if (!useInfiniteScroll) return;

      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        const scrollPosition = container.scrollLeft + container.clientWidth / 2;
        const centerIndex = Math.round(scrollPosition / ITEM_WIDTH);

        // Reposition when near edges
        if (centerIndex < OFFSET * 0.5 || centerIndex > OFFSET * 2.5) {
          isUpdatingRef.current = true;
          const actualIndex = centerIndex % locations.length;
          const targetScroll = (OFFSET + actualIndex) * ITEM_WIDTH - (container.clientWidth / 2 - 141.5);
          container.scrollLeft = targetScroll;

          // Allow scroll events again after repositioning
          requestAnimationFrame(() => {
            isUpdatingRef.current = false;
          });
        }
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("scrollend", handleScrollEnd, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(scrollEndTimeout);
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [locations, useInfiniteScroll, OFFSET, ITEM_WIDTH]);

  if (!locations || locations.length === 0) return null;

  return (
    <div className="h-fit flex flex-col justify-center mt-[78.42px] pt-[21.6px]">
      <section className="relative">
        <h2 className="mb-[11px]">{activeLocation.title}</h2>
        <p className="mb-[23px]">{activeLocation.subtitle}</p>
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll snap-x snap-mandatory gap-[3px] scrollbar-hide absolute bottom--1 left-[-25px] w-screen"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {displayLocations.map((location, idx) => (
            <div
              key={`${location.currentSlug}-${idx}`}
              className="snap-center h-[302px] w-[283px] flex-shrink-0"
            >
              <Image
                src={urlFor(location.image).url()}
                alt={location.title}
                width={283}
                height={302}
                priority={idx === (useInfiniteScroll ? OFFSET + activeIndex : activeIndex)}
                className="w-[283px] h-[302px] object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      {activeLocation?.description && (
        <section className="mt-[327px]">
          <PortableText
            value={activeLocation.description}
            components={{
              block: {
                normal: ({ children }) => <p className="alt-p">{children}</p>,
              },
            }}
          />
        </section>
      )}
    </div>
  );
}
