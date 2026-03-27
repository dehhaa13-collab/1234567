import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, AlertTriangle, CheckCircle2, Image as ImageIcon, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../App';

// Helpers for personalized variants
const getBioVariants = (name: string, niche: string) => {
  const userName = name || 'Мастер';
  switch (niche) {
    case 'hair':
      return [
        `${userName} | Твой мастер по волосам ✂️\nВывожу из черного без потери качества.\nЗапись на декабрь открыта ⬇️`,
        `Идеальный блонд от ${userName} ✨\nСпасаю волосы после домашних экспериментов.\nКонсультация и прайс по ссылке:`,
        `Стилист ${userName} | Сложные окрашивания\nДелаю укладки, которые держатся 3 дня.\nЖми на ссылку для записи ⬇️`
      ];
    case 'permanent':
      return [
        `${userName} | Естественный перманент 👄\nДарю +30 минут сна каждое утро.\nПудровые брови, которые не синеют ⬇️`,
        `Перманентный макияж от ${userName} ✨\nЗабудь про косметичку.\nЗапись на идеальные губы по ссылке:`,
        `Твой мастер ${userName} | Перманент\nБез боли. Без отеков. На 2 года.\nПосмотри мои работы и прайс ⬇️`
      ];
    case 'lashes':
      return [
        `${userName} | Взгляд на миллион 👁️\nБез эффекта куклы. Архитектура + укладка.\nСсылка на онлайн-запись ⬇️`,
        `Лешмейкер ${userName} ✨\nОт 'лысого' века до лисьего взгляда за час.\nНоска 6 недель. Прайс здесь:`,
        `Студия взгляда | Мастер ${userName} 🖤\nИдеальные пучки, которые не колятся.\nЗапишись ко мне на реснички ⬇️`
      ];
    case 'nails':
      return [
        `${userName} | Пилю настроение 💅\nГелевое укрепление. Носка 4+ недели.\nВыбери удобное окно по ссылке ⬇️`,
        `Твой нейл-мастер ${userName} ✨\nТонко, крепко и без отслоек.\nФренч, градиент, стемпинг. Запись тут:`,
        `Маникюр с любовью от ${userName} 🤍\nСтерильно на 100%. Чай, кофе и сериалы.\nОнлайн-запись ⬇️`
      ];
    default:
      return [
        `${userName} | Бьюти эксперт ✨\nДелаю вас красивее и увереннее.\nЗапись по ссылке ⬇️`,
        `Твой мастер ${userName} 🤍\nИндивидуальный подход к каждому.\nПрайс и онлайн-запись тут:`,
        `Beauty Room | ${userName}\nКачество, стерильность и уют.\nЖми на ссылку для записи ⬇️`
      ];
  }
};

