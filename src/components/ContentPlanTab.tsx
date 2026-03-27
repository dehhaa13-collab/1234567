import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaySquare, Image as ImageIcon, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import type { UserProfile } from '../App';

const getScenarios = (_niche: string, name: string) => {
  return [
    { 
      type: 'reels', 
      title: 'Опровержение мифа', 
      desc: 'Развеиваем главный миф вашей ниши.',
      options: [
        { hook: '"Я думала, это убьет мои волосы..."', text: 'Покажите процесс процедуры, которая считается опасной (например, осветление или снятие пинцетом), но объясните, что с вашим подходом это 100% безопасно.' },
        { hook: '"Не делай это дома!"', text: '3 вещи из масс-маркета, которые портят результат вашей работы. Почему скупой платит дважды.' },
        { hook: '"Почему я отказала клиенту?"', text: 'Расскажите историю, как вы отказались делать процедуру ради здоровья клиента. Это супер-сильно повышает доверие.' }
      ]
    },
    { 
      type: 'carousel', 
      title: 'Кейс До/После', 
      desc: '3-4 слайда с роскошным финальным результатом.',
      options: [
        { hook: 'Слайд 1: "Достать из черного" со стрелочкой.', text: 'Карусель. 1 слайд: фото ДО, 2 слайд: процесс работы (макро), 3 слайд: фото роскошного ПОСЛЕ. Текст поста: "Как мы добились такого результата за 1 день".' },
        { hook: 'Слайд 1: "Трансформация за 2 часа".', text: 'Покажите, как изменилось выражение лица клиентки после вашей услуги. Дайте понять, что вы дарите эмоции, а не просто услугу.' },
        { hook: 'Слайд 1: Отзыв клиентки крупным шрифтом.', text: 'Первый слайд — текст отзыва. Второй слайд — результат работы. Люди любят читать чужие восхищения.' }
      ]
    },
    { 
      type: 'reels', 
      title: 'ASMR процесс', 
      desc: 'Видео без слов, залипательные звуки работы.',
      options: [
        { hook: '(Без слов) Текст на видео: "Залипни на 15 секунд..."', text: 'Снимите макро самых приятных моментов вашей работы. Звук должен быть шуршащим или очень чистым.' },
        { hook: 'Текст на видео: "Мой медитативный процесс"', text: 'Замедленная съемка взмахов кисти/пинцета/ножниц на фоне красивой лоунж-музыки.' },
        { hook: 'Текст на видео: "Только посмотри на эту текстуру..."', text: 'Демонстрация ваших премиум-материалов, как они блестят, как вы их смешиваете.' }
      ]
    },
    { 
      type: 'post', 
      title: 'Обо мне (Знакомство)', 
      desc: `Лояльность через искренность от ${name || 'мастера'}.`,
      options: [
        { hook: 'Фото с красивым портретом. Заголовок: "5 фактов, которые вы обо мне не знали".', text: 'Расскажите о своем пути в бьюти, почему выбрали эту нишу и через какие трудности прошли.' },
        { hook: 'Фото в рабочем процессе. Заголовок: "Мой главный принцип в работе".', text: 'Пост о вашей философии. Почему вы выбираете дорогие материалы и не экономите на качестве.' },
        { hook: 'Фото в обычной жизни. Заголовок: "Кто стоит за кулисами?"', text: 'Пост-знакомство для новых подписчиков. Дайте ссылки на свои другие социальные сети или расскажите о хобби.' }
      ]
    },
    { 
      type: 'reels', 
      title: 'Юмор / Жиза', 
      desc: 'Боль клиентов под трендовую музыку.',
      options: [
        { hook: 'Текст на экране: "Когда клиентка сказала, что сама подстригла челку..."', text: 'Ваша забавная реакция под смешной или трендовый звук в Инстаграм.' },
        { hook: 'Текст на экране: "Я, когда клиент опаздывает на 15 минут..."', text: 'Формат ожидания / реальности. Очень хорошо заходит у мастеров, собирает репосты коллег.' },
        { hook: 'Текст на экране: "Ожидание / Реальность домашнего ухода"', text: 'Короткий ролик, смешно обыгрывающий использование дешевых средств.' }
      ]
    },
    { 
      type: 'carousel', 
      title: 'Инструкция по уходу', 
      desc: 'Что делать, чтобы результат держался.',
      options: [
        { hook: 'Слайд 1: "Как продлить результат на месяц?"', text: 'Инструкция пошагово: что можно, что категорически нельзя делать в первые 3 дня.' },
        { hook: 'Слайд 1: "ТОП-3 средства для домашнего ухода"', text: 'Подборка конкретных баночек с ценами, которые вы рекомендуете. Клиенты обожают прямые рекомендации.' },
        { hook: 'Слайд 1: "Памятка для моих любимых клиентов"', text: 'Простой чек-лист, который они могут сохранить (сохранения бустят алгоритм) в закладки.' }
      ]
    },
    { 
      type: 'reels', 
      title: 'Внутренняя кухня', 
      desc: 'Показываем стерильность и премиальность.',
      options: [
        { hook: 'Текст: "Что происходит в кабинете до вашего прихода?"', text: 'Ускоренное видео, как вы подготавливаете свет, стерелизуете инструменты, включаете музыку.' },
        { hook: 'Текст: "Закулисье создания красоты"', text: 'Эстетичная нарезка кадров помещения, сухожара, раскладки материалов.' },
        { hook: 'Текст: "Почему у нас так уютно?"', text: 'Обзор вашего кресла, пледов, кофе-машины. Клиенты идут за сервисом!' }
      ]
    },
    { 
      type: 'reels', 
      title: 'Частый вопрос', 
      desc: 'Отработка возражений в разговорном формате.',
      options: [
        { hook: 'Текст: "А это не больно?"', text: 'Быстрый и экспертный ответ на камеру. Ваша уверенность продает лучше всего.' },
        { hook: 'Текст: "Почему так дорого?"', text: 'Аргументация цены: опыт, материалы, гарантия результата. Не бойтесь обосновывать ценность.' },
        { hook: 'Текст: "Как часто нужно повторять процедуру?"', text: 'Четкие сроки и рекомендации. Это стимулирует клиентов сразу записываться на коррекцию.' }
      ]
    },
    { 
      type: 'carousel', 
      title: 'Обучение / Сертификаты', 
      desc: 'Повышаем статус эксперта в глазах клиента.',
      options: [
        { hook: 'Слайд 1: "Я снова учусь..."', text: 'Карусель фото с последнего мастер-класса. Текст о том, что индустрия не стоит на месте, и вы всегда в тренде.' },
        { hook: 'Слайд 1: "Сколько стоит стать профи?"', text: 'Честный пост о стоимости ваших курсов, показывающий, что ваш прайс полностью оправдан.' },
        { hook: 'Слайд 1: "Мои свежие сертификаты"', text: 'Просто красивые сертификаты и благодарность вашим учителям. Это ценится!' }
      ]
    },
    { 
      type: 'reels', 
      title: 'Эстетика / Атмосфера', 
      desc: 'Дорогое видео для привлечения визуалов.',
      options: [
        { hook: 'Только эстетика. Минимум текста. Например: "Твой идеальный выходной."', text: 'Очень дорогие, плавные кадры вашего самого красивого результата под лоунж.' },
        { hook: 'Текст: "Pov: ты нашла своего мастера."', text: 'Съемка от лица клиента (кофе в руках, красивое зеркало, финальный взгляд на себя).' },
        { hook: 'Текст: "Вложите в себя..."', text: 'Мотивационное видео с вашим бьюти-процессом на фоне статусных цитат на английском.' }
      ]
    }
  ];
};

