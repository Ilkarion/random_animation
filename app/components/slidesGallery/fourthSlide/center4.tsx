'use client';
import { useEffect, useState } from 'react';
import "./styles/center.css"

export default function Center4() {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: string; duration: string }[]>(genereteStars());
      
        function genereteStars() {
          const generatedStars = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100 + '%',
            left: (Math.random() * 150 - 50) + '%', // Начинаем чуть левеми пределами видимости
            delay: Math.random() * 3 + 's',
            duration: Math.random() * 2 + 1 + 's' // Длительность полета от 1 до 3 секунд
          }));
          return generatedStars
        }
    // Генерируем массив звезд только на клиенте (защита от ошибки гидратации Next.js)
    useEffect(() => {
    }, []);

    return(
        <div className='centerCardGalerry' style={{ position: 'relative', overflow: 'hidden' }}>
            
            {/* Контейнер для Звездного дождя */}
            <div className="starsContainer">
                {stars.map((star) => (
                    <div key={star.id} className="star-line" style={{
                        top: star.top,
                        left: star.left,
                        animationDelay: star.delay,
                        animationDuration: star.duration
                    }}></div>
                ))}
            </div>

            <h2 className='h2Gallery' >Travel to others systems</h2>
            <p className='p2Galerry' >
                {`Once you reach a certain level of development, you’ll be able to travel to other star systems and harvest resources there.`}
                <br/><br/>
                {`Because the distances are so large, you’ll need to `}
                <span className="warp-text">warp</span>.
            </p>
        </div>
    )
};
