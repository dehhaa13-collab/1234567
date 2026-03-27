import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Image as ImageIcon, Sparkles, CheckCircle } from 'lucide-react';

export const AnalysisTab = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setResults(null);
    
    // Симуляция работы ИИ
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        avatar: "Хорошая, портретная аватарка, но не хватает контраста. Рекомендуется использовать однотонный фон, чтобы лицо выделялось.",
        bio: "Описание четкое, но нет призыва к действию (CTA) и оффера. Клиенту непонятно, как именно к вам записаться.",
        visuals: "Теплые пастельные тона (розовый, бежевый). Отлично подходит для бьюти-сферы и создает доверительную атмосферу.",
        colorType: "Весенне-летняя палитра. Преобладает светлый нежный тон.",
        reels: "Тематика рилсов отличная ('до/после', процесс работы), но не хватает хуков (заголовков) на обложках. Зритель не понимает о чем видео до его просмотра."
      });
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
    >
      <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Аудит твоего Instagram (Ремонт)</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>Вставь ссылку на свой профиль или загрузи скриншот шапки, и наш ИИ найдет слабые места и зоны роста для привлечения клиентов.</p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="https://instagram.com/tvoi_profill" 
            style={{ paddingLeft: '3rem' }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? 'Анализируем...' : <>
            <Sparkles size={18} /> Аудит профиля
          </>}
        </button>
        <div 
          title="Загрузить скриншот"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: '#f3f4f6', cursor: 'pointer', transition: 'all 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f3f4f6'}
        >
          <ImageIcon size={22} color="#6b7280" />
        </div>
      </div>

      {isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ marginTop: '3rem', textAlign: 'center', padding: '3rem 0' }}
        >
          <div style={{ width: '48px', height: '48px', border: '4px solid #fdf2f8', borderTop: '4px solid #ec4899', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>ИИ сканирует твой визуал и шапку...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </motion.div>
      )}

      {results && !isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '3rem' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111827' }}>План «ремонта» профиля</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div className="result-card">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ec4899" /> Аватарка</h4>
              <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6' }}>{results.avatar}</p>
            </div>
            
            <div className="result-card">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ec4899" /> Шапка профиля и Био</h4>
              <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6' }}>{results.bio}</p>
            </div>

            <div className="result-card" style={{ gridColumn: '1 / -1' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#111827' }}><CheckCircle size={20} color="#ec4899" /> Визуал и Reels</h4>
              <div style={{ background: '#fdf2f8', padding: '1.25rem', borderRadius: '12px', marginTop: '1rem' }}>
                <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#db2777' }}>Цветотип:</strong> <span style={{ color: '#374151' }}>{results.colorType}</span></p>
                <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#db2777' }}>Общий визуал:</strong> <span style={{ color: '#374151' }}>{results.visuals}</span></p>
                <p><strong style={{ color: '#db2777' }}>Рилсы:</strong> <span style={{ color: '#374151' }}>{results.reels}</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
