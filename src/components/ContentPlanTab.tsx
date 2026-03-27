import { motion } from 'framer-motion';
import { PlaySquare, Image as ImageIcon, Video, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../App';

const getScenarios = (_niche: string, name: string) => {
  const common = [
    { type: 'reels', title: 'Опровержение мифа', desc: 'Развеиваем главный миф вашей ниши. Хук: "Почему [Миф] — это лучший способ испортить [Результат]."' },
    { type: 'carousel', title: 'Кейс До/После', desc: 'Карусель из 3-4 фото. Показываем исходник, описываем проблему клиента в тексте и показываем роскошный результат на обложке.' },
    { type: 'post', title: 'Обо мне (Знакомство)', desc: `Меня зовут ${name || 'Мастер'}, и вот почему я выбрала эту профессию. Искренний пост, повышающий лояльность.` },
    { type: 'reels', title: 'ASMR процесс работы', desc: 'Видео без слов, только красивые звуки вашей работы на макросъемке. Хук: "Залипни на 15 секунд..."' },
    { type: 'reels', title: 'Юмор / Жиза', desc: 'Шуточный Reels под трендовый звук о типичной проблеме клиентов, которые пытаются сделать всё сами дома.' },
    { type: 'carousel', title: 'Инструкция по уходу', desc: 'Как сохранить результат вашей процедуры надолго. Категоричные "Нельзя" и обязательные "Нужно".' },
    { type: 'reels', title: 'Рабочее место', desc: 'Эстетичный обзор вашего кабинета/инструментов. Хук: "Где создается красота..." Показываем стерильность и премиальность.' },
    { type: 'post', title: 'Взгляд за кулисы', desc: 'Пост о том, сколько времени и средств вы вкладываете в свое обучение, чтобы давать клиентам лучший результат.' },
    { type: 'reels', title: 'Частый вопрос', desc: 'Ответ на самый частый вопрос в Директе. Видео разговорного формата (говорящая голова) + текст на экране.' },
    { type: 'reels', title: 'Эстетика / Атмосфера', desc: 'Красивая нарезка замедленных кадров под дорогую музыку. Показываем финальный результат процедуры.' },
  ];

  // We could replace specific keywords per niche, but a generalized strategic framework works wonderfully.
  return common;
};

export const ContentPlanTab = ({ userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  const scenarios = getScenarios(userProfile?.niche || '', userProfile?.name || '');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '2rem 0' }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit', color: '#111827' }}>Контент-план на месяц (10 постов)</h2>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Отличная шапка и визуал — это 50% успеха. Остальные 50% — это трафик через Reels и полезные посты. <br/>
          Специально для тебя ({userProfile?.niche || 'твоей ниши'}) мы составили 10 железобетонных сценариев, которые принесут заявки в Директ.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {scenarios.map((scenario, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              background: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '20px', 
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: scenario.type === 'reels' ? '#ec4899' : scenario.type === 'carousel' ? '#8b5cf6' : '#14b8a6' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ 
                background: scenario.type === 'reels' ? '#fdf2f8' : scenario.type === 'carousel' ? '#f5f3ff' : '#f0fdfa', 
                color: scenario.type === 'reels' ? '#db2777' : scenario.type === 'carousel' ? '#7c3aed' : '#0d9488',
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
                {scenario.type === 'post' && <Video size={14} />}
                {scenario.type}
              </div>
              <span style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>ДЕНЬ {index + 1}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#111827' }}>{scenario.title}</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>{scenario.desc}</p>
          </motion.div>
        ))}
      </div>

      <button onClick={onNext} className="btn-primary" style={{ display: 'block', margin: '3rem auto 0 auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
        Загрузить видео в ИИ-Монтажер <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginTop: '-2px' }} />
      </button>
    </motion.div>
  );
};
