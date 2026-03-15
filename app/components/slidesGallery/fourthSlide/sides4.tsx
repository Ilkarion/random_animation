'use client'; 

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from "next/image";
import "./styles/sides.css";

import warpImg from "@/public/imgs/warp.png";
import dsFlyImg from "@/public/imgs/dsFly.png";
import planetImg from "@/public/imgs/planet2.png";
import firstPlanet4Img from "@/public/imgs/firstplanet4.png";

export default function Sides4({ side, isActive }: { side: string, isActive: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Выбираем картинки внутри для добавления эффекта "сборки" после выхода из варпа
        const images = el.querySelectorAll('img');

        if (isActive) {
            // --- ВХОД: ВЫХОД ИЗ ВАРПА (Drop out of warp) ---
            
            // 1. Анимация самого контейнера (резкое торможение)
            gsap.fromTo(el,
                { 
                    x: side === "left" ? "-150vw" : "150vw", // Начинаем далеко за экраном
                    scaleX: 4, // Сильно растянуто по горизонтали (эффект скорости света)
                    scaleY: 0.1, // Сплюснуто по вертикали
                    opacity: 0,
                    filter: "blur(20px)" // Размытие в движении
                },
                { 
                    x: 0, 
                    scaleX: 1, // Возвращаем нормальные пропорции
                    scaleY: 1,
                    opacity: 1, 
                    filter: "blur(0px)",
                    duration: 1.2, 
                    ease: "expo.out", // Очень резкое замедление (характерно для sci-fi прыжков)
                    delay: 0.2
                }
            );

            // 2. Внутренние картинки слегка "догоняют" контейнер по инерции
            gsap.fromTo(images,
                { x: side === "left" ? -100 : 100, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 1, 
                    stagger: 0.15, // Появляются по очереди
                    ease: "back.out(1.5)", // Легкая отдача при остановке
                    delay: 0.5 
                }
            );

        } else {
            // --- ВЫХОД: УХОД В ВАРП (Jump to warp) ---
            
            // Сначала картинки "смазываются" перед прыжком
            gsap.to(images, {
                x: side === "left" ? -50 : 50,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in"
            });

            // Затем сам контейнер резко растягивается и улетает в гиперпространство
            gsap.to(el, {
                x: side === "left" ? "-150vw" : "150vw",
                scaleX: 5, // Растягиваем в струну
                scaleY: 0.05, // Максимально сплющиваем
                opacity: 0,
                filter: "blur(30px)", // Сильное размытие
                duration: 0.7,
                ease: "expo.in", // Резкое ускорение в конце
                delay: 0.2 // Ждем пока картинки начнут исчезать
            });
        }
    }, [isActive, side]);

    return(
        <div ref={containerRef} className={side === "left" ? "leftImg4" : "rightImg4"}>
            {/* Обертки для картинок (стили перенесены в CSS) */}
            <div>
                <Image 
                    src={side === "left" ? warpImg : dsFlyImg } 
                    alt="Warp Travel" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </div>
            <div>
                <Image 
                    src={side === "left" ? planetImg : firstPlanet4Img } 
                    alt="Distant Planet" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </div>
        </div>
    );
};
