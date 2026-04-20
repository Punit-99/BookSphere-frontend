import { useEffect, useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { ImageCarouselProps } from "@/lib/types";

type Props = ImageCarouselProps & {
  mode?: "editor" | "viewer";
  autoPlay?: boolean;
  interval?: number;
};

const ImageCarousel = ({
  images,
  onDelete,
  onAddMore,
  mode = "editor",
  autoPlay = true,
  interval = 3000,
}: Props) => {
  const apiRef = useRef<any>(null);

  // ================= AUTO PLAY =================
  useEffect(() => {
    if (!autoPlay) return;

    const id = setInterval(() => {
      apiRef.current?.scrollNext();
    }, interval);

    return () => clearInterval(id);
  }, [autoPlay, interval]);

  return (
    <div className="w-full h-full relative">
      <Carousel
        opts={{ loop: true }}
        setApi={(api) => (apiRef.current = api)}
        className="w-full h-full relative"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-80 overflow-hidden rounded-md">
                {/* IMAGE */}
                <img
                  src={img.url}
                  alt={img.title || "image"}
                  className="w-full h-full object-cover"
                />

                {/* DARK OVERLAY */}
                {mode === "viewer" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                )}

                {/* ================= PER SLIDE CONTENT ================= */}
                {mode === "viewer" && (img.title || img.description) && (
                  <div className="absolute bottom-4 left-4 text-white max-w-[70%] space-y-1">
                    {img.title && (
                      <h2 className="text-lg font-bold">{img.title}</h2>
                    )}

                    {img.description && (
                      <p className="text-xs text-gray-200 line-clamp-2">
                        {img.description}
                      </p>
                    )}
                  </div>
                )}

                {/* EDITOR CONTROLS */}
                {mode === "editor" && onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 text-xs shadow"
                  >
                    ✕
                  </button>
                )}

                {mode === "editor" && onAddMore && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddMore();
                    }}
                    className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow"
                  >
                    Add More
                  </button>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ================= CENTER NAV ================= */}
        <CarouselPrevious
          className="
            absolute left-4 top-1/2 -translate-y-1/2
            z-20 bg-white/90 hover:bg-white shadow-md rounded-full
          "
        />

        <CarouselNext
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            z-20 bg-white/90 hover:bg-white shadow-md rounded-full
          "
        />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