export const ContentPlanTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const scenarios = getScenarios(userProfile?.niche || '', userProfile?.name || '');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '2rem 0' }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit', color: '#111827' }}>Контент-план на месяц (10 идей)</h2>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Кликни на любую ячейку, чтобы раскрыть 3 подробных варианта для каждого дня. Выбери тот сценарий, который тебе ближе всего!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {scenarios.map((scenario, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            style={{ 
              background: 'white', 
              border: expandedIndex === index ? '2px solid var(--primary)' : '1px solid #e5e7eb', 
              borderRadius: '20px', 
              padding: '1.5rem',
              boxShadow: expandedIndex === index ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: scenario.type === 'reels' ? 'var(--primary)' : scenario.type === 'carousel' ? 'var(--secondary)' : '#14b8a6', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  background: scenario.type === 'reels' ? '#fdf2f8' : scenario.type === 'carousel' ? '#f5f3ff' : '#f0fdfa', 
                  color: scenario.type === 'reels' ? 'var(--primary)' : scenario.type === 'carousel' ? 'var(--secondary)' : '#0d9488',
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
                  transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', 
                  transition: 'transform 0.3s ease' 
                }} 
              />
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#111827', fontFamily: 'Outfit' }}>{scenario.title}</h3>
            
            {!(expandedIndex === index) && (
               <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{scenario.desc} <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Нажми, чтобы раскрыть 3 варианта.</span></p>
            )}

            <AnimatePresence>
              {expandedIndex === index && (
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
        ))}
      </div>

      <button onClick={onNext} className="btn-primary" style={{ display: 'block', margin: '4rem auto 0 auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
        Снять видео и зайти в ИИ-Монтажер <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginTop: '-2px' }} />
      </button>
    </motion.div>
  );
};
