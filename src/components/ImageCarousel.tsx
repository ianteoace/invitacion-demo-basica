"use client";

type GalleryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type ImageCarouselProps = {
  images: GalleryImage[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="mx-auto grid max-w-full grid-cols-1 gap-4 sm:max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
      {images.map((image) => (
        <div
          key={image.src}
          className="group overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/78 shadow-[0_20px_44px_rgba(58,46,57,0.08)] sm:rounded-[2rem]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="block aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}
