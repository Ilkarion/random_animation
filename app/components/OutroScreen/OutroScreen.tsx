"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./OutroScreen.css";

interface OutroScreenProps {
  isActive: boolean;
}

export default function OutroScreen({ isActive }: OutroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Рефы для текста
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  // Рефы для падающих звезд
  const ss1Ref = useRef<HTMLDivElement>(null);
  const ss2Ref = useRef<HTMLDivElement>(null);
  const ss3Ref = useRef<HTMLDivElement>(null);

  // Рефы для вспышек
  const fb1Ref = useRef<HTMLDivElement>(null);
  const fb2Ref = useRef<HTMLDivElement>(null);
  const fb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isActive) {
      // Показываем контейнер
      gsap.to(containerRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.6 });

      const tl = gsap.timeline();

      // Сбрасываем позиции перед анимацией
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 30 });
      gsap.set([ss1Ref.current, ss2Ref.current, ss3Ref.current], { opacity: 0, y: -200, scale: 1 });
      gsap.set([fb1Ref.current, fb2Ref.current, fb3Ref.current], { opacity: 0, scale: 0 });

      // --- Вспышка 1 и Текст 1 ---
      tl.to(ss1Ref.current, { opacity: 1, y: 300, x: 50, duration: 0.5, ease: "power1.in" }, "+=0.5")
        .to(ss1Ref.current, { opacity: 0, duration: 0.1 })
        .to(fb1Ref.current, { opacity: 0.8, scale: 2, duration: 0.1 }, "-=0.1")
        .to(fb1Ref.current, { opacity: 0, duration: 0.8 })
        .to(text1Ref.current, { opacity: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.7");

      // --- Вспышка 2 и Текст 2 ---
      tl.to(ss2Ref.current, { opacity: 1, y: 400, x: -80, duration: 0.5, ease: "power1.in" }, "+=0.6")
        .to(ss2Ref.current, { opacity: 0, duration: 0.1 })
        .to(fb2Ref.current, { opacity: 0.8, scale: 2.5, duration: 0.1 }, "-=0.1")
        .to(fb2Ref.current, { opacity: 0, duration: 0.8 })
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.7");

      // --- Вспышка 3 и Текст 3 ---
      tl.to(ss3Ref.current, { opacity: 1, y: 500, x: 30, duration: 0.5, ease: "power1.in" }, "+=0.6")
        .to(ss3Ref.current, { opacity: 0, duration: 0.1 })
        .to(fb3Ref.current, { opacity: 1, scale: 3, duration: 0.1 }, "-=0.1")
        .to(fb3Ref.current, { opacity: 0, duration: 1 })
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.9");

    } else {
      // Скрываем контейнер
      gsap.to(containerRef.current, { opacity: 0, pointerEvents: "none", duration: 0.6 });
    }
  }, [isActive]);

  // Генерация быстрых фоновых звезд
  const renderAmbientStars = () => {
    return Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="ambient-star"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * -50}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      />
    ));
  };

  return (
    <div ref={containerRef} className="outro-container">
      {/* 1. Фоновые падающие звезды */}
      <div className="ambient-stars-layer">{renderAmbientStars()}</div>

      {/* 2. Анимированные летящие туманности/объекты */}
      <div className="nebula-orb orb-1"></div>
      <div className="nebula-orb orb-2"></div>
      <div className="nebula-orb orb-3"></div>

      {/* 3. Текст */}
      <div className="outro-content relative z-10 flex flex-col gap-8 md:gap-12 max-w-4xl text-center px-6">
        <p ref={text1Ref} className="outro-text outro-text-1 text-lg md:text-3xl font-light text-cyan-100 drop-shadow-[0_0_10px_rgba(207,250,254,0.5)]">
          This showcase was made to demonstrate proficiency with the GSAP library and to share a bit about my favorite game, <strong className="text-cyan-400 font-bold">Dyson Sphere Program</strong>.
        </p>
        <p ref={text2Ref} className="outro-text outro-text-2 text-md md:text-2xl font-light text-purple-200 drop-shadow-[0_0_10px_rgba(233,213,255,0.5)]">
          Sorry for the poor quality images, this was the best I could find and edit.
        </p>
        <div ref={text3Ref} className="outro-text outro-text-3 text-xl md:text-4xl font-medium text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mt-4">
          Thank you for your attention.<br />
          <span className="text-rose-400 text-base md:text-2xl mt-4 block tracking-widest uppercase">Author: Ilkarion</span>
        </div>
      </div>

      {/* 4. Спецэффекты (Сюжетные звезды и вспышки) */}
      <div className="outro-effects-layer absolute inset-0 pointer-events-none">
        <div ref={ss1Ref} className="shooting-star"></div>
        <div ref={fb1Ref} className="flash-bang fb-center"></div>

        <div ref={ss2Ref} className="shooting-star ss-left"></div>
        <div ref={fb2Ref} className="flash-bang fb-left"></div>

        <div ref={ss3Ref} className="shooting-star ss-right"></div>
        <div ref={fb3Ref} className="flash-bang fb-right"></div>
      </div>
    </div>
  );
}
