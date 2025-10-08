"use client";

import { useState, useEffect } from "react";

export default function FullScreenCarousel() {
  const images = ["red.png", "blue.png", "green.png", "pink.png", "yellow.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `/${src}`;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises).then(() => setImagesLoaded(true));
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, imagesLoaded]);

  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-center bg-cover transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(/${images[currentImageIndex]})` }}
    ></div>
  );
}
