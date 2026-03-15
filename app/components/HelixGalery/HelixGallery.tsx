'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HelixCardData } from '../../types/types'; // Убедитесь в правильности пути
import styles from './HelixGallery.module.css';

interface HelixGalleryProps {
  cards: HelixCardData[];
  currentIndex: number;
  isActive: boolean;
}

export default function HelixGallery({ cards, currentIndex, isActive }: HelixGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftPanelsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. СТЕЙТ ДЛЯ АДАПТИВНЫХ РАЗМЕРОВ
  const [dimensions, setDimensions] = useState({ radius: 600, yStep: 120 });

  // 2. СЛУШАТЕЛЬ РЕСАЙЗА ЭКРАНА (ПРОФЕССИОНАЛЬНЫЙ АДАПТИВ)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: 250, yStep: 80 }); // Телефоны
      } else if (width < 1024) {
        setDimensions({ radius: 400, yStep: 100 }); // Планшеты / Маленькие ноутбуки
      } else {
        setDimensions({ radius: 600, yStep: 120 }); // Большие экраны
      }
    };

    handleResize(); // Вызываем сразу при загрузке
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { radius, yStep } = dimensions;
  const angleStep = 360 / Math.max(cards.length, 6);
  const totalY = (cards.length - 1) * yStep;

  // 3. ПЕРЕСЧЕТ 3D КООРДИНАТ ПРИ ИЗМЕНЕНИИ ЭКРАНА
  useEffect(() => {
    cardsRefs.current.forEach((card, i) => {
      if (!card) return;
      const angle = i * angleStep;
      const angleRad = (angle * Math.PI) / 180;
      const yOffset = (i - (cards.length - 1) / 2) * yStep;

      gsap.set(card, {
        xPercent: -50, yPercent: -50,
        x: Math.sin(angleRad) * radius,
        z: Math.cos(angleRad) * radius,
        y: yOffset, rotationY: angle
      });
    });
  }, [cards.length, angleStep, totalY, radius, yStep]);

  // 4. АНИМАЦИЯ ПЕРЕКЛЮЧЕНИЯ
  useEffect(() => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      y: totalY / 2 - currentIndex * yStep,
      rotationY: -currentIndex * angleStep,
      z: -radius, 
      duration: 0.6, 
      ease: 'power2.out'
    });

    // Карточки
    cardsRefs.current.forEach((card, i) => {
      if (!card) return;
      const distance = Math.abs(currentIndex - i);
      const blurVal = Math.min(distance * 5, 15);
      const targetOpacity = Math.max(1 - distance / 1, 0);

      gsap.to(card, {
        filter: distance === 0 ? 'none' : `blur(${blurVal}px)`,
        autoAlpha: targetOpacity, 
        scale: distance === 0 ? 1 : Math.max(1 - distance * 0.2, 0.7),
        pointerEvents: distance === 0 ? 'auto' : 'none',
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Левые панели
    leftPanelsRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const isCurrent = i === currentIndex;
      gsap.to(panel, {
        opacity: isCurrent ? 1 : 0,
        y: isCurrent ? 0 : (i < currentIndex ? -20 : 20),
        duration: 0.4, ease: 'power2.out', pointerEvents: isCurrent ? 'auto' : 'none'
      });
    });

    // Правые панели
    rightPanelsRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const isCurrent = i === currentIndex;
      gsap.to(panel, {
        opacity: isCurrent ? 1 : 0,
        y: isCurrent ? 0 : (i < currentIndex ? -20 : 20),
        duration: 0.4, ease: 'power2.out', pointerEvents: isCurrent ? 'auto' : 'none'
      });
    });
  }, [currentIndex, angleStep, totalY, yStep, radius]);

  return (
    <div 
      className={styles.container} 
      style={{ 
        opacity: isActive ? 1 : 0, 
        pointerEvents: isActive ? 'auto' : 'none',
        touchAction: 'none' // ЖЕСТКО ЗАПРЕЩАЕМ СКРОЛЛ НА МОБИЛКАХ
      }}
    >
      {/* Левые панели */}
      <div className={styles.sidePanelLeft}>
        {cards.map((card, i) => (
          <div key={`left-${card.id}`} className={styles.panelItem} ref={(el) => { leftPanelsRefs.current[i] = el; }}>
            {card.leftContent}
          </div>
        ))}
      </div>

      {/* Сама спираль */}
      <div className={styles.sceneTilt}>
        <div className={styles.helixTrack} ref={trackRef}>
          {cards.map((card, i) => (
            <div key={`card-${card.id}`} className={styles.cardWrapper} ref={(el) => { cardsRefs.current[i] = el; }}>
              {card.centerContent}
            </div>
          ))}
        </div>
      </div>

      {/* Правые панели */}
      <div className={styles.sidePanelRight}>
        {cards.map((card, i) => (
          <div key={`right-${card.id}`} className={styles.panelItem} ref={(el) => { rightPanelsRefs.current[i] = el; }}>
            {card.rightContent}
          </div>
        ))}
      </div>
    </div>
  );
}
