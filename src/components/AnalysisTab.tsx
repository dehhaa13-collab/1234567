import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';

const aiResults = {
  avatar: "Очень слабо. Лицо не рассмотреть, задний фон отвлекает. Как клиент должен довериться вашей экспертности, если вы прячетесь за мыльной фотографией?",
  bio: "Сплошная вода. Фразы 'Красота спасет мир' и 'Делаю с любовью' больше не продают. Нет уникального торгового предложения (УТП) и непонятно, как именно к вам записаться.",
  visuals: "Ощущение хаоса. Фотографии при разном свете: где-то желтушно, где-то пересвет. Нет единого стиля, лента просто не цепляет глаз богатого клиента.",
  colorType: "Отсутствует. Вы не определились с фирменными цветами профиля. Лента выглядит как винегрет из случайных снимков.",
  reels: "Хуков (крючков внимания) нет. Скучный показ процесса под неактуальную музыку. Зритель свайпает ваше видео уже на 2-й секунде. Нужно срочно писать цепляющие заголовки на обложках!"
};

export const AnalysisTab = () => {
  const [step, setStep] = useState<'form' | 'analyzing' | 'results'>('form');
  const [url, setUrl] = useState('');

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
              Ты успешно зарегистрировалась! Теперь давай проверим, почему твой профиль теряет клиентов. <br/>
              <b>Внимание: наш ИИ критикует жестко и честно. Мы здесь, чтобы исправить ошибки, а не гладить по голове.</b>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: '#111827' }}>Ссылка на Instagram</h4>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                  <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="https://instagram.com/tvoi_profill" 
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
                  <Sparkles size={18} /> Сделать жесткий разбор
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
            <p style={{ color: '#db2777', marginTop: '0.5rem' }}>Анализируем УТП, актуальность визуалов и хуки под лупой.</p>
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
                <strong>Без обид, только факты.</strong> Чтобы начать получать клиентов, профиль нужно спасать. В текущем виде он сливает трафик.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              
              <div className="result-card" style={{ borderLeftColor: '#ef4444', marginTop: 0 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ef4444" /> Аватарка</h4>
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{aiResults.avatar}</p>
              </div>
              
              <div className="result-card" style={{ borderLeftColor: '#ef4444', marginTop: 0 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ef4444" /> Шапка профиля и Био</h4>
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{aiResults.bio}</p>
              </div>

              <div className="result-card" style={{ gridColumn: '1 / -1', borderLeftColor: '#ef4444', marginTop: 0 }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ef4444" /> Визуал и Reels</h4>
                <div style={{ background: '#fdf2f8', padding: '1.25rem', borderRadius: '12px', marginTop: '1rem' }}>
                  <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#db2777' }}>Общий визуал:</strong> <span style={{ color: '#374151' }}>{aiResults.visuals}</span></p>
                  <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#db2777' }}>Цветотип:</strong> <span style={{ color: '#374151' }}>{aiResults.colorType}</span></p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#db2777' }}>Оценка Рилсов:</strong> <span style={{ color: '#374151' }}>{aiResults.reels}</span></p>
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
