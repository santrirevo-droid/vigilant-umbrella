"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { gallerySections, type GalleryPhoto } from "@/lib/galleryData";

type FlatPhoto = GalleryPhoto & { sectionTitle: string; globalIndex: number };

/** One chronological moment: a small step marker + title, then its own
 * masonry grid of photos. Owns its own scroll-reveal so each moment
 * animates in as it's reached, instead of one giant trigger for all 51
 * photos at once. */
function GallerySectionBlock({
  step,
  title,
  subtitle,
  photos,
  startIndex,
  onOpen,
}: {
  step: number;
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
  startIndex: number;
  onOpen: (globalIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { stagger: 0.06 });

  return (
    <div ref={ref} className="mt-14 first:mt-0">
      <div data-reveal className="flex items-baseline gap-3">
        <span className="font-display text-2xl font-semibold text-accent/50 tabular-nums">
          {String(step).padStart(2, "0")}
        </span>
        <div className="text-left">
          <h3 className="font-display text-xl font-medium text-on-maroon">{title}</h3>
          <p className="font-accent text-xs tracking-[0.15em] text-on-maroon-soft [font-variant-caps:small-caps]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 columns-2 gap-2.5 sm:gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            data-reveal
            onClick={() => onOpen(startIndex + i)}
            className="group relative mb-2.5 block w-full overflow-hidden rounded-xl bg-maroon-light sm:mb-3"
            style={{ breakInside: "avoid" }}
            aria-label={`Perbesar foto ${title} ${i + 1}`}
          >
            <Image
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 640px) 260px, 50vw"
              className="h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-deep/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: FlatPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
      else if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("scroll-locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [index, photos.length, onClose, onNavigate]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-maroon-deep/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-on-maroon-soft">
        <span className="font-accent text-xs tracking-[0.2em] [font-variant-caps:small-caps]">
          {photo.sectionTitle} · {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-on-maroon"
        >
          <X size={20} />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-3 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
          aria-label="Foto sebelumnya"
          className="absolute left-1 z-10 rounded-full p-2 text-on-maroon-soft transition-colors hover:bg-white/10 hover:text-on-maroon sm:left-4"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="relative h-full max-h-[78vh] w-full max-w-3xl">
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % photos.length)}
          aria-label="Foto berikutnya"
          className="absolute right-1 z-10 rounded-full p-2 text-on-maroon-soft transition-colors hover:bg-white/10 hover:text-on-maroon sm:right-4"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const introRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(introRef);

  const flatPhotos = useMemo<FlatPhoto[]>(() => {
    const out: FlatPhoto[] = [];
    gallerySections.forEach((section) => {
      section.photos.forEach((photo) => {
        out.push({ ...photo, sectionTitle: section.title, globalIndex: out.length });
      });
    });
    return out;
  }, []);

  // running start offset per section, into the flattened list, so the
  // lightbox can page continuously across section boundaries
  const startOffsets = useMemo(() => {
    const offsets: number[] = [];
    let running = 0;
    gallerySections.forEach((section) => {
      offsets.push(running);
      running += section.photos.length;
    });
    return offsets;
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpen = useCallback((globalIndex: number) => setLightboxIndex(globalIndex), []);
  const handleClose = useCallback(() => setLightboxIndex(null), []);
  const handleNavigate = useCallback((next: number) => setLightboxIndex(next), []);

  return (
    <section id="galeri" className="relative overflow-hidden px-6 py-24 text-center">
      <div ref={introRef} className="mx-auto max-w-md">
        <SectionHeading eyebrow="Galeri" title="Kilas Balik" />
        <p data-reveal className="mx-auto mt-4 max-w-sm font-body text-[15px] leading-[1.6] text-on-maroon-soft">
          Rangkaian momen hari bahagia kami, dari siraman sehari sebelumnya
          hingga resepsi malam — 17–18 Agustus 2026.
        </p>
      </div>

      <div className="mx-auto mt-4 max-w-md">
        {gallerySections.map((section, i) => (
          <GallerySectionBlock
            key={section.slug}
            step={i + 1}
            title={section.title}
            subtitle={section.subtitle}
            photos={section.photos}
            startIndex={startOffsets[i]}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={flatPhotos}
          index={lightboxIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
}
