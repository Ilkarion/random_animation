'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './StatsScreen.module.css';

interface StatsScreenProps {
  isActive: boolean;
}

export default function StatsScreen({ isActive }: StatsScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isActive) {
      // Показываем контейнер
      gsap.to(containerRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.6 });
      
      // Анимация появления элементов
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'back.out(1.5)' }
      );
      
      gsap.fromTo(blocksRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.4, ease: 'back.out(1.2)' }
      );

      // Анимация чисел (если нужно, можно вынести в отдельный компонент)
      blocksRef.current.forEach((block, index) => {
        if (!block) return;
        const counterEl = block.querySelector('.counter-val');
        if (counterEl) {
          const target = parseFloat(counterEl.getAttribute('data-target') || '0');
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2, delay: 0.6 + (index * 0.1), ease: 'power3.out',
            onUpdate: () => { counterEl.innerHTML = Math.floor(obj.val).toString(); }
          });
        }
      });
    } else {
      // Прячем экран
      gsap.to(containerRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
    }
  }, [isActive]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.wrapper}>
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-16">
          Benefits
        </h2>
        <div className={styles.grid}>
          {[
            { target: 60, suffix: '+', label: 'Building Types', color: 'text-cyan-400' },
            { target: 16, suffix: '+', label: 'Resource Types', color: 'text-purple-400' },
            { target: 70, suffix: '+ hrs', label: 'Average Playtime', color: 'text-green-400' },
            { target: 12, suffix: '+', label: 'Planet Types', color: 'text-rose-400' },
          ].map((stat, i) => (
            <div key={i} className={styles.statBlock} ref={(el) => { blocksRef.current[i] = el; }}>
              <div className={`text-5xl md:text-7xl font-black mb-4 ${stat.color}`}>
                <span className="counter-val" data-target={stat.target}>0</span>
                {stat.suffix}
              </div>
              <div className="text-white/60 text-sm tracking-[0.2em] uppercase font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
