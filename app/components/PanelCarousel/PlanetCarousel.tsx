'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CarouselItemData } from '@/app/types/types';
import styles from './PlanetCarousel.module.css';

interface PlanetCarouselProps {
  items: CarouselItemData[];
  currentIndex: number;
  isActive: boolean;
}

export default function PlanetCarousel({ items, currentIndex, isActive }: PlanetCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoBlockRef = useRef<HTMLDivElement>(null);
  
  const [activeItem, setActiveItem] = useState<CarouselItemData>(items[0]);

  // Анимация появления/исчезновения всего раздела
  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.6 });
    } else {
      gsap.to(containerRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.6 });
    }
  }, [isActive]);

  // Анимация перелистывания (Coverflow)
  useEffect(() => {
    if (!isActive) return;

    // 1. Анимация 3D объектов (любых TSX компонентов)
    itemsRefs.current.forEach((el, i) => {
      if (!el) return;
      const diff = i - currentIndex;
      const xOffset = diff * 250; // Расстояние между элементами
      const zOffset = Math.abs(diff) * -150;
      const rotateY = diff * -25;
      const scale = Math.max(1 - Math.abs(diff) * 0.25, 0.4);
      const opacity = Math.max(1 - Math.abs(diff) * 0.4, 0);

      gsap.to(el, {
        x: `calc(-50% + ${xOffset}px)`,
        y: '-50%',
        z: zOffset,
        rotationY: rotateY,
        scale: scale,
        opacity: opacity,
        filter: `blur(${Math.abs(diff) * 3}px)`,
        zIndex: 10 - Math.abs(diff),
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // 2. Плавная смена текста (исчезает старый -> меняем стейт -> появляется новый)
    gsap.to(infoBlockRef.current, {
      opacity: 0, y: 10, duration: 0.3,
      onComplete: () => {
        setActiveItem(items[currentIndex]); // Обновляем текст
        gsap.to(infoBlockRef.current, { opacity: 1, y: 0, duration: 0.4 });
      }
    });

  }, [currentIndex, isActive, items]);

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className="absolute top-12 md:top-24 text-3xl font-black uppercase tracking-[0.2em] text-white">
        Классификация
      </h2>

      <div className={styles.track}>
        {items.map((item, i) => (
          <div key={item.id} className={styles.itemWrapper} ref={(el) => { itemsRefs.current[i] = el; }}>
            {/* СЮДА РЕНДЕРИТСЯ ВАШ КАСТОМНЫЙ TSX КОМПОНЕНТ */}
            {item.visualContent}
          </div>
        ))}
      </div>

      <div className={styles.infoBlock} ref={infoBlockRef}>
        <h3 className="text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_15px_currentColor]" style={{ color: activeItem.textColor || '#fff' }}>
          {activeItem.title}
        </h3>
        <div className="w-12 h-1 bg-white/20 mx-auto my-3 rounded-full"></div>
        <p className="text-white/80 text-sm md:text-lg max-w-lg mx-auto">
          {activeItem.description}
        </p>
      </div>
    </div>
  );
}