export const AnalysisTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const [step, setStep] = useState<'form' | 'analyzing' | 'results'>('form');
  const [url, setUrl] = useState('');
  const [selectedBio, setSelectedBio] = useState<number>(0);

  const bioVariants = getBioVariants(userProfile?.name || '', userProfile?.niche || '');

  const handleStartAnalysis = () => {
    if (!url) return;
    setStep('analyzing');
    setTimeout(() => {
      setStep('results');
    }, 3500);
  };

  return (
    <div style={{ position: 'relative' }}>
      
      <AnimatePresence mode="wait">
        
        {/* Шаг 1: Форма */}
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Аудит твоего Instagram</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>
              Отлично, {userProfile?.name || 'мастер'}! Введи ссылку или никнейм. ИИ проанализирует профиль с учетом твоей ниши ({userProfile?.niche}) и твоей главной боли ({userProfile?.problem}).
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                  <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="@tvoi_nik или ссылка" 
                    style={{ paddingLeft: '3rem' }}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button className="btn-primary" onClick={handleStartAnalysis} disabled={!url} style={{ opacity: !url ? 0.5 : 1 }}>
                  <Sparkles size={18} /> Начать детальный разбор
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Шаг 2: Загрузка */}
        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '56px', height: '56px', border: '4px solid #fdf2f8', borderTop: '4px solid #ec4899', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1.5rem', color: 'var(--text-heading)', fontWeight: 600, fontSize: '1.25rem' }}>Смотрим глазами твоего клиента...</p>
            <p style={{ color: '#db2777', marginTop: '0.5rem' }}>Анализируем УТП, аватарку и визуал.</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </motion.div>
        )}

        {/* Шаг 3: Развернутые результаты и визуал */}
        {step === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '0.5rem' }}>
            
            {/* Блок: Диагноз проблемы */}
            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '16px', border: '1px solid #fecaca', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <AlertTriangle color="#ef4444" size={24} />
                <h3 style={{ margin: 0, color: '#991b1b', fontSize: '1.25rem' }}>Почему у тебя {userProfile?.problem.toLowerCase() || 'мало клиентов'}?</h3>
              </div>
              <p style={{ color: '#7f1d1d', lineHeight: 1.6, margin: 0 }}>
                Твой профиль — это твоя визитка. Сейчас клиенты заходят на страницу и не сразу понимают, почему стоит выбрать именно тебя. Фон на аватарке сливается, а в шапке профиля не хватает сильного предложения (УТП), которое зацепит их с первой секунды. <br/><br/>
                <strong>Но не переживай, мы здесь именно для этого! Ниже мы покажем, как легко и красиво это исправить.</strong>
              </p>
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Твой профиль 2.0 (Выбери шапку)</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>Мы создали 3 мощных варианта специально для тебя. Кликни на тот, который нравится больше, и посмотри, как он будет выглядеть в Instagram.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '3rem' }}>
              {bioVariants.map((bio, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedBio(index)}
                  style={{
                    background: selectedBio === index ? '#fdf2f8' : 'white',
                    border: selectedBio === index ? '2px solid #ec4899' : '2px solid #e5e7eb',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {selectedBio === index && <CheckCircle2 size={24} color="#ec4899" style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />}
                  <pre style={{ margin: 0, fontFamily: 'Inter, sans-serif', color: '#111827', fontWeight: 500, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{bio}</pre>
                </button>
              ))}
            </div>

            {/* Блок: Визуализация Instagram */}
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Визуализация результата ✨</h2>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #111827, #374151, #000)', 
              padding: '3rem 1rem', 
              borderRadius: '24px', 
              display: 'flex', 
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative premium elements */}
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: '#ec4899', filter: 'blur(100px)', opacity: 0.3, borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: '#8b5cf6', filter: 'blur(100px)', opacity: 0.3, borderRadius: '50%' }} />
              
              {/* Instagram Mobile Mockup */}
              <div style={{ 
                background: 'white', 
                width: '100%', 
                maxWidth: '360px', 
                borderRadius: '32px',
                padding: '1.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontWeight: 600 }}>
                  <span>{url.replace('https://instagram.com/', '').replace('@', '') || 'tvoi_nik'}</span>
                  <span>•••</span>
                </div>
                
                {/* Profile Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', padding: '3px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'url(https://images.unsplash.com/photo-1616091093714-c64882e9ab55?w=200&h=200&fit=crop) center/cover', border: '3px solid white' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1.25rem', textAlign: 'center' }}>
                    <div><strong style={{ display: 'block' }}>120</strong><span style={{ fontSize: '0.8rem', color: '#666' }}>Post</span></div>
                    <div><strong style={{ display: 'block' }}>4.5k</strong><span style={{ fontSize: '0.8rem', color: '#666' }}>Follow</span></div>
                    <div><strong style={{ display: 'block' }}>350</strong><span style={{ fontSize: '0.8rem', color: '#666' }}>Follow</span></div>
                  </div>
                </div>

                {/* Bio text directly injected from state */}
                <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <pre style={{ margin: 0, fontFamily: 'inherit', color: '#111827', whiteSpace: 'pre-wrap' }}>
                    {bioVariants[selectedBio]}
                  </pre>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ aspectRatio: '1', background: '#f3f4f6', position: 'relative' }}>
                       {i === 0 && <ImagePlaceholder color="#ec4899" />}
                       {i === 1 && <ImagePlaceholder color="#8b5cf6" />}
                       {i === 4 && <ImagePlaceholder color="#ec4899" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Блок: Глубокий анализ визуала и ленты */}
            <div style={{ marginTop: '4rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', background: '#fdf2f8', borderRadius: '16px' }}><Search color="#ec4899" size={28} /></div>
                <h2 style={{ fontSize: '1.75rem', margin: 0, fontFamily: 'Outfit' }}>Глубокий анализ ленты</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }} />
                    Цветотип и Эстетика
                  </h4>
                  <p style={{ color: '#4b5563', lineHeight: 1.6 }}>Сейчас в профиле смешано несколько стилей. Фотографии сняты при разном свете. <br/><br/><strong>Решение:</strong> Закрепи 2 фирменных цвета (например, пастельный беж и пыльная роза). Делай фото при естественном свете у окна. Дорого = минимализм.</p>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                    Актуальные (Highlights)
                  </h4>
                  <p style={{ color: '#4b5563', lineHeight: 1.6 }}>Много лишнего или пустые обложки. Клиент не находит нужное.<br/><br/><strong>Решение:</strong> Оставь 4 закрепленных истории с красивыми обложками-иконками: <br/>1. Отзывы<br/>2. Прайс<br/>3. До/После<br/>4. Обучение/Обо мне.</p>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', gridColumn: '1 / -1' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6' }} />
                    Анализ Reels
                  </h4>
                  <p style={{ color: '#4b5563', lineHeight: 1.6 }}>Тематика видео отличная, вы показываете крутые процессы! Но чтобы зрители не пролистывали видео, добавьте яркие интригующие заголовки (хуки) прямо на обложки. Динамичный монтаж (смена кадров каждые 3 секунды) удержит внимание. Загляни во вкладку «Контент-план», мы подготовили 10 готовых сценариев для {userProfile?.niche || 'тебя'}!</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setStep('form')} style={{ flex: 1, padding: '1rem 2rem', cursor: 'pointer', background: 'transparent', border: '1px solid #111827', borderRadius: '99px', fontWeight: 600, fontFamily: 'Outfit', textAlign: 'center' }}>
                Попробовать другой ник
              </button>
              
              <button 
                onClick={onNext} 
                className="btn-primary" 
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                Перейти к Этапу 2 (Сценарии) <ChevronRight size={20} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper for fake grid
const ImagePlaceholder = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}>
    <ImageIcon color={color} size={24} />
  </div>
);
