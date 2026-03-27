import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../App';

export const VisualAnalysisTab = ({ userProfile: _userProfile, onNext }: { userProfile: UserProfile | null, onNext: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: '#fdf2f8', borderRadius: '20px' }}><Search color="#ec4899" size={32} /></div>
        <h2 style={{ fontSize: '2rem', margin: 0, fontFamily: 'Outfit', color: '#111827' }}>Глубокий разбор визуала</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        {/* Цветотип */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
        >
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#111827', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }} />
            Цветотип и Эстетика
          </h4>
          <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1rem' }}>
            Сейчас в профиле смешано несколько стилей. Фотографии сняты при разном свете, из-за чего лента выглядит "тяжелой".
          </p>
          <div style={{ background: '#fdfbfd', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid #ec4899' }}>
            <strong style={{ color: '#111827', display: 'block', marginBottom: '0.5rem' }}>Решение:</strong>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>Закрепи 2 фирменных цвета (например, пастельный беж и пыльная роза). Делай фото при естественном свете у окна. Дорого = минимализм.</p>
          </div>
        </motion.div>

        {/* Актуальные */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
        >
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#111827', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#f59e0b' }} />
            Актуальные (Highlights)
          </h4>
          <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1rem' }}>
            Много лишних альбомов или обложки из 2018 года. Клиент не находит нужное инфо с первых секунд.
          </p>
          <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid #f59e0b' }}>
            <strong style={{ color: '#111827', display: 'block', marginBottom: '0.5rem' }}>Решение:</strong>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>Оставь 4 закрепленных истории с красивыми обложками: <br/>1. Отзывы <br/>2. Прайс <br/>3. До/После <br/>4. Обо мне.</p>
          </div>
        </motion.div>

        {/* Разбор Reels */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', gridColumn: '1 / -1' }}
        >
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#111827', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3b82f6' }} />
            Аудит видео (Reels)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
             <div>
                <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '1.05rem' }}>
                  Тематика твоих видео неплохая, ты показываешь много процессов. Но охваты падают, потому что зритель уходит в первые 3 секунды.
                </p>
             </div>
             <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid #3b82f6' }}>
              <strong style={{ color: '#111827', display: 'block', marginBottom: '0.5rem' }}>Главные ошибки:</strong>
              <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>1. Нет цепляющего заголовка прямо на самом видео.<br/>2. Затянутое начало (приветствие вместо сути).<br/>3. Плохой свет на исходниках.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <button onClick={onNext} className="btn-primary" style={{ display: 'block', margin: '0 auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
        Получить контент-план из 10 сценариев <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginTop: '-2px' }} />
      </button>

    </motion.div>
  );
};
