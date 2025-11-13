import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({ images, hidden, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (hidden) return null;

  const handlePrevious = () => {
    setIsLoading(true);
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsLoading(true);
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="bg-black/50 h-[100dvh] w-screen absolute top-0 left-0 z-[100] flex flex-col justify-center items-center"
      onClick={onClose}
    >
      <div className="relative flex items-center justify-center h-[90dvh]">
        {isLoading && (
          <div className="absolute w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        <Image
          src={images[imageIndex]}
          alt={imageIndex}
          width={800}
          height={600}
          quality={100}
          onLoad={() => setIsLoading(false)}
          onClick={(e) => e.stopPropagation()}
          className={`h-[90dvh] w-auto max-w-[800px] transition-opacity duration-200 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="flex gap-8 py-2" onClick={(e) => e.stopPropagation()}>
        <button onClick={handlePrevious} className="!text-white">
          <ChevronLeft />
        </button>
        <button onClick={handleNext} className="!text-white">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
