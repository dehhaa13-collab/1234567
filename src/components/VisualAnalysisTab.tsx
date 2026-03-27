import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, XCircle, Sparkles } from 'lucide-react';
import type { UserProfile } from '../App';
import { askGemini } from '../services/gemini';

interface VisualTip {
  title: string;
  problem: string;
  solution: string;
}

const nicheLabels: Record<string, string> = {
  hair: 'волосы (стилист)',
  permanent: 'перманентный макияж',
  lashes: 'ресницы/брови',
  nails: 'ногти (нейл-мастер)',
};

export const VisualAnalysisTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const [step, setStep] = useState<'idle' | 'loading' | 'results' | 'error'>('idle');
  const [tips, setTips] = useState<VisualTip[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const nicheLabel = nicheLabels[userProfile?.niche || ''] || 'бьюти';

  const handleAnalyze = async () => {
    setStep('loading');
    setErrorMessage('');

    const prompt = `Ты — эксперт по визуальному оформлению Instagram для бьюти-мастеров.
Пользователь — мастер в нише "${nicheLabel}", опыт: ${userProfile?.experience || 'не указан'}.

Дай ровно 3 конкретных совета по визуальному оформлению Instagram-профиля для этого мастера.
Каждый совет должен содержать:
1. Название области (например: Цветовая палитра, Актуальные, Видео-контент)
2. Типичную проблему (1-2 предложения)
3. Конкретное решение (2-3 предложения)

ФОРМАТ ОТВЕТА (строго):
---СОВЕТ1---
НАЗВАНИЕ: (название)
ПРОБЛЕМА: (описание проблемы)
РЕШЕНИЕ: (описание решения)
---СОВЕТ2---
НАЗВАНИЕ: (название)
ПРОБЛЕМА: (описание проблемы)
РЕШЕНИЕ: (описание решения)
---СОВЕТ3---
НАЗВАНИЕ: (название)
ПРОБЛЕМА: (описание проблемы)
РЕШЕНИЕ: (описание решения)`;

    const result = await askGemini(prompt);

    if (!result.success) {
      setErrorMessage(result.error || 'Произошла неизвестная ошибка');
      setStep('error');
      return;
    }

    try {
      const parsed: VisualTip[] = [];
      const sections = result.text.split(/---СОВЕТ\d+---/).filter(s => s.trim());

      for (const section of sections) {
        const titleMatch = section.match(/НАЗВАНИЕ:\s*(.+)/);
        const problemMatch = section.match(/ПРОБЛЕМА:\s*([\s\S]*?)(?=РЕШЕНИЕ:)/);
        const solutionMatch = section.match(/РЕШЕНИЕ:\s*([\s\S]*?)$/);

        if (titleMatch && problemMatch && solutionMatch) {
          parsed.push({
            title: titleMatch[1].trim(),
            problem: problemMatch[1].trim(),
            solution: solutionMatch[1].trim(),
          });
        }
      }

      if (parsed.length === 0) {
        setErrorMessage('ИИ вернул ответ в неожиданном формате. Попробуйте ещё раз.');
        setStep('error');
        return;
      }

      setTips(parsed);
      setStep('results');
    } catch {
      setErrorMessage('Не удалось обработать ответ ИИ.');
      setStep('error');
    }
  };

  const colors = [
    { bg: '#fdf2f8', border: '#ec4899', dot: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
    { bg: '#fffbeb', border: '#f59e0b', dot: '#f59e0b' },
    { bg: '#eff6ff', border: '#3b82f6', dot: '#3b82f6' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: '#fdf2f8', borderRadius: '20px' }}><Search color="#ec4899" size={32} /></div>
        <h2 style={{ fontSize: '2rem', margin: 0, fontFamily: 'Outfit', color: '#111827' }}>Глубокий разбор визуала</h2>
      </div>

      {step === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            ИИ проанализирует типичные ошибки визуального оформления для мастера в нише «{nicheLabel}» и даст персональные рекомендации.
          </p>
          <button className="btn-primary" onClick={handleAnalyze} style={{ margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> Запустить анализ визуала
          </button>
        </motion.div>
      )}

      {step === 'loading' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ width: '56px', height: '56px', border: '4px solid #fdf2f8', borderTop: '4px solid #ec4899', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1.5rem', color: 'var(--text-heading)', fontWeight: 600, fontSize: '1.25rem' }}>ИИ анализирует визуал...</p>
          <p style={{ color: '#db2777', marginTop: '0.5rem' }}>Генерируем персональные рекомендации.</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </motion.div>
      )}

      {step === 'error' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>
          <div style={{ 
            background: '#fef2f2', 
            padding: '2rem', 
            borderRadius: '20px', 
            border: '1px solid #fecaca',
            textAlign: 'center'
          }}>
            <XCircle color="#ef4444" size={48} style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ color: '#991b1b', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
              Не удалось выполнить анализ визуала
            </h3>
            <p style={{ color: '#7f1d1d', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 2rem auto' }}>
              {errorMessage}
            </p>
            <button className="btn-primary" onClick={handleAnalyze}>
              Попробовать ещё раз
            </button>
          </div>
        </motion.div>
      )}

      {step === 'results' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {tips.map((tip, index) => {
              const color = colors[index % colors.length];
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: index * 0.1 }}
                  style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
                >
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#111827', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: color.dot }} />
                    {tip.title}
                  </h4>
                  <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1rem' }}>
                    {tip.problem}
                  </p>
                  <div style={{ background: color.bg, padding: '1rem', borderRadius: '12px', borderLeft: `3px solid ${color.border}` }}>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.5rem' }}>Решение:</strong>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>{tip.solution}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={onNext} className="btn-primary" style={{ display: 'block', margin: '0 auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            Получить контент-план из 10 сценариев <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginTop: '-2px' }} />
          </button>
        </>
      )}

    </motion.div>
  );
};
