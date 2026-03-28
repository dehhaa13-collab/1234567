import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Sparkles } from 'lucide-react';
import type { UserProfile } from '../constants';
import { NICHE_LABELS } from '../constants';
import { Spinner, ErrorBlock } from './ui';
import { askGemini } from '../services/gemini';

interface VisualTip {
  title: string;
  problem: string;
  solution: string;
}

const CARD_COLORS = [
  { bg: '#fdf2f8', border: '#ec4899', dot: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
  { bg: '#fffbeb', border: '#f59e0b', dot: '#f59e0b' },
  { bg: '#eff6ff', border: '#3b82f6', dot: '#3b82f6' },
];

export const VisualAnalysisTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const [step, setStep] = useState<'idle' | 'loading' | 'results' | 'error'>('idle');
  const [tips, setTips] = useState<VisualTip[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const nicheLabel = NICHE_LABELS[userProfile?.niche || ''] || 'бьюти';

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

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: '#fdf2f8', borderRadius: '20px' }}><Search color="#ec4899" size={32} /></div>
        <h2 style={{ fontSize: '2rem', margin: 0, fontFamily: 'Outfit', color: '#111827' }}>Глубокий разбор визуала</h2>
      </div>

      {step === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            ИИ проанализирует типичные ошибки визуального оформления для мастера в нише «{nicheLabel}» и даст персональные рекомендации.
          </p>
          <button className="btn-primary" onClick={handleAnalyze} style={{ margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> Запустить анализ визуала
          </button>
        </motion.div>
      )}

      {step === 'loading' && (
        <Spinner title="ИИ анализирует визуал..." subtitle="Генерируем персональные рекомендации." />
      )}

      {step === 'error' && (
        <ErrorBlock title="Не удалось выполнить анализ визуала" message={errorMessage} onRetry={handleAnalyze} />
      )}

      {step === 'results' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {tips.map((tip, index) => {
              const color = CARD_COLORS[index % CARD_COLORS.length];
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
                  <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1rem' }}>{tip.problem}</p>
                  <div style={{ background: color.bg, padding: '1rem', borderRadius: '12px', borderLeft: `3px solid ${color.border}` }}>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.5rem' }}>Решение:</strong>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>{tip.solution}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={onNext} className="btn-primary" style={{ display: 'block', margin: '0 auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            Получить контент-план <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginTop: '-2px' }} />
          </button>
        </>
      )}

    </motion.div>
  );
};
