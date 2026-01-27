import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface ProductCarouselProps {
  images: string[];
  name: string;
}
export function ProductCarousel({ images, name }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${name} view ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{
              opacity: 0,
              scale: 1.1
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.4
            }}
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0
            }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) nextImage();else
              if (swipe > 50) prevImage();
            }} />

        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={prevImage}
            className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white text-gray-900 transition-colors">

            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white text-gray-900 transition-colors">

            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) =>
        <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${idx === currentIndex ? 'ring-2 ring-market-pink ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>

            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        )}
      </div>
    </div>);

}