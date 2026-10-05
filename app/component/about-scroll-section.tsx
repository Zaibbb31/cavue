"use client";

import React, { useEffect, useRef, useState } from "react";

interface CardConfig {
  id: number;
  label: string;
  number: string;
  description: string;
  side: "left" | "right";
  start: number;
  end: number;
}

const cardsData: CardConfig[] = [
  {
    id: 1,
    label: "Clients & Counting",
    number: "25+",
    description:
      "Brands that trusted us to build their visibility.",
    side: "left",
    start: 0.02,
    end: 0.46,
  },
  {
    id: 2,
    label: "Brand Thinking",
    number: "360°",
    description:
      "A holistic approach connecting strategy, creative design, and digital execution.",
    side: "right",
    start: 0.15,
    end: 0.59,
  },
  {
    id: 3,
    label: "Industries",
    number: "10+",
    description:
      "Experience across categories from hospitality to real estate, lifestyle and beyond.",
    side: "left",
    start: 0.28,
    end: 0.72,
  },
  {
    id: 4,
    label: "Brand Projects",
    number: "50+",
    description:
      "Built to make brands seen, heard & remembered.",
    side: "right",
    start: 0.41,
    end: 0.85,
  },
];

function calculateCardMotion(progress: number, start: number, end: number) {
  if (progress < start) {
    return { y: "115vh", opacity: 0 };
  }
  if (progress > end) {
    return { y: "-115vh", opacity: 0 };
  }

  // Normalized 0 to 1 progress within card's active window
  const t = (progress - start) / (end - start);

  // Smooth motion from +115vh (below screen) to -115vh (above screen)
  const yVal = 115 - t * 230;

  // Smooth fade-in and fade-out
  let opacity = 1;
  if (t < 0.12) {
    opacity = t / 0.12;
  } else if (t > 0.88) {
    opacity = (1 - t) / 0.12;
  }

  return {
    y: `${yVal}vh`,
    opacity,
  };
}

export default function AboutScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScroll;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] sm:h-[300vh]">
      {/* Sticky Fullscreen Background (#3886AD) */}
      <div className="sticky top-0 h-screen w-full bg-[#3886AD] overflow-hidden flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
        
        {/* Central Background Headline (Behind Cards: z-0) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 pointer-events-none select-none">
          <span className="font-gochi text-white text-base sm:text-lg tracking-wider mb-3 sm:mb-4 block">
            / ABOUT US
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] xl:text-[68px] font-medium text-[#0B3954] leading-[1.1] uppercase tracking-tight">
            WE TURN BOLD IDEAS <br className="hidden sm:inline" />
            INTO BRANDS THAT <br className="hidden sm:inline" />
            <span className="font-gochi text-white text-[1.25em] normal-case tracking-normal inline-block transform -rotate-1">
              people
            </span>{" "}
            REMEMBER.
          </h2>
        </div>

        {/* Floating Cards Layer (In Front of Text: z-20) */}
        <div className="absolute inset-0 z-20 max-w-7xl mx-auto pointer-events-none flex items-center justify-center">
          {cardsData.map((card) => {
            const motion = calculateCardMotion(progress, card.start, card.end);

            return (
              <div
                key={card.id}
                style={{
                  transform: `translate3d(0, ${motion.y}, 0)`,
                  opacity: motion.opacity,
                }}
                className={`absolute ${
                  card.side === "left"
                    ? "left-4 sm:left-8 md:left-14 lg:left-20"
                    : "right-4 sm:right-8 md:right-14 lg:right-20"
                } w-[280px] sm:w-[340px] md:w-[390px] bg-white text-[#0C4568] p-6 sm:p-8 transition-transform duration-75 ease-out pointer-events-auto border border-black/5`}
              >
                <span className="text-xs sm:text-sm font-semibold text-[#0C4568] block mb-2 sm:mb-3">
                  {card.label}
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#0C4568] mb-2 sm:mb-3">
                  {card.number}
                </div>
                <p className="text-xs sm:text-sm text-[#476B82] leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
