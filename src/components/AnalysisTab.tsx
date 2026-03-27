import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import type { UserProfile } from '../App';

const genericAIResults = {
  visuals: "Прослеживается ваш стиль, но есть над чем поработать. Фотографии сняты при разном свете, из-за чего лента кажется немного хаотичной. Выравнивание цветовой гаммы сделает профиль намного дороже.",
  colorType: "В профиле смешано несколько визуальных стилей. Мы рекомендуем закрепить 2-3 фирменных цвета (например, пастельные оттенки), чтобы эстетика страницы работала на ваш личный бренд."
};

const nicheRecommendations: Record<string, any> = {
  hair: {
    avatar: "Неплохо, но аватарку можно сделать более выразительной! Сейчас фон отвлекает. Так как вы стилист по волосам, рекомендуем показать вас в процессе работы (с феном) или использовать портрет с идеальной укладкой.",
    bio: "Описание понятное, однако его можно усилить. Рекомендуем добавить УТП вашей ниши: 'Сложные окрашивания и выход из черного без потери качества. Запись на декабрь открыта ⬇️'",
    reels: "Тематика рилсов хорошая, но чтобы они приносили клиентов, добавьте хуки! Рекомендуем: 'Процесс сложного окрашивания' или разрушение мифов '3 вещи из масс-маркета, которые убивают блонд'."
  },
  permanent: {
    avatar: "Неплохо, но аватарку можно сделать более выразительной! Сейчас фон отвлекает. Идеально подойдет крупный план лица с подчеркнуто идеальной работой, либо чистый макроснимок.",
    bio: "Описание понятно, однако его можно усилить. Попробуем так: 'Добавляю по 30 минут сна каждое утро. Пудровые брови и сочные губы. Прайс и запись по ссылке ⬇️'",
    reels: "Тематика рилсов отличная, но нужны цепляющие хуки. Например, покажите До/После на контрасте с текстом 'Как забыть про косметичку навсегда?' или ASMR процесса."
  },
  lashes: {
    avatar: "Неплохо, но аватарку можно сделать более выразительной! Сейчас фон отвлекает. Совет: Макро-снимок глаза с идеальными пучками (желательно ваш глаз) или вы в эстетичной униформе.",
    bio: "Описание понятно, однако его можно усилить. Попробуйте такой формат: 'Делаю взгляд на миллион без эффекта куклы. Архитектура + долговременная укладка. Запись ⬇️'",
    reels: "Тематика рилсов отличная, но зритель быстро свайпает. Попробуйте ракурс сверху: от 'лысого' века до лисьего взгляда с хуком: 'Всего 1 час и вы готовы собирать взгляды'."
  },
  nails: {
    avatar: "Неплохо, но аватарку можно сделать более выразительной! Сейчас фон отвлекает. Поставьте стильное фото своих рук с трендовым маникюром или портрет в эстетичном халате.",
    bio: "Описание понятно, однако его можно усилить. Как насчет: 'Пилю не только ногти, но и настроение. Гелевое укрепление 'Носибельность 4+ недели'. Запись ТУТ ⬇️'",
    reels: "Тематика отличная, но нужны сильные заголовки. Покажите макро-съемку покрытия под биты, или разговорный формат: 'Почему покрытие трескается на 3-й день?'"
  },
  default: {
    avatar: "Неплохо, но аватарку можно сделать более выразительной! Сейчас фон отвлекает от лица. Если использовать однотонный фон и хороший свет, это повысит доверие.",
    bio: "Описание емкое, однако его можно усилить. Попробуйте добавить уникальное торговое предложение (УТП) и ясный призыв к действию — укажите, как записаться.",
    reels: "Тематика рилсов отличная! Но чтобы зрители не пролистывали видео, добавьте яркие интригующие заголовки (хуки) прямо на обложки и в первые секунды видео."
  }
};

