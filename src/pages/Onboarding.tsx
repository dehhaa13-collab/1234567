import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', width: '100%' }}>
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: '600px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', justifyContent: 'center' }}>
          <Sparkles color="#ec4899" size={28} />
          <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Content Factory</h1>
        </div>

        <div style={{ background: '#f3f4f6', height: '4px', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)' }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Давай знакомиться!</h2>
              <p style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem' }}>Как к тебе обращаться?</p>
              
              <input 
                type="text" 
                className="input-field" 
                placeholder="Твое имя..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.25rem', padding: '1.25rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={nextStep} disabled={!name} style={{ opacity: !name ? 0.5 : 1, width: '100%' }}>
                  Далее <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Твой опыт в бьюти-сфере</h2>
              <p style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem' }}>Это поможет нам давать более точные советы.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['До 1 года (Новичок)', '1-3 года', 'Более 3 лет (Топ-мастер)'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setExperience(opt)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '16px',
                      border: experience === opt ? '2px solid #ec4899' : '2px solid #e5e7eb',
                      background: experience === opt ? '#fdf2f8' : 'white',
                      color: experience === opt ? '#db2777' : '#4b5563',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={nextStep} disabled={!experience} style={{ opacity: !experience ? 0.5 : 1, width: '100%' }}>
                  Далее <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Главная проблема сейчас?</h2>
              <p style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem' }}>Мы построим индивидуальный план под твою боль.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['Мало клиентов', 'Клиенты уходят', 'Нет просмотров Reels', 'Нет идей для контента'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setProblem(opt)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '16px',
                      border: problem === opt ? '2px solid #8b5cf6' : '2px solid #e5e7eb',
                      background: problem === opt ? '#f5f3ff' : 'white',
                      color: problem === opt ? '#7c3aed' : '#4b5563',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={nextStep} disabled={!problem} style={{ opacity: !problem ? 0.5 : 1, width: '100%' }}>
                  Зарегистрироваться и войти
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
