"use client";

import { useState, useEffect } from "react";

export default function FullScreenCarousel() {
  const images = ["red.png", "blue.png", "green.png", "pink.png", "yellow.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-center bg-cover transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(/${images[currentImageIndex]})` }}
    ></div>
  );
}
