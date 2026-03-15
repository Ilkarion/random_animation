"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";

import HelixGallery from "./components/HelixGalery/HelixGallery";
import StatsScreen from "./components/StatsScreen/StatsScreen";
import PlanetCarousel from "./components/PanelCarousel/PlanetCarousel";

import { HelixCardData, CarouselItemData } from "./types/types";

import Center1 from "./components/slidesGallery/firstSlide/center/center";
import Sides1 from "./components/slidesGallery/firstSlide/sides";

import Center2 from "./components/slidesGallery/secodSlide/center/center";
import Sides2 from "./components/slidesGallery/secodSlide/sides2";

import Center3 from "./components/slidesGallery/thirdSlide/center3";
import Sides3 from "./components/slidesGallery/thirdSlide/sides3";

import Center4 from "./components/slidesGallery/fourthSlide/center4";
import Sides4 from "./components/slidesGallery/fourthSlide/sides4";

import Center5 from "./components/slidesGallery/fifthSlide/center5";

import Image from "next/image";

import lavaImg from "@/public/imgs/planets/lava.png";
import dryImg from "@/public/imgs/planets/dry.png";
import iceImg from "@/public/imgs/planets/iceStone.png";
import sakuraImg from "@/public/imgs/planets/sacura.png";
import warmImg from "@/public/imgs/planets/warm.png";
import gasImg from "@/public/imgs/planets/gas.png";
import startImg from "@/public/imgs/planets/start.png";

import "./page.css";
import OutroScreen from "./components/OutroScreen/OutroScreen";

gsap.registerPlugin(Observer);

