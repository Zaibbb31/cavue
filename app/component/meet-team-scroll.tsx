"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  position: "left-top" | "right-top" | "center" | "left-bottom" | "right-bottom";
  targetOffset: number; // progress value where card is in ideal reference position
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Founder & Creative Director",
    image: "/images/creator_podcast_host.jpg",
    position: "left-top",
    targetOffset: 0.38,
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Head of Brand Strategy",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    position: "right-top",
    targetOffset: 0.44,
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "VP of Product",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    position: "center",
    targetOffset: 0.4,
  },
  {
    id: 4,
    name: "Evan Brooks",
    role: "Head of Creator Growth",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    position: "left-bottom",
    targetOffset: 0.48,
  },
  {
    id: 5,
    name: "Maya Patel",
    role: "Lead Content Producer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
    position: "right-bottom",
    targetOffset: 0.52,
  },
];

export default function MeetTeamScrollSection() {
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
    <div ref={containerRef} className="relative w-full h-[250vh] sm:h-[280vh] bg-white">
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center text-[#0C3852] px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Ambient Light Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#348DBF]/10 via-[#0C3852]/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Central Pinned Content: / TEAM + Meet the Team + The people behind your growth */}
        <div className="z-10 text-center max-w-xl mx-auto px-4 select-none pointer-events-none transition-transform duration-100">
          <span className="font-gochi text-[#348DBF] text-base sm:text-xl tracking-wider mb-2 sm:mb-3 block">
            / TEAM
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-bold text-[#0C3852] tracking-tight leading-[1.08]">
            Meet the Team
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-500 text-sm sm:text-base md:text-lg font-normal">
            The people behind your growth
          </p>
        </div>

        {/* Floating Team Image Cards Layer */}
        <div className="absolute inset-0 z-20 max-w-7xl mx-auto pointer-events-none">
          {teamMembers.map((member) => {
            // Motion calculation: cards move upwards as user scrolls
            const travelDistance = 175; // in vh
            const yOffsetVh = (member.targetOffset - progress) * travelDistance;

            // Fade opacity when entering and leaving
            let opacity = 1;
            if (yOffsetVh > 80) {
              opacity = Math.max(0, 1 - (yOffsetVh - 80) / 25);
            } else if (yOffsetVh < -80) {
              opacity = Math.max(0, 1 - (-yOffsetVh - 80) / 25);
            }

            // Position classes based on exact layout in reference image
            let positionClasses = "";
            if (member.position === "left-top") {
              positionClasses = "left-3 sm:left-6 md:left-10 lg:left-14 top-[8%] sm:top-[10%]";
            } else if (member.position === "right-top") {
              positionClasses = "right-3 sm:right-6 md:right-10 lg:right-14 top-[16%] sm:top-[18%]";
            } else if (member.position === "center") {
              positionClasses = "left-1/2 -translate-x-1/2 top-[55%] sm:top-[58%]";
            } else if (member.position === "left-bottom") {
              positionClasses = "left-3 sm:left-6 md:left-10 lg:left-14 top-[64%] sm:top-[68%]";
            } else if (member.position === "right-bottom") {
              positionClasses = "right-3 sm:right-6 md:right-10 lg:right-14 top-[72%] sm:top-[76%]";
            }

            return (
              <div
                key={member.id}
                style={{
                  transform: `translate3d(0, ${yOffsetVh}vh, 0)`,
                  opacity,
                }}
                className={`absolute ${positionClasses} w-[145px] sm:w-[210px] md:w-[260px] lg:w-[290px] h-[190px] sm:h-[270px] md:h-[330px] lg:h-[370px] rounded-none bg-slate-100 overflow-hidden shadow-xl border border-black/10 transition-transform duration-75 ease-out pointer-events-auto group cursor-pointer`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 260px, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={member.id === 1 || member.id === 3}
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Team Member Details Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 text-white z-10">
                  <h3 className="text-xs sm:text-base md:text-lg font-bold tracking-tight text-white leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-300 font-medium mt-0.5 sm:mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
