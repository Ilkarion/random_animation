'use client'; // Обязательно для использования хуков в Next.js App Router

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from "next/image";
import "./sides2.css";

import rocketImg from "@/public/imgs/rocket.png";
import startPlanet from "@/public/imgs/startPlanet.png";

// 1. Добавляем isActive в пропсы
export default function Sides2({ side, isActive }: { side: string, isActive: boolean }) {
    // 2. Создаем ссылку на DOM-элемент для GSAP
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        if (isActive) {
            // КОГДА СЛАЙД АКТИВЕН: Выезжаем из-за левого или правого края
            gsap.fromTo(el,
                { 
                    x: side === "left" ? "-100vw" : "100vw", // Прячем за пределами экрана по оси X
                    opacity: 0 
                },
                { 
                    x: 0, // Возвращаем на исходную позицию
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    delay: 0.2 // Небольшая задержка, чтобы центральная спираль успела прокрутиться
                }
            );
        } else {
            // КОГДА СЛАЙД НЕАКТИВЕН: Уезжаем обратно за экран
            gsap.to(el, {
                x: side === "left" ? "-100vw" : "100vw",
                opacity: 0,
                duration: 0.6,
                ease: "power2.in"
            });
        }
    }, [isActive, side]); // Хук перезапустится каждый раз, когда меняется isActive

    return(
        // 3. Вешаем ref на корневой div
        <div ref={containerRef} className={side === "left" ? "leftImg2" : "rightImg2"}>
            <Image src={side === "left" ? rocketImg : startPlanet} alt="Side Content"/>
        </div>
    );
};
