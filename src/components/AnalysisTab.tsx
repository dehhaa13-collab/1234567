import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../constants';
import { NICHE_LABELS } from '../constants';
import { Spinner, ErrorBlock } from './ui';
import { askGemini } from '../services/gemini';

export const AnalysisTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const [step, setStep] = useState<'form' | 'analyzing' | 'results' | 'error'>('form');
  const [url, setUrl] = useState('');
  const [selectedBio, setSelectedBio] = useState(0);
  const [bioVariants, setBioVariants] = useState<string[]>([]);
  const [analysisText, setAnalysisText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const nicheLabel = NICHE_LABELS[userProfile?.niche || ''] || 'бьюти';

  const handleStartAnalysis = async () => {
    if (!url) return;
    setStep('analyzing');
    setErrorMessage('');

    const prompt = `Ты — эксперт по Instagram-маркетингу для бьюти-мастеров. 
Пользователь — мастер в нише "${nicheLabel}", зовут "${userProfile?.name || 'Мастер'}".
Опыт: ${userProfile?.experience || 'не указан'}.
Главная проблема: ${userProfile?.problem || 'нехватка клиентов'}.
Ник или ссылка на Instagram: ${url}

Задача 1: Напиши короткий анализ (3-4 предложения) — почему у такого мастера может быть проблема "${userProfile?.problem || 'мало клиентов'}" из-за неправильно оформленной шапки профиля. Будь конкретной и полезной, не общими фразами.

Задача 2: Предложи ровно 3 варианта новой шапки профиля (био) для Instagram. Каждый вариант должен состоять из 3-4 строк и включать:
- Имя + специализацию
- УТП (уникальное торговое предложение)  
- Призыв к действию

ФОРМАТ ОТВЕТА (строго):
---АНАЛИЗ---
(текст анализа)
---БИО1---
(текст первого варианта био)
---БИО2---
(текст второго варианта био)
---БИО3---
(текст третьего варианта био)`;

    const result = await askGemini(prompt);

    if (!result.success) {
      setErrorMessage(result.error || 'Произошла неизвестная ошибка');
      setStep('error');
      return;
    }

    try {
      const text = result.text;
      const analysisMatch = text.match(/---АНАЛИЗ---([\s\S]*?)---БИО1---/);
      const bio1Match = text.match(/---БИО1---([\s\S]*?)---БИО2---/);
      const bio2Match = text.match(/---БИО2---([\s\S]*?)---БИО3---/);
      const bio3Match = text.match(/---БИО3---([\s\S]*?)$/);

      const analysis = analysisMatch?.[1]?.trim();
      const bio1 = bio1Match?.[1]?.trim();
      const bio2 = bio2Match?.[1]?.trim();
      const bio3 = bio3Match?.[1]?.trim();

      if (!analysis || !bio1 || !bio2 || !bio3) {
        setErrorMessage('ИИ вернул ответ в неожиданном формате. Попробуйте ещё раз.');
        setStep('error');
        return;
      }

      setAnalysisText(analysis);
      setBioVariants([bio1, bio2, bio3]);
      setSelectedBio(0);
      setStep('results');
    } catch {
      setErrorMessage('Не удалось обработать ответ ИИ. Попробуйте ещё раз.');
      setStep('error');
    }
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
              Отлично, {userProfile?.name || 'мастер'}! Введи ссылку или никнейм. ИИ проанализирует профиль с учетом твоей ниши ({nicheLabel}) и твоей главной боли ({userProfile?.problem?.toLowerCase() || 'нехватка клиентов'}).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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

              <div>
                <button className="btn-primary" onClick={handleStartAnalysis} disabled={!url} style={{ opacity: !url ? 0.5 : 1 }}>
                  <Sparkles size={18} /> Начать детальный разбор
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <Spinner title="ИИ анализирует профиль..." subtitle="Запрос отправлен в Gemini. Ожидаем ответ." />
        )}

        {step === 'error' && (
          <ErrorBlock title="Не удалось выполнить анализ" message={errorMessage} onRetry={() => setStep('form')} />
        )}

        {step === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '0.5rem' }}>

            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '16px', border: '1px solid #fecaca', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <AlertTriangle color="#ef4444" size={24} />
                <h3 style={{ margin: 0, color: '#991b1b', fontSize: '1.25rem' }}>Почему у тебя {userProfile?.problem?.toLowerCase() || 'мало клиентов'}?</h3>
              </div>
              <p style={{ color: '#7f1d1d', lineHeight: 1.6, margin: 0 }}>{analysisText}</p>
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Идеальная шапка: выбери вариант</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>ИИ создал 3 варианта специально для тебя. Кликни на тот, который нравится больше.</p>

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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setStep('form')} style={{ flex: 1, padding: '1rem 2rem', cursor: 'pointer', background: 'transparent', border: '1px solid #111827', borderRadius: '99px', fontWeight: 600, fontFamily: 'Outfit', textAlign: 'center' }}>
                Попробовать другой ник
              </button>
              <button onClick={onNext} className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                Перейти к Этапу 2 <ChevronRight size={20} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
