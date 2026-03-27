import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, Wand2, Download, Play } from 'lucide-react';

export const ReelsGeneratorTab = () => {
  const [step, setStep] = useState<'upload' | 'editing' | 'result'>('upload');
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    setStep('editing');
    
    // Simulate AI editing process
    const actions = [
      'Анализируем исходник...',
      'Вырезаем тишину и запинки...',
      'Наращиваем динамику (склейка)...',
      'Генерируем цепляющие субтитры...',
      'Подбираем трендовый звук...',
      'Настраиваем цветокоррекцию...',
      'Создаем сочную обложку...',
      'Финальный рендер...'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      const actionIndex = Math.min(Math.floor(currentProgress / 12.5), actions.length - 1);
      setCurrentAction(actions[actionIndex]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep('result'), 500);
      }
    }, 150);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit', color: '#111827' }}>AI-Монтажер (Магия)</h2>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Ты отсняла сырое видео по нашему сценарию? Отлично! Загрузи его сюда, а наш ИИ сделает из него шедевр: вырежет паузы, наложит модные субтитры, подберет музыку и сделает красивую обложку.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* Step 1: Upload */}
        {step === 'upload' && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ 
              background: 'white', 
              border: '2px dashed #ec4899', 
              borderRadius: '24px', 
              padding: '4rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ background: '#fdf2f8', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <UploadCloud color="#db2777" size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'Outfit' }}>Загрузи сырое видео</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Тайминг до 3 минут. Формат MP4 или MOV.</p>
            <button className="btn-primary">
              Выбрать файл
            </button>
            <input 
              type="file" 
              accept="video/*" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) handleUpload();
              }}
            />
          </motion.div>
        )}

        {/* Step 2: Editing Process */}
        {step === 'editing' && (
          <motion.div 
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              background: 'white', 
              borderRadius: '24px', 
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
            }}
          >
            <Wand2 color="#8b5cf6" size={48} style={{ margin: '0 auto 1.5rem auto', animation: 'pulse 2s infinite' }} />
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>ИИ монтирует твой Reels...</h3>
            <p style={{ color: '#db2777', fontWeight: 600, fontSize: '1.2rem', marginBottom: '2rem' }}>{currentAction}</p>
            
            <div style={{ background: '#f3f4f6', height: '8px', borderRadius: '99px', overflow: 'hidden', maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', transition: 'width 0.2s linear' }} />
            </div>
            <p style={{ marginTop: '1rem', color: '#9ca3af', fontWeight: 600 }}>{progress}%</p>
          </motion.div>
        )}

        {/* Step 3: Result */}
        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'
            }}
          >
            {/* Videoplayer mock */}
            <div style={{ background: 'black', borderRadius: '24px', aspectRatio: '9/16', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=700&fit=crop" alt="Reel Result" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
               
               {/* Play Button Overlay */}
               <div style={{ zIndex: 10, background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <Play fill="white" color="white" size={32} style={{ marginLeft: '4px' }} />
               </div>

               {/* Fake subtitles */}
               <div style={{ position: 'absolute', bottom: '15%', left: '10%', right: '10%', textAlign: 'center', zIndex: 10 }}>
                 <span style={{ background: '#ec4899', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit', textTransform: 'uppercase' }}>
                   ПРИЧИНА ПОЧЕМУ
                 </span>
               </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #bbf7d0', marginBottom: '2rem' }}>
                <CheckCircle2 color="#16a34a" size={24} />
                <p style={{ color: '#166534', margin: 0, fontWeight: 500 }}>Монтаж успешно завершен! Мы вырезали 14 пауз и улучшили звук.</p>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>Готово к публикации</h3>
              <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Твое видео идеально оптимизировано под алгоритмы. Яркая обложка, динамичный монтаж и субтитры уже внутри.
              </p>

              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1.25rem' }}>
                <Download size={20} /> Скачать Reels (MP4)
              </button>
              
              <button onClick={() => setStep('upload')} style={{ marginTop: '1rem', padding: '1rem', background: 'transparent', border: '2px solid #e5e7eb', borderRadius: '99px', color: '#4b5563', fontWeight: 600, cursor: 'pointer' }}>
                Смонтировать еще одно
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </motion.div>
  );
};
