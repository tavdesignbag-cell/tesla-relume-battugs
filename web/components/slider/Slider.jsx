"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SlideCard from "./SlideCard";

const GAP = 32; // track-ийн gap-8

export function ArrowButton({ dir, onClick }) {
  const back = dir < 0;
  return (
    <button
      type="button"
      aria-label={back ? "Өмнөх" : "Дараах"}
      onClick={onClick}
      className="flex items-center justify-center rounded border border-white bg-fg p-3 hover:bg-arrow-hover"
    >
      <img src={back ? "/assets/arrow-back.svg" : "/assets/arrow-forward.svg"} alt="" width={24} height={24} />
    </button>
  );
}

export default function Slider({ title, description, slides }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Нэг картын өргөн + gap
  function getStep(track) {
    const slide = track.firstElementChild;
    return slide ? slide.offsetWidth + GAP : track.clientWidth;
  }

  // Нэг удаад нэг карт гүйлгэнэ
  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: getStep(track) * dir, behavior: "smooth" });
  }

  // Цэг дээр дарахад тухайн карт руу очно
  function scrollTo(index) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: getStep(track) * index, behavior: "smooth" });
  }

  // Гүйлгэх байрлалаас идэвхтэй картыг тооцно (сум, swipe, trackpad бүгдэд ажиллана)
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    // Төгсгөлд хүрвэл сүүлийн цэгийг идэвхжүүлнэ (хэд хэдэн карт зэрэг харагдах үед)
    const index =
      track.scrollLeft >= maxScroll - 2 ? slides.length - 1 : Math.round(track.scrollLeft / getStep(track));
    setActive(index);
  }

  return (
    <Section>
      <Container className="flex flex-col gap-12 lg:gap-20">
        <SectionHeading title={title} description={description} className="max-w-[768px]" />
        <div className="flex flex-col gap-8">
          {/* Дизайн шиг баруун ирмэг рүү гаргана */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="scrollbar-none -mr-5 flex snap-x snap-mandatory gap-8 overflow-x-auto pr-5 lg:-mr-16 lg:pr-16"
          >
            {slides.map((slide) => (
              <SlideCard key={slide.id} {...slide} />
            ))}
          </div>
          {/* Зүүн хоосон | цэгүүд голд | сумнууд баруун */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="col-start-2 flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`${i + 1}-р карт`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => scrollTo(i)}
                  className={`size-2 rounded-full bg-black transition-opacity duration-150 ${
                    i === active ? "opacity-100" : "opacity-20 hover:opacity-40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4 justify-self-end">
              <ArrowButton dir={-1} onClick={() => scroll(-1)} />
              <ArrowButton dir={1} onClick={() => scroll(1)} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
