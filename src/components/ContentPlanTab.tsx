import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaySquare, Image as ImageIcon, FileText, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import type { UserProfile } from '../constants';
import { NICHE_LABELS } from '../constants';
import { Spinner, ErrorBlock } from './ui';
import { askGemini } from '../services/gemini';

interface ScenarioOption {
  hook: string;
  text: string;
}

interface Scenario {
  type: string;
  title: string;
  desc: string;
  options: ScenarioOption[];
}

function parseScenarios(text: string): Scenario[] {
  const scenarios: Scenario[] = [];
  const dayBlocks = text.split(/---ДЕНЬ\d+---/).filter(s => s.trim());

  for (const block of dayBlocks) {
    const typeMatch = block.match(/ТИП:\s*(.+)/);
    const titleMatch = block.match(/ЗАГОЛОВОК:\s*(.+)/);
    const descMatch = block.match(/ОПИСАНИЕ:\s*(.+)/);

    const optionMatches = [...block.matchAll(/ВАРИАНТ\d+_ХУК:\s*(.+)\nВАРИАНТ\d+_ТЕКСТ:\s*([\s\S]*?)(?=ВАРИАНТ\d+_ХУК:|$)/g)];

    if (typeMatch && titleMatch && descMatch) {
      const rawType = typeMatch[1].trim().toLowerCase();
      const type = rawType.includes('reels') ? 'reels' : rawType.includes('carousel') || rawType.includes('карусель') ? 'carousel' : 'post';

      const options: ScenarioOption[] = optionMatches.map(m => ({
        hook: m[1].trim(),
        text: m[2].trim(),
      }));

      scenarios.push({
        type,
        title: titleMatch[1].trim(),
        desc: descMatch[1].trim(),
        options: options.length > 0 ? options : [{ hook: 'Вариант', text: 'Подробности скоро будут доступны.' }],
      });
    }
  }

  return scenarios;
}

const TYPE_STYLES: Record<string, { bg: string; color: string; stripe: string }> = {
  reels: { bg: '#fdf2f8', color: 'var(--primary)', stripe: 'var(--primary)' },
  carousel: { bg: '#f5f3ff', color: 'var(--secondary)', stripe: 'var(--secondary)' },
  post: { bg: '#f0fdfa', color: '#0d9488', stripe: '#14b8a6' },
};

export const ContentPlanTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const [step, setStep] = useState<'idle' | 'loading' | 'results' | 'error'>('idle');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const nicheLabel = NICHE_LABELS[userProfile?.niche || ''] || 'бьюти';

  const handleGenerate = async () => {
    setStep('loading');
    setErrorMessage('');

    const prompt = `Ты — контент-стратег и SMM-менеджер для бьюти-мастеров.
Пользователь — мастер в нише "${nicheLabel}", зовут "${userProfile?.name || 'Мастер'}".
Опыт: ${userProfile?.experience || 'не указан'}.

Создай контент-план из ровно 10 единиц контента для Instagram. Для каждой единицы укажи:
- ТИП (reels, carousel или post)
- Заголовок
- Краткое описание
- 3 варианта реализации (хук + развернутый текст)

Контент должен быть разнообразным: включи reels, карусели и посты. Все идеи должны быть конкретными, применимыми для ниши "${nicheLabel}".

ФОРМАТ ОТВЕТА (строго, без markdown):
---ДЕНЬ1---
ТИП: reels
ЗАГОЛОВОК: (заголовок)
ОПИСАНИЕ: (краткое описание)
ВАРИАНТ1_ХУК: (хук)
ВАРИАНТ1_ТЕКСТ: (развернутый текст)
ВАРИАНТ2_ХУК: (хук)
ВАРИАНТ2_ТЕКСТ: (развернутый текст)
ВАРИАНТ3_ХУК: (хук)
ВАРИАНТ3_ТЕКСТ: (развернутый текст)
---ДЕНЬ2---
... и так далее до ДЕНЬ10`;

    const result = await askGemini(prompt);

    if (!result.success) {
      setErrorMessage(result.error || 'Произошла неизвестная ошибка');
      setStep('error');
      return;
    }

    try {
      const parsed = parseScenarios(result.text);

      if (parsed.length === 0) {
        setErrorMessage('ИИ вернул ответ в неожиданном формате. Попробуйте ещё раз.');
        setStep('error');
        return;
      }

      setScenarios(parsed);
      setStep('results');
    } catch {
      setErrorMessage('Не удалось обработать ответ ИИ.');
      setStep('error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit', color: '#111827' }}>Контент-план на месяц</h2>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          ИИ создаст персональный план из 10 идей для контента на основе твоей ниши и опыта.
        </p>
      </div>

      {step === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Нажми кнопку, и Gemini AI создаст 10 уникальных идей для твоего контента в нише «{nicheLabel}» с 3 вариантами для каждого дня.
          </p>
          <button className="btn-primary" onClick={handleGenerate} style={{ margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} /> Сгенерировать контент-план
          </button>
        </motion.div>
      )}

      {step === 'loading' && (
        <Spinner title="ИИ генерирует контент-план..." subtitle="Создаём 10 уникальных идей с 3 вариантами каждая." />
      )}

      {step === 'error' && (
        <ErrorBlock title="Не удалось создать контент-план" message={errorMessage} onRetry={handleGenerate} />
      )}

      {step === 'results' && (
        <>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            Готово! {scenarios.length} идей для контента. Кликни на любую ячейку, чтобы раскрыть варианты.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {scenarios.map((scenario, index) => {
              const style = TYPE_STYLES[scenario.type] || TYPE_STYLES.post;
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  style={{
                    background: 'white',
                    border: isExpanded ? '2px solid var(--primary)' : '1px solid #e5e7eb',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: isExpanded ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: style.stripe, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        background: style.bg,
                        color: style.color,
                        padding: '0.4rem 0.8rem',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {scenario.type === 'reels' && <PlaySquare size={14} />}
                        {scenario.type === 'carousel' && <ImageIcon size={14} />}
                        {scenario.type === 'post' && <FileText size={14} />}
                        {scenario.type}
                      </div>
                      <span style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>ДЕНЬ {index + 1}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      color="#9ca3af"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#111827', fontFamily: 'Outfit' }}>{scenario.title}</h3>

                  {!isExpanded && (
                    <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                      {scenario.desc} <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Нажми, чтобы раскрыть варианты.</span>
                    </p>
                  )}

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden', marginTop: '1rem' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {scenario.options.map((opt, oIdx) => (
                            <div key={oIdx} style={{ background: '#fdfbfd', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                              <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Вариант {oIdx + 1}: {opt.hook}</strong>
                              <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>{opt.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

          <button onClick={onNext} className="btn-primary" style={{ display: 'block', margin: '4rem auto 0 auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            Снять видео и зайти в ИИ-Монтажер <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginTop: '-2px' }} />
          </button>
        </>
      )}
    </motion.div>
  );
};
