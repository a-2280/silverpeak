"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export default function LocationCarousel({ locations, initialSlug }) {
  const initialIndex =
    locations?.findIndex((loc) => loc.currentSlug === initialSlug) ?? 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollRef = useRef(null);
  const lastScrollLeft = useRef(0);
  const itemsRef = useRef([]);

  const ITEM_WIDTH = 286; // 283px + 3px gap
  const BUFFER_COUNT = 3; // How many items to render on each side

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !locations?.length) return;

    // Center the initial item
    const centerScroll = container.clientWidth / 2 - 141.5;
    container.scrollLeft = centerScroll;
    lastScrollLeft.current = centerScroll;

    // Position items initially
    itemsRef.current.forEach((item, idx) => {
      if (!item) return;
      const offset = idx - BUFFER_COUNT;
      const position = (initialIndex + offset) % locations.length;
      const realPosition =
        position < 0 ? position + locations.length : position;
      item.dataset.logicalIndex = realPosition;
      item.style.transform = `translateX(${offset * ITEM_WIDTH}px)`;
    });
  }, [locations, initialIndex, ITEM_WIDTH]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !locations?.length) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const centerScroll = container.clientWidth / 2 - 141.5;

      // Determine which item is centered
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const currentTransform = parseFloat(
          item.style.transform.match(/translateX\(([^)]+)px\)/)?.[1] || 0
        );
        const itemCenter = centerScroll + currentTransform;
        const distanceFromCenter = Math.abs(itemCenter - scrollLeft);

        // If this item is roughly centered, update active index
        if (distanceFromCenter < ITEM_WIDTH / 2) {
          const logicalIndex = parseInt(item.dataset.logicalIndex);
          if (logicalIndex !== activeIndex) {
            setActiveIndex(logicalIndex);
            window.history.replaceState(
              null,
              "",
              `/locations/${locations[logicalIndex].currentSlug}`
            );
          }
        }
      });

      // Reposition items that have scrolled too far in either direction
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const currentTransform = parseFloat(
          item.style.transform.match(/translateX\(([^)]+)px\)/)?.[1] || 0
        );
        const itemLeft = centerScroll + currentTransform;
        const viewportWidth = container.clientWidth;

        // If item is too far left, move it to the right
        if (itemLeft < scrollLeft - viewportWidth) {
          const newTransform =
            currentTransform + (BUFFER_COUNT * 2 + 1) * ITEM_WIDTH;
          item.style.transform = `translateX(${newTransform}px)`;

          const currentLogical = parseInt(item.dataset.logicalIndex);
          const newLogical =
            (currentLogical + BUFFER_COUNT * 2 + 1) % locations.length;
          item.dataset.logicalIndex = newLogical;
        }
        // If item is too far right, move it to the left
        else if (itemLeft > scrollLeft + viewportWidth * 2) {
          const newTransform =
            currentTransform - (BUFFER_COUNT * 2 + 1) * ITEM_WIDTH;
          item.style.transform = `translateX(${newTransform}px)`;

          const currentLogical = parseInt(item.dataset.logicalIndex);
          const newLogical = currentLogical - (BUFFER_COUNT * 2 + 1);
          const wrapped =
            newLogical < 0 ? newLogical + locations.length : newLogical;
          item.dataset.logicalIndex = wrapped;
        }
      });

      lastScrollLeft.current = scrollLeft;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [locations, activeIndex, ITEM_WIDTH]);

  if (!locations || locations.length === 0) return null;

  const activeLocation = locations[activeIndex];

  // Render enough items to fill viewport + buffers
  const renderItems = Array.from({ length: BUFFER_COUNT * 2 + 1 }, (_, i) => i);

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
          <div className="relative h-[302px]" style={{ width: "100%" }}>
            {renderItems.map((i) => {
              const offset = i - BUFFER_COUNT;
              const position = (initialIndex + offset) % locations.length;
              const realPosition =
                position < 0 ? position + locations.length : position;
              const location = locations[realPosition];

              return (
                <div
                  key={i}
                  ref={(el) => (itemsRef.current[i] = el)}
                  data-logical-index={realPosition}
                  className="snap-center h-[302px] w-[283px] absolute top-0 left-0"
                  style={{
                    transform: `translateX(${offset * ITEM_WIDTH}px)`,
                    transition: "none",
                  }}
                >
                  <Image
                    src={urlFor(location.image).url()}
                    alt={location.title}
                    width={283}
                    height={302}
                    priority={realPosition === activeIndex}
                    className="w-[283px] h-[302px] object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {activeLocation?.description && (
        <section className="mt-[327px]">
          <PortableText
            value={activeLocation.description}
            components={{
              block: {
                normal: ({ children }) => <p className="!alt-p">{children}</p>,
              },
            }}
          />
        </section>
      )}
    </div>
  );
}
