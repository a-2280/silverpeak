"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { useRouter } from "next/navigation";
import ImageCarousel from "./ImageCarousel";

export default function DestopCarousel({ currentLocation }) {
  const router = useRouter();
  const galleryRef = useRef(null);
  const [hideCarousel, setHideCarousel] = useState(true);

  useEffect(() => {
    const handleWheel = (e) => {
      if (galleryRef.current) {
        e.preventDefault();
        galleryRef.current.scrollTop += e.deltaY;
      }
    };

    // Add event listener to the entire window
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <div className="hidden lg:flex h-[100dvh] w-screen no-scrollbar">
        <div className="min-w-1/2 max-w-1/2 flex-1 flex flex-col justify-start items-start px-[25px] gap-[25px] pt-[176px]">
          <h1 className="!text-[24px] max-w-[276px]">
            {currentLocation?.title}
          </h1>
          <p className="!text-[13px]">{currentLocation?.subtitle}</p>
          <div className="">
            <p className="!alt-p !text-[15px]">
              <span style={{ fontWeight: 600 }}>Construction Type: </span>
              {currentLocation?.construction}
            </p>
            <p className="!alt-p !text-[15px]">
              <span style={{ fontWeight: 600 }}>Square Footage: </span>
              {currentLocation?.squareFootage}
            </p>
          </div>
          <div className="max-w-[481px] max-h-[360px] overflow-y-scroll no-scrollbar">
            {currentLocation?.description && (
              <PortableText
                value={currentLocation.description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="!alt-p !text-[15px]">{children}</p>
                    ),
                  },
                }}
              />
            )}
          </div>
          <ul className="">
            {currentLocation?.attributes?.map((attribute, index) => (
              <li
                key={index}
                className="flex items-center gap-[4.64px] !text-[15px]"
              >
                <Image
                  src="/arrow.svg"
                  alt="arrow"
                  width={15}
                  height={15}
                  className="scale-x-[-1]"
                />
                {attribute}
              </li>
            ))}
          </ul>
          <button onClick={() => router.back()} className="!text-[13px]">
            Back
          </button>
        </div>
        <div
          ref={galleryRef}
          className="min-w-1/2 max-w-1/2 flex-1 overflow-y-scroll no-scrollbar"
          style={{ paddingRight: "25px" }}
        >
          {currentLocation?.gallery &&
            currentLocation.gallery.length > 0 &&
            (() => {
              const rows = [];
              let i = 0;
              while (i < currentLocation.gallery.length) {
                const current = currentLocation.gallery[i];
                const next = currentLocation.gallery[i + 1];

                if (current?.pairWithNext && next?.image) {
                  // Paired images
                  rows.push(
                    <div
                      key={i}
                      className={`flex w-full ${i + 1 < currentLocation.gallery.length - 1 ? "mb-[10px]" : ""}`}
                      style={{ gap: "9px" }}
                    >
                      <div className="flex-1 relative w-full h-auto bg-gray-200">
                        <Image
                          src={urlFor(current.image).quality(100).url()}
                          alt={`${currentLocation.title} - Gallery image ${i + 1}`}
                          width={798}
                          height={1562}
                          quality={100}
                          unoptimized
                          className="w-full h-auto object-cover cursor-pointer"
                          onClick={() => setHideCarousel(false)}
                        />
                      </div>
                      <div className="flex-1 relative w-full h-auto bg-gray-200">
                        <Image
                          src={urlFor(next.image).quality(100).url()}
                          alt={`${currentLocation.title} - Gallery image ${i + 2}`}
                          width={798}
                          height={1562}
                          quality={100}
                          unoptimized
                          className="w-full h-auto object-cover cursor-pointer"
                          onClick={() => setHideCarousel(false)}
                        />
                      </div>
                    </div>
                  );
                  i += 2;
                } else if (current?.image) {
                  // Single image
                  rows.push(
                    <div key={i} className={`relative w-full bg-gray-200 ${i < currentLocation.gallery.length - 1 ? "mb-[10px]" : ""}`}>
                      <Image
                        src={urlFor(current.image).quality(100).url()}
                        alt={`${currentLocation.title} - Gallery image ${i + 1}`}
                        width={1614}
                        height={1562}
                        quality={100}
                        unoptimized
                        className="w-full h-auto object-cover cursor-pointer"
                        onClick={() => setHideCarousel(false)}
                      />
                    </div>
                  );
                  i += 1;
                } else {
                  // Skip invalid entries
                  i += 1;
                }
              }
              return rows;
            })()}
        </div>
      </div>

      <ImageCarousel
        images={currentLocation.gallery?.map((item) => urlFor(item.image).quality(100).url()) || []}
        hidden={hideCarousel}
        onClose={() => setHideCarousel(true)}
      />
    </>
  );
}
