import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../App';

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
              Отлично, {userProfile?.name || 'мастер'}! Введи ссылку или никнейм. ИИ проанализирует профиль с учетом твоей ниши ({
                { hair: 'волосы', permanent: 'перманент', lashes: 'ресницы/брови', nails: 'ногти' }[userProfile?.niche || ''] || 'бьюти'
              }) и твоей главной боли ({userProfile?.problem?.toLowerCase() || 'нехватка клиентов'}).
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

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '56px', height: '56px', border: '4px solid #fdf2f8', borderTop: '4px solid #ec4899', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1.5rem', color: 'var(--text-heading)', fontWeight: 600, fontSize: '1.25rem' }}>Смотрим глазами твоего клиента...</p>
            <p style={{ color: '#db2777', marginTop: '0.5rem' }}>Анализируем УТП, аватарку и визуал.</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '0.5rem' }}>
            
            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '16px', border: '1px solid #fecaca', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <AlertTriangle color="#ef4444" size={24} />
                <h3 style={{ margin: 0, color: '#991b1b', fontSize: '1.25rem' }}>Почему у тебя {userProfile?.problem.toLowerCase() || 'мало клиентов'}?</h3>
              </div>
              <p style={{ color: '#7f1d1d', lineHeight: 1.6, margin: 0 }}>
                Твой профиль — это твоя визитка. Сейчас клиенты заходят на страницу и не сразу понимают, почему стоит выбрать именно тебя. В шапке профиля не хватает сильного предложения (УТП), которое зацепит их с первой секунды. <br/><br/>
                <strong>Но не переживай, мы здесь именно для этого! Выбирай свой новый стиль ниже.</strong>
              </p>
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Идеальная шапка: выбери вариант</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>Мы создали 3 мощных варианта специально для тебя. Кликни на тот, который нравится больше.</p>

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

            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Новая энергия профиля ✨</h2>
            
            <div style={{ 
              borderRadius: '24px', 
              position: 'relative',
              overflow: 'hidden',
              height: '300px',
              marginBottom: '2rem'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1492613146440-c11c50058b87?w=1200&h=600&fit=crop" 
                alt="Luxury Aesthetic"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)' }} />
              
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', maxWidth: '400px' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Продающий визуал</h3>
                <p style={{ color: '#d1d5db', lineHeight: 1.5 }}>Такой должна быть эстетика твоего бренда. Клиенты готовы платить больше за красивую упаковку.</p>
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
                Перейти к Этапу 2 (Разбор визуала) <ChevronRight size={20} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
