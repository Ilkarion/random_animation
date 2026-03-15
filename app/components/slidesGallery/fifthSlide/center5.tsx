'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import "./styles/center5.css";

export default function Sides5({ side, isActive }: { side: string, isActive: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [charCount, setCharCount] = useState(0);

    // Параметры для орбит
    const orbits = [
        { size: 360, rx: 60, ry: -30, duration: '120s', nodes: 20 },
        { size: 440, rx: 80, ry: -80, duration: '100s', nodes: 12 }
    ];

    // Текст разбитый на куски для эффекта печати и подсветки нужных слов
    const textChunks = [
        { text: "I hope, in the future we can travel and explore ", highlight: false },
        { text: "beautiful space", highlight: true },
        { text: " like in ", highlight: false },
        { text: "DSP", highlight: true },
        { text: " or even in a more interesting way.", highlight: false }
    ];

    // Считаем общее количество символов
    const totalChars = textChunks.reduce((acc, chunk) => acc + chunk.text.length, 0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let interval: NodeJS.Timeout;
        let startTimeout: NodeJS.Timeout;
        let resetTimeout: NodeJS.Timeout;

        if (isActive) {
            // 1. Выезд слайда
            gsap.fromTo(el,
                { x: side === "left" ? "-100vw" : "100vw", opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            // 2. Эффект печатания текста
            // Сбрасываем счетчик асинхронно, чтобы избежать конфликтов с рендером (решает ошибку ESLint)
            resetTimeout = setTimeout(() => setCharCount(0), 0);

            startTimeout = setTimeout(() => {
                interval = setInterval(() => {
                    setCharCount(prev => {
                        if (prev >= totalChars) {
                            clearInterval(interval);
                            return prev;
                        }
                        return prev + 1; // Скорость появления: +1 символ
                    });
                }, 40); // Каждые 40мс печатается символ
            }, 1000); // Начинаем печатать через секунду (когда слайд уже выехал)

        } else {
            // 3. Скрываем слайд
            gsap.to(el, { x: side === "left" ? "-100vw" : "100vw", opacity: 0, duration: 0.6, ease: "power2.in" });
            
            // Сбрасываем текст только ПОСЛЕ того, как слайд уехал (600мс), 
            // чтобы текст не исчезал резко на глазах у пользователя
            resetTimeout = setTimeout(() => setCharCount(0), 600);
        }

        // Очищаем таймеры, если компонент размонтируется или перезапускается эффект
        return () => {
            clearInterval(interval);
            clearTimeout(startTimeout);
            clearTimeout(resetTimeout);
        };
    }, [isActive, side, totalChars]);


    // Функция отрисовки текста в зависимости от текущего количества напечатанных символов (charCount)
    let remaining = charCount;
    const typedElements = textChunks.map((chunk, i) => {
        if (remaining <= 0) return null; // Этот кусок еще не печатаем
        const toShow = chunk.text.slice(0, remaining);
        remaining -= chunk.text.length;
        
        if (chunk.highlight) {
            // Подсвеченные слова
            return <span key={i} className="warp-text">{toShow}</span>;
        }
        // Обычные слова
        return <span key={i}>{toShow}</span>;
    });

    return(
        <div ref={containerRef} className="sides-wrapper" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', zIndex: 10 }}>
            
            {/* 1. Сфера Дайсона (смещена влево) */}
            <div style={{ position: 'absolute', left: '20%', top: '50%' }}>
                <div className="dyson-scene">
                    <div className="star-core"></div>
                    <div className="star-glow"></div>

                    <div className="inner-sphere">
                        <div className="ring-horizontal" style={{ transform: 'rotateX(90deg) translateZ(0px) scale(1)' }}></div>
                        <div className="ring-horizontal" style={{ transform: 'rotateX(90deg) translateZ(-35px) scale(0.86)' }}></div>
                        <div className="ring-horizontal" style={{ transform: 'rotateX(90deg) translateZ(-60px) scale(0.6)' }}></div>
                        
                        <div className="ring-vertical" style={{ transform: 'rotateY(0deg)' }}></div>
                        <div className="ring-vertical" style={{ transform: 'rotateY(60deg)' }}></div>
                        <div className="ring-vertical" style={{ transform: 'rotateY(120deg)' }}></div>
                    </div>

                    {orbits.map((orbit, i) => (
                        <div key={i} className="orbit-container" style={{ 
                            width: orbit.size, 
                            height: orbit.size, 
                            transform: `translate(-50%, -50%) rotateX(${orbit.rx}deg) rotateY(${orbit.ry}deg)` 
                        }}>
                            <div className="orbit-track" style={{ animationDuration: orbit.duration }}>
                                {Array.from({ length: orbit.nodes }).map((_, j) => {
                                    const angle = (360 / orbit.nodes) * j;
                                    return (
                                        <div key={j} className="node-wrapper" style={{ transform: `rotate(${angle}deg) translateX(${orbit.size / 2}px)` }}>
                                            <div className="dyson-node"></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Текстовый блок (выровнен по правому краю, "вместо картинок") */}
            <div className='animatedText'>
                <p className='p2Galerry' style={{ fontSize: '1rem', lineHeight: '1.6', color: '#fff', minHeight: '150px' }}>
                    {typedElements}
                    {/* Мигающий курсор */}
                    <span className="cursor-blink" style={{ display: isActive && charCount < totalChars ? 'inline-block' : 'none' }}>|</span>
                </p>
            </div>


        </div>
    );
};
