import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Crown } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [problem, setProblem] = useState('');

  const nextStep = () => {
    if (step === 3) {
      onComplete(); // Завершить регистрацию
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#Fdfbfd' }}>
      
      {/* Left Column - Motivation & Beauty Aesthetics */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(139,92,246,0.1))',
        position: 'relative',
        display: 'none', // hidden on very small screens
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        overflow: 'hidden'
      }} className="onboarding-left">
        
        {/* Animated background elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'var(--secondary)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.5)', padding: '0.75rem 1.5rem', borderRadius: '99px', marginBottom: '2rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)' }}>
            <Sparkles color="#ec4899" size={20} />
            <span style={{ fontWeight: 600, fontFamily: 'Outfit', color: '#db2777' }}>Content Factory</span>
          </div>

          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '2rem', fontFamily: 'Outfit', color: '#111827' }}>
            Если ты мастер бьюти,<br/>твоя страница тоже должна быть <span className="text-gradient">beauty</span> 🎀
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <Heart color="#ec4899" size={24} />
              </div>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.5, marginTop: '0.25rem' }}>
                Твой профиль — это твой лучший сотрудник. Он должен работать и продавать твои услуги 24/7, даже когда ты спишь.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'white', padding: '0.75rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <Crown color="#8b5cf6" size={24} />
              </div>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.5, marginTop: '0.25rem' }}>
                То, что ты уже здесь — это огромный шаг вперед. Давай вместе превратим твой блог в машину по генерации клиентов на месяц вперед!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Interactive Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem', position: 'relative', background: 'white' }}>
        
        <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
          
          <div style={{ background: '#f3f4f6', height: '6px', borderRadius: '99px', marginBottom: '3rem', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', borderRadius: '99px' }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Шаг 1 из 3</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', marginTop: '0.5rem', fontFamily: 'Outfit' }}>Давай знакомиться!</h2>
                <p style={{ color: 'var(--text-main)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Как к тебе обращаться?</p>
                
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Твое имя..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ fontSize: '1.25rem', padding: '1.25rem', background: '#fdfbfd' }}
                />

                <button className="btn-primary" onClick={nextStep} disabled={!name} style={{ opacity: !name ? 0.5 : 1, width: '100%', marginTop: '2rem', padding: '1rem' }}>
                  Далее <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Шаг 2 из 3</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', marginTop: '0.5rem', fontFamily: 'Outfit' }}>Твой опыт в бьюти</h2>
                <p style={{ color: 'var(--text-main)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Это поможет нам давать более точные советы.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {['До 1 года (Новичок)', '1-3 года', 'Более 3 лет (Топ-мастер)'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setExperience(opt)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: experience === opt ? '2px solid #ec4899' : '2px solid #f3f4f6',
                        background: experience === opt ? '#fdf2f8' : 'white',
                        color: experience === opt ? '#db2777' : '#4b5563',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button className="btn-primary" onClick={nextStep} disabled={!experience} style={{ opacity: !experience ? 0.5 : 1, width: '100%', marginTop: '2rem', padding: '1rem' }}>
                  Далее <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Шаг 3 из 3</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', marginTop: '0.5rem', fontFamily: 'Outfit' }}>Главная проблема сейчас?</h2>
                <p style={{ color: 'var(--text-main)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Мы построим индивидуальный план под твою боль.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {['Мало новых клиентов', 'Клиенты не возвращаются', 'Нет просмотров Reels', 'Никто не пишет в Директ'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setProblem(opt)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: problem === opt ? '2px solid #8b5cf6' : '2px solid #f3f4f6',
                        background: problem === opt ? '#f5f3ff' : 'white',
                        color: problem === opt ? '#7c3aed' : '#4b5563',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button className="btn-primary" onClick={nextStep} disabled={!problem} style={{ opacity: !problem ? 0.5 : 1, width: '100%', marginTop: '2rem', padding: '1rem' }}>
                  Зарегистрироваться и войти
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .onboarding-left {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
