import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

export default function DestopCarousel({ currentLocation }) {
  return (
    <div className="hidden lg:flex h-[100dvh] w-screen no-scrollbar">
      <div className="min-w-1/2 max-w-1/2 flex-1 flex flex-col justify-center px-[57px]">
        <h1 className="!text-[24px] max-w-[276px] mb-[25px] mt-[57px]">
          {currentLocation?.title}
        </h1>
        <p className="!text-[13px] mb-[25px]">{currentLocation?.subtitle}</p>
        <div className="max-w-[481px] max-h-[360px] overflow-y-scroll no-scrollbar mb-[93px]">
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
        <ul className="mb-[73px]">
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
      </div>
      <div className="min-w-1/2 max-w-1/2 flex-1 overflow-y-scroll no-scrollbar">
        {currentLocation?.gallery &&
          currentLocation.gallery.length > 0 &&
          currentLocation.gallery.map((image, index) => (
            <Image
              key={index}
              src={urlFor(image).url()}
              alt={`${currentLocation.title} - Gallery image ${index + 1}`}
              width={807}
              height={781.184}
              className={`w-full h-[781.184px] object-cover ${index < currentLocation.gallery.length - 1 ? "mb-[10px]" : ""}`}
            />
          ))}
      </div>
    </div>
  );
}
