"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CarouselItemData } from "@/app/types/types";
import styles from "./PlanetCarousel.module.css";

interface PlanetCarouselProps {
  items: CarouselItemData[];
  currentIndex: number;
  isActive: boolean;
}

export default function PlanetCarousel({
  items,
  currentIndex,
  isActive,
}: PlanetCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoBlockRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<CarouselItemData>(items[0]);

  /* appear */
  useEffect(() => {
    gsap.to(containerRef.current, {
      opacity: isActive ? 1 : 0,
      pointerEvents: isActive ? "auto" : "none",
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [isActive]);

  /* fade in/out animation */
  useEffect(() => {
    if (!isActive) return;

    itemsRefs.current.forEach((el, i) => {
      if (!el) return;

      const isCurrent = i === currentIndex;

      gsap.to(el, {
        // Жестко фиксируем по центру
        x: "-50%",
        y: "-50%",
        z: 0,
        rotationY: 0,
        
        // Активная планета нормального размера, неактивные чуть меньше
        scale: isCurrent ? 1 : 0.8,
        
        // Показываем только центральную
        opacity: isCurrent ? 1 : 0,
        
        // Убираем блюр
        filter: "blur(0px)",
        
        duration: 0.8,
        ease: "power2.out",
        zIndex: isCurrent ? 50 : 10,
        pointerEvents: isCurrent ? "auto" : "none",
      });
    });

    // Анимация смены текста
    gsap.to(infoBlockRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        setActiveItem(items[currentIndex]);

        gsap.to(infoBlockRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      },
    });
  }, [currentIndex, isActive, items]);

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      style={{ touchAction: 'none' }} /* ЖЕСТКАЯ БЛОКИРОВКА СКРОЛЛА/СВАЙПА ДЛЯ МОБИЛОК */
    >
      {/* Заголовок сверху */}
      <h2 className="absolute top-12 md:top-16 text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white drop-shadow-lg z-50 text-center w-full px-4">
        Planets
      </h2>

      {/* Контейнер для планет */}
      <div className={styles.track}>
        {items.map((item, i) => (
          <div
            key={item.id}
            className={styles.itemWrapper}
            ref={(el) => {
              itemsRefs.current[i] = el;
            }}
          >
            {item.visualContent}
          </div>
        ))}
      </div>

      {/* Информационный блок */}
      <div className={styles.infoBlock} ref={infoBlockRef}>
        <h3
          className="text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] drop-shadow-[0_0_15px_currentColor]"
          style={{ color: activeItem.textColor || "#38bdf8" }}
        >
          {activeItem.title}
        </h3>
        
        {/* Декоративная линия */}
        <div className="w-12 md:w-16 h-1 bg-white/20 mx-auto my-3 md:my-4 rounded-full"></div>
        
        <p className="text-white/80 text-sm md:text-lg max-w-sm md:max-w-xl mx-auto leading-relaxed drop-shadow-md">
          {activeItem.description}
        </p>
      </div>
    </div>
  );
}
