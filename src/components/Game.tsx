import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Timer, Trophy, Play } from 'lucide-react';

interface GameProps {
  onScoreUpdate: (score: number) => void;
}

export const Game: React.FC<GameProps> = ({ onScoreUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

  const [explosions, setExplosions] = useState<{ id: number, x: number, y: number, particles: { id: number, dx: number, dy: number, emoji: string }[] }[]>([]);
  const gameZoneRef = useRef<HTMLDivElement>(null);

  // Таймер логика
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Движение цели
  const moveTarget = () => {
    if (!gameZoneRef.current) return;
    const { clientWidth, clientHeight } = gameZoneRef.current;
    
    // Оставляем небольшие отступы, чтобы цель не выходила за края (размер цели 60px)
    const padding = 60; 
    const maxX = clientWidth - padding;
    const maxY = clientHeight - padding;

    // Генерируем случайную позицию
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    setTargetPosition({ x: randomX, y: randomY });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    onScoreUpdate(0);
    moveTarget();
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    
    // Эффект попадания (взрыв)
    const newExplosionId = Date.now();
    const emojis = ['💥', '✨', '⚡️', '🔥', '💨', '🎉', '🤯'];
    const particles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
      const distance = 80 + Math.random() * 60;
      return {
        id: i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      }
    });

    setExplosions(prev => [...prev, { id: newExplosionId, x: targetPosition.x, y: targetPosition.y, particles }]);

    // Удаляем взрыв через 1 секунду
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== newExplosionId));
    }, 1000);

    const newScore = score + 10;
    setScore(newScore);
    onScoreUpdate(newScore);
    moveTarget();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* HUD: Головной дисплей */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontFamily: 'Outfit' }}>
          <Timer color="#ec4899" size={24} />
          <span>{timeLeft} с</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontFamily: 'Outfit' }}>
          <Trophy color="#8b5cf6" size={24} />
          <span>{score}</span>
        </div>
      </div>

      {/* Игровая зона (Game Zone) */}
      <div className="game-zone" ref={gameZoneRef} onClick={() => {}}>
        <AnimatePresence>
          {!isPlaying && timeLeft === 30 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10 }}
            >
              <button className="btn-primary" onClick={startGame} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={20} fill="currentColor"/> Начать игру
              </button>
            </motion.div>
          )}

          {!isPlaying && timeLeft === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 10 }}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>Время вышло!</h3>
              <p style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#cbd5e1' }}>Ваш счет: <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{score}</span></p>
              <button className="btn-primary" onClick={startGame}>Играть снова</button>
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <motion.div
            className="target-orb"
            initial={{ scale: 0 }}
            animate={{ 
              x: targetPosition.x - 30, // Смещение на радиус цели (размер 60x60)
              y: targetPosition.y - 30,
              scale: 1 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
            onClick={handleTargetClick}
            style={{ width: '60px', height: '60px', zIndex: 15 }}
          >
            <Zap size={28} color="#000" style={{ opacity: 0.8 }} />
          </motion.div>
        )}

        {/* Анимации Взрывов */}
        {explosions.map(exp => (
          <div key={exp.id} style={{ position: 'absolute', pointerEvents: 'none', left: exp.x - 12, top: exp.y - 12, zIndex: 20 }}>
            {exp.particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                animate={{ x: p.dx, y: p.dy, scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ position: 'absolute', fontSize: '24px' }}
              >
                {p.emoji}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
