'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import HelixGallery from './components/HelixGalery/HelixGallery';
import StatsScreen from './components/StatsScreen/StatsScreen';
import PlanetCarousel from './components/PanelCarousel/PlanetCarousel';
import { HelixCardData, CarouselItemData } from './types/types'

import "./page.css"

import Center1 from './components/slidesGallery/firstSlide/center/center';
import Sides1 from './components/slidesGallery/firstSlide/sides';

import Center2 from './components/slidesGallery/secodSlide/center/center';
import Sides2 from './components/slidesGallery/secodSlide/sides2';
import Center3 from './components/slidesGallery/thirdSlide/center3';
import Sides3 from './components/slidesGallery/thirdSlide/sides3';
import Center4 from './components/slidesGallery/fourthSlide/center4';
import Sides4 from './components/slidesGallery/fourthSlide/sides4';
import Center5 from './components/slidesGallery/fifthSlide/center5';

export default function App() {
  const [appState, setAppState] = useState<'HELIX' | 'STATS' | 'PLANETS'>('HELIX');
  const [helixIndex, setHelixIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  const [isMounted, setIsMounted] = useState(false);
  const isLocked = useRef(false);
  
  // 1. Ссылка на главный контейнер, чтобы анимировать его проявление
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  // 2. Монтируем с небольшой задержкой (50мс). 
  // Это решает ошибку линтера и дает браузеру долю секунды на парсинг CSS.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // 3. Как только isMounted стал true и элементы отрендерились (невидимыми),
  // заставляем GSAP плавно их проявить.
  useEffect(() => {
    if (isMounted && mainWrapperRef.current) {
      gsap.to(mainWrapperRef.current, { 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.3 // Даем GSAP внутри компонентов расставить элементы по местам
      });
    }
  }, [isMounted]);

  const myCards: HelixCardData[] = [
    {
      id: 'phase-1',
      bgColor: 'transparent',
      leftContent: <Sides1 side="left" isActive={helixIndex === 0}/>,
      rightContent: <Sides1 side="right" isActive={helixIndex === 0}/>,
      centerContent: <Center1 />
    },
    {
      id: 'phase-2',
      bgColor: 'transparent',
      leftContent: <Sides2 side="left" isActive={helixIndex === 1}/>,
      rightContent: <Sides2 side="right" isActive={helixIndex === 1}/>,
      centerContent: <Center2 />
    },
    {
      id: 'phase-3',
      bgColor: 'transparent',
      leftContent: <Sides3 side="left" isActive={helixIndex === 2}/>,
      rightContent: <Sides3 side="right" isActive={helixIndex === 2}/>,
      centerContent: <Center3 />
    },
    {
      id: 'phase-4',
      bgColor: 'transparent',
      leftContent: <Sides4 side="left" isActive={helixIndex === 3}/>,
      rightContent: <Sides4 side="right" isActive={helixIndex === 3}/>,
      centerContent: <Center4 />
    },
    {
      id: 'phase-5',
      bgColor: '#3b230056',
      leftContent: <div></div>,
      rightContent: <div></div>,
      centerContent: <Center5  side="left" isActive={helixIndex === 4}/>
    },
  ];

  const myCarouselItems: CarouselItemData[] = [
    {
      id: 'p1', title: 'LAVA WORLD', description: 'Экстремальные температуры. Богат титаном.',
      bgColor: '#1a0505', textColor: '#fca5a5',
      visualContent: <div></div>
    },
    {
      id: 'p2', title: 'CYBER CORE', description: 'Искусственная структура. Центр обработки данных.',
      bgColor: '#020617', textColor: '#4ade80',
      visualContent: <div></div>
    },
    {
      id: 'p3', title: 'OCEANIC', description: 'Глобальный океан. Идеально для добычи дейтерия.',
      bgColor: '#03111c', textColor: '#7dd3fc',
      visualContent: <div></div>
    }
  ];

  useEffect(() => {
    let color = '#030712';
    if (appState === 'HELIX') color = myCards[helixIndex]?.bgColor || '#030712';
    if (appState === 'STATS') color = '#020617';
    if (appState === 'PLANETS') color = myCarouselItems[carouselIndex]?.bgColor || '#020617';
    
    gsap.to('.app-background', { backgroundColor: color, duration: 0.8 });
  }, [appState, helixIndex, carouselIndex]);

  useEffect(() => {
    const handleScroll = (direction: number) => {
      if (isLocked.current) return;

      if (appState === 'HELIX') {
        const nextIndex = helixIndex + direction;
        if (nextIndex >= myCards.length) {
          isLocked.current = true; setAppState('STATS'); setTimeout(() => { isLocked.current = false; }, 1200);
        } else if (nextIndex >= 0) {
          isLocked.current = true; setHelixIndex(nextIndex); setTimeout(() => { isLocked.current = false; }, 800);
        }
      } 
      else if (appState === 'STATS') {
        isLocked.current = true;
        setAppState(direction > 0 ? 'PLANETS' : 'HELIX');
        setTimeout(() => { isLocked.current = false; }, 1200);
      }
      else if (appState === 'PLANETS') {
        const nextIndex = carouselIndex + direction;
        if (nextIndex < 0) {
          isLocked.current = true; setAppState('STATS'); setTimeout(() => { isLocked.current = false; }, 1200);
        } else if (nextIndex < myCarouselItems.length) {
          isLocked.current = true; setCarouselIndex(nextIndex); setTimeout(() => { isLocked.current = false; }, 800);
        }
      }
    };

    let deltaY = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      deltaY += e.deltaY;
      if (Math.abs(deltaY) > 50) { handleScroll(deltaY > 0 ? 1 : -1); deltaY = 0; }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [appState, helixIndex, carouselIndex, myCards.length, myCarouselItems.length]);

  if (!isMounted) {
    return <main className="fixed inset-0 w-full h-full bg-[#030712]"></main>;
  }

  return (
    <main className="app-background fixed inset-0 w-full h-full text-slate-200 overflow-hidden bg-[#030712] font-sans">
      <h1 className='titleMain'>Dyson Sphere Program</h1>
      
      {/* 4. ЖЕЛЕЗОБЕТОННАЯ ЗАЩИТА ОТ FOUC: инлайн-стиль opacity: 0. */}
      {/* Он срабатывает до любых CSS-файлов. Контент отрендерится полностью невидимым, пока GSAP не скажет иначе. */}
      <div ref={mainWrapperRef} className="w-full h-full" style={{ opacity: 0 }}>
        <HelixGallery cards={myCards} currentIndex={helixIndex} isActive={appState === 'HELIX'} />
        <StatsScreen isActive={appState === 'STATS'} />
        <PlanetCarousel items={myCarouselItems} currentIndex={carouselIndex} isActive={appState === 'PLANETS'} />
      </div>
    </main>
  );
}
