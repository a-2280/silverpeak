"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getLandingPageImages() {
  const query = `
    *[_type == 'landingPage'][0] {
      carouselImages
    }
  `;
  const data = await client.fetch(query);
  if (!data?.carouselImages) return [];
  return data.carouselImages
    .map((image) => urlFor(image).quality(100).url())
    .filter(Boolean);
}

export default function FullScreenCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));

  // Fetch landing page images from Sanity
  useEffect(() => {
    getLandingPageImages().then((landingPageImages) => {
      setImages(landingPageImages);
    });
  }, []);

  // Preload next image in background
  useEffect(() => {
    if (images.length === 0) return;

    const nextIndex = (currentImageIndex + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      const img = document.createElement("img");
      img.src = images[nextIndex];
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, nextIndex]));
      };
    }
  }, [currentImageIndex, images, loadedImages]);

  // Start carousel only after first image and next image are loaded
  useEffect(() => {
    if (images.length === 0 || !loadedImages.has(0)) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        // Only advance if next image is loaded
        if (loadedImages.has(nextIndex)) {
          return nextIndex;
        }
        return prevIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length, loadedImages]);

  if (images.length === 0) return null;

  return (
    <div className="w-screen h-[100dvh] relative">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Location ${index + 1}`}
          fill
          priority={index === 0}
          quality={100}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
    </div>
  );
}