export default function App() {
  const [appState, setAppState] = useState<
    "HELIX" | "STATS" | "PLANETS" | "OUTRO"
  >("HELIX");

  const [helixIndex, setHelixIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const isLocked = useRef(false);
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    gsap.to(mainWrapperRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
    });
  }, [isMounted]);

  /* -------------------- HELIX CARDS -------------------- */

  const myCards = useMemo<HelixCardData[]>(
    () => [
      {
        id: "phase-1",
        bgColor: "transparent",
        leftContent: <Sides1 side="left" isActive={helixIndex === 0} />,
        rightContent: <Sides1 side="right" isActive={helixIndex === 0} />,
        centerContent: <Center1 />,
      },

      {
        id: "phase-2",
        bgColor: "transparent",
        leftContent: <Sides2 side="left" isActive={helixIndex === 1} />,
        rightContent: <Sides2 side="right" isActive={helixIndex === 1} />,
        centerContent: <Center2 />,
      },

      {
        id: "phase-3",
        bgColor: "transparent",
        leftContent: <Sides3 side="left" isActive={helixIndex === 2} />,
        rightContent: <Sides3 side="right" isActive={helixIndex === 2} />,
        centerContent: <Center3 />,
      },

      {
        id: "phase-4",
        bgColor: "transparent",
        leftContent: <Sides4 side="left" isActive={helixIndex === 3} />,
        rightContent: <Sides4 side="right" isActive={helixIndex === 3} />,
        centerContent: <Center4 />,
      },

      {
        id: "phase-5",
        bgColor: "#3b230056",
        leftContent: <div />,
        rightContent: <div />,
        centerContent: <Center5 side="left" isActive={helixIndex === 4} />,
      },
    ],
    [helixIndex],
  );

  /* -------------------- PLANETS -------------------- */

  const myCarouselItems = useMemo<CarouselItemData[]>(
    () => [
      {
        id: "p1",
        title: "LAVA WORLD",
        description: "Extreme temperature planet rich in titanium.",
        bgColor: "#491710",
        textColor: "#fca5a5",

        visualContent: (
          <Image
            src={lavaImg}
            alt="Lava planet"
            priority
            width={1000}
            height={1000}
          />
        ),
      },

      {
        id: "p2",
        title: "WARM PLANET",
        description: "Balanced ecosystem with large vegetation zones.",
        bgColor: "#c9af4875",
        textColor: "#e3cf7f",

        visualContent: (
          <Image src={warmImg} alt="Warm planet" width={1000} height={1000} />
        ),
      },
      {
        id: "p3",
        title: "Your Start",
        description: "Global ocean planet ideal for deuterium extraction.",
        bgColor: "#03111c",
        textColor: "#7dd3fc",

        visualContent: (
          <Image src={startImg} alt="Ocean planet" width={1000} height={1000} />
        ),
      },
      {
        id: "p4",
        title: "Ice",
        description: "Wind, rocks, and ice— brrr...",
        bgColor: "#4376bd3c",
        textColor: "#f0f6ff",

        visualContent: (
          <Image src={iceImg} alt="Ocean planet" width={1000} height={1000} />
        ),
      },
      {
        id: "p5",
        title: "Acid Desert",
        description: "A very dry and toxic planet",
        bgColor: "#9b845a56",
        textColor: "#fae1b3",

        visualContent: (
          <Image src={dryImg} alt="Ocean planet" width={1000} height={1000} />
        ),
      },
      {
        id: "p6",
        title: "Sakura",
        description: "Beautiful and purplish",
        bgColor: "#1e58d520",
        textColor: "#1f1084",

        visualContent: (
          <Image
            src={sakuraImg}
            alt="Ocean planet"
            width={1000}
            height={1000}
          />
        ),
      },
      {
        id: "p7",
        title: "Gas Giant",
        description: "Just gas, no land.",
        bgColor: "#7fc5b728",
        textColor: "#cafaf0",

        visualContent: (
          <Image src={gasImg} alt="Ocean planet" width={1000} height={1000} />
        ),
      },
    ],
    [],
  );

  /* -------------------- BG COLOR -------------------- */

  useEffect(() => {
    let color = "#030712";

    if (appState === "HELIX") color = myCards[helixIndex]?.bgColor || "#030712";

    if (appState === "STATS") color = "#020617";

    if (appState === "PLANETS")
      color = myCarouselItems[carouselIndex]?.bgColor || "#020617";

    if (appState === "OUTRO") color = "#030712";

    gsap.to(".app-background", {
      backgroundColor: color,
      duration: 0.8,
    });
  }, [appState, helixIndex, carouselIndex]);

  /* -------------------- SCROLL -------------------- */

  const handleScroll = (direction: number) => {
    if (isLocked.current) return;

    if (appState === "HELIX") {
      const next = helixIndex + direction;

      if (next >= myCards.length) {
        isLocked.current = true;
        setAppState("STATS");

        setTimeout(() => {
          isLocked.current = false;
        }, 1200);
      } else if (next >= 0) {
        isLocked.current = true;
        setHelixIndex(next);

        setTimeout(() => {
          isLocked.current = false;
        }, 800);
      }
    } else if (appState === "STATS") {
      isLocked.current = true;

      setAppState(direction > 0 ? "PLANETS" : "HELIX");

      setTimeout(() => {
        isLocked.current = false;
      }, 1200);
    } else if (appState === "PLANETS") {
      const next = carouselIndex + direction;

      if (next < 0) {
        isLocked.current = true;
        setAppState("STATS");
        setTimeout(() => {
          isLocked.current = false;
        }, 1200);
      } else if (next >= myCarouselItems.length) {
        // === ДОБАВЛЕННЫЙ ПЕРЕХОД НА OUTRO ===
        isLocked.current = true;
        setAppState("OUTRO");
        setTimeout(() => {
          isLocked.current = false;
        }, 1200);
      } else {
        isLocked.current = true;
        setCarouselIndex(next);
        setTimeout(() => {
          isLocked.current = false;
        }, 800);
      }
    } else if (appState === "OUTRO") {
      // === ВОЗВРАТ ИЗ OUTRO НАЗАД К ПЛАНЕТАМ ===
      if (direction < 0) {
        isLocked.current = true;
        setAppState("PLANETS");
        setTimeout(() => {
          isLocked.current = false;
        }, 1200);
      }
    }
  };

  /* -------------------- OBSERVER -------------------- */

  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",

      wheelSpeed: -1,
      tolerance: 50,
      preventDefault: true,

      onDown: () => handleScroll(-1),
      onUp: () => handleScroll(1),

      onLeft: () => {
        if (appState === "PLANETS") handleScroll(1);
      },

      onRight: () => {
        if (appState === "PLANETS") handleScroll(-1);
      },
    });

    return () => observer.kill();
  }, [appState, helixIndex, carouselIndex]);

  if (!isMounted) return <main className="fixed inset-0 bg-[#030712]" />;

  return (
    <main className="app-background fixed inset-0 overflow-hidden bg-[#030712] text-slate-200">
      <h1 className="titleMain">Dyson Sphere Program</h1>

      <div ref={mainWrapperRef} style={{ opacity: 0 }}>
        <HelixGallery
          cards={myCards}
          currentIndex={helixIndex}
          isActive={appState === "HELIX"}
        />

        <StatsScreen isActive={appState === "STATS"} />

        <PlanetCarousel
          items={myCarouselItems}
          currentIndex={carouselIndex}
          isActive={appState === "PLANETS"}
        />
        <OutroScreen isActive={appState === "OUTRO"} />

      </div>
    </main>
  );
}
