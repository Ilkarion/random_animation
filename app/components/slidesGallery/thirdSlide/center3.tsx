'use client';

export default function Center3() {
    return(
        // Обертка с relative, чтобы абсолютные кристаллы позиционировались относительно этой карточки
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* --- ДЕКОРАТИВНЫЕ КРИСТАЛЛЫ --- */}
            
            {/* Кристалл 1: Выглядывает сверху слева */}
            <div 
                style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '-30px',
                    width: '80px',
                    height: '50px',
                    zIndex: -1,
                    transform: 'rotate(180deg)',
                    filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))',
                    animation: 'floatCrystals 4s ease-in-out infinite'
                }}
            >
                <CrystalSVG />
            </div>

            {/* Кристалл 2: Большой скоп снизу справа */}
            <div 
                style={{
                    position: 'absolute',
                    bottom: '-50px',
                    right: '-40px',
                    width: '220px',
                    height: '140px',
                    zIndex: -1,
                    transform: 'rotate(55deg)',
                    filter: 'drop-shadow(0 0 20px rgba(2, 132, 199, 0.8))',
                    animation: 'floatCrystals 5s ease-in-out infinite reverse'
                }}
            >
                <CrystalSVG />
            </div>

            {/* Кристалл 3: Маленький осколок справа по центру */}
            <div 
                style={{
                    position: 'absolute',
                    top: '40%',
                    right: '-25px',
                    width: '50px',
                    height: '30px',
                    zIndex: -1,
                    transform: 'rotate(90deg)',
                    filter: 'drop-shadow(0 0 10px rgba(125, 211, 252, 0.5))',
                    animation: 'floatCrystals 3s ease-in-out infinite 1s'
                }}
            >
                <CrystalSVG />
            </div>

            {/* --- ОСНОВНАЯ КАРТОЧКА --- */}
            {/* Важно: z-index нужен, чтобы карточка гарантированно перекрывала кристаллы */}
            <div className="centerCardGalerry" style={{ position: 'relative', zIndex: 10 }}>
                <h2 className="h2Gallery">Developing</h2>
                <p className="p2Galerry">{`Gather resources, build new machines, explore new areas on your planet, 
                and upgrade your mech's abilities`}</p>
            </div>

            {/* Глобальные стили для анимации парения (можно перенести в ваш CSS файл) */}
            <style jsx>{`
                @keyframes floatCrystals {
                    0% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                    50% { transform: translateY(-10px) rotate(var(--rot, 0deg)); }
                    100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                }
            `}</style>
        </div>
    )
};

// SVG-компонент кристалла с красивыми гранями и градиентами (как руда в DSP)
function CrystalSVG() {
    return (
        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <defs>
                <linearGradient id="crystalGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />   {/* Светло-голубой */}
                    <stop offset="100%" stopColor="#0284c7" />  {/* Глубокий синий */}
                </linearGradient>
                <linearGradient id="crystalGradDark" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#075985" />  {/* Теневая сторона */}
                </linearGradient>
            </defs>
            
            {/* Задняя/основная форма кристалла */}
            <polygon points="50,5 90,45 50,115 10,45" fill="url(#crystalGradMain)" />
            
            {/* Теневая грань (правая сторона) для создания 3D-эффекта */}
            <polygon points="50,5 90,45 50,115 50,45" fill="url(#crystalGradDark)" opacity="0.85" />
            
            {/* Световой блик (левая верхняя грань) */}
            <polygon points="50,5 10,45 50,45" fill="#bae6fd" opacity="0.6" />
            
            {/* Центральное ребро (светлая линия) */}
            <polyline points="50,5 50,115" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.7" />
            <polyline points="10,45 90,45" stroke="#e0f2fe" strokeWidth="1" opacity="0.4" />
        </svg>
    )
}