export const AnalysisTab = ({ userProfile }: { userProfile: UserProfile | null }) => {
  const [step, setStep] = useState<'form' | 'analyzing' | 'results'>('form');
  const [url, setUrl] = useState('');

  const nicheData = userProfile?.niche && nicheRecommendations[userProfile.niche] 
    ? nicheRecommendations[userProfile.niche] 
    : nicheRecommendations.default;

  const handleStartAnalysis = () => {
    if (!url) return;
    setStep('analyzing');
    
    // Имитация задержки загрузки
    setTimeout(() => {
      setStep('results');
    }, 3500);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Аудит твоего Instagram (Ремонт)</h2>
      
      <AnimatePresence mode="wait">
        
        {/* Шаг 1: Форма ввода (только ссылка) */}
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <p style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>
              Отлично, {userProfile?.name || 'мастер'}! Введи ссылку или просто свой никнейм (ник) в Instagram, и мы проверим твой профиль. <br/>
              <b>ИИ сделает честный и подробный аудит под нишу: {userProfile?.niche ? nicheRecommendations[userProfile.niche]?.avatar ? 'Твоя ниша распознана' : '' : ''}.</b>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: '#111827' }}>Ссылка на Instagram или никнейм</h4>
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

              <div style={{ marginTop: '0.5rem' }}>
                <button 
                  className="btn-primary" 
                  onClick={handleStartAnalysis} 
                  disabled={!url}
                  style={{ opacity: !url ? 0.5 : 1 }}
                >
                  <Sparkles size={18} /> Сделать объективный разбор
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* Шаг 2: Имитация анализа ИИ */}
        {step === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}
          >
            <div style={{ width: '56px', height: '56px', border: '4px solid #fdf2f8', borderTop: '4px solid #ec4899', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1.5rem', color: 'var(--text-heading)', fontWeight: 600, fontSize: '1.25rem' }}>ИИ сканирует твой профиль...</p>
            <p style={{ color: '#db2777', marginTop: '0.5rem' }}>Анализируем тебя в нише: {userProfile?.niche}</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </motion.div>
        )}

        {/* Шаг 3: Честные Результаты */}
        {step === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', background: '#fef2f2', padding: '1rem', borderRadius: '12px', border: '1px solid #fecaca' }}>
              <AlertTriangle color="#ef4444" size={24} />
              <p style={{ color: '#991b1b', fontSize: '0.95rem', margin: 0 }}>
                <strong>Честный аудит.</strong> Твой профиль выглядит неплохо, но есть несколько зон роста, которые помогут тебе привлекать больше клиентов прямо сейчас.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              
              <div className="result-card" style={{ borderLeftColor: '#ef4444', marginTop: 0 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ef4444" /> Аватарка</h4>
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{nicheData.avatar}</p>
              </div>
              
              <div className="result-card" style={{ borderLeftColor: '#ef4444', marginTop: 0 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ef4444" /> Шапка профиля и Био</h4>
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{nicheData.bio}</p>
              </div>

              <div className="result-card" style={{ gridColumn: '1 / -1', borderLeftColor: '#ef4444', marginTop: 0 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ef4444" /> Визуал и Reels</h4>
                <div style={{ background: '#fdf2f8', padding: '1.25rem', borderRadius: '12px', marginTop: '1rem' }}>
                  <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#db2777' }}>Общий визуал:</strong> <span style={{ color: '#374151' }}>{genericAIResults.visuals}</span></p>
                  <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#db2777' }}>Цветотип:</strong> <span style={{ color: '#374151' }}>{genericAIResults.colorType}</span></p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#db2777' }}>Оценка Рилсов:</strong> <span style={{ color: '#374151' }}>{nicheData.reels}</span></p>
                </div>
              </div>
            </div>

            <button onClick={() => setStep('form')} style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', cursor: 'pointer', background: 'transparent', border: '1px solid #111827', borderRadius: '99px', fontWeight: 600, fontFamily: 'Outfit' }}>
              Пройти анализ заново
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
