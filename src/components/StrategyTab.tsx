import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles, Eye, Palette, CheckCircle, Video } from 'lucide-react';

const niches = [
  { id: 'hair', title: 'Волосы (Стилист)', icon: <Scissors size={24} /> },
  { id: 'permanent', title: 'Перманент', icon: <Sparkles size={24} /> },
  { id: 'lashes', title: 'Лешмейкер / Брови', icon: <Eye size={24} /> },
  { id: 'nails', title: 'Нейл-мастер', icon: <Palette size={24} /> },
];

const recommendations: Record<string, any> = {
  hair: {
    avatar: "Аватарка должна показывать вас в процессе работы (с феном или кистью) с идеальной укладкой.",
    bio: "Шапка профиля: 'Сложные окрашивания и выход из черного без потери качества. Запись на декабрь открыта ⬇️'",
    reels: [
      "Процесс сложного окрашивания под залипательный ASMR-звук. Хук: 'Кажется, это конец, но подождите...'",
      "Развеиваем мифы: '3 вещи из масс-маркета, которые убивают твой блонд.'",
      "Ускоренный таймлапс стрижки под трендовую музыку."
    ]
  },
  permanent: {
    avatar: "Крупный план вашего лица (показывающий вашу идеальную работу), либо чистый, эстетичный макроснимок ваших работ.",
    bio: "Шапка профиля: 'Добавляю по 30 минут сна каждое утро. Пудровые брови и сочные губы. Прайс и запись по ссылке ⬇️'",
    reels: [
      "До/После на контрасте. Хук: 'Как забыть про косметичку навсегда?'",
      "ASMR процесса: шуршание перчаток, заживление по дням.",
      "Ответы на страхи: 'Больно ли делать перманент губ в 2024?'"
    ]
  },
  lashes: {
    avatar: "Макро-снимок глаза с идеальными пучками (желательно ваш глаз) или вы в стильной униформе с лампой-лупой.",
    bio: "Шапка профиля: 'Делаю взгляд на миллион без эффекта куклы. Архитектура + долговременная укладка. 📍 Центр'",
    reels: [
      "Ракурс сверху — процесс наращивания: от 'лысого' века до лисьего взгляда. Хук: 'Всего 1 час и вы готовы собирать взгляды.'",
      "Боли клиента: 'Что бывает, когда мастер экономит на материалах?'",
    ]
  },
  nails: {
    avatar: "Поставьте стильное фото своих рук с самым трендовым маникюром (или портрет в белом эстетичном халате).",
    bio: "Шапка профиля: 'Пилю не только ногти, но и настроение. Гелевое укрепление 'Носибельность 4+ недели'. Запись ТУТ ⬇️'",
    reels: [
      "Дизайн: макро-съемка покрытия French или градиента под биты.",
      "Разговорный: 'Почему покрытие трескается на 3-й день?' (Решение проблемы через твою экспертность)."
    ]
  }
};

export const StrategyTab = () => {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '0 2rem 2rem 2rem', marginTop: '-2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}
    >
      <div className="glass-card">
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>Выбор специализации</h2>
        <p style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>
          Прежде чем генерировать план, нам нужно понять твою экспертизу. Выбери нишу, чтобы получить конкретные рекомендации и сценарии.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {niches.map((niche) => (
            <button
              key={niche.id}
              onClick={() => setSelectedNiche(niche.id)}
              style={{
                background: selectedNiche === niche.id ? 'var(--text-heading)' : 'white',
                color: selectedNiche === niche.id ? 'white' : 'var(--text-main)',
                border: selectedNiche === niche.id ? '2px solid var(--text-heading)' : '2px solid transparent',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ color: selectedNiche === niche.id ? '#ec4899' : '#8b5cf6' }}>
                {niche.icon}
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '1.1rem' }}>{niche.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedNiche && (
            <motion.div
              key={selectedNiche}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111827' }}>Твоя персональная стратегия</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* Avatar & Bio Advice */}
                  <div style={{ background: '#fdf2f8', padding: '1.5rem', borderRadius: '16px' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#db2777' }}>
                      <CheckCircle size={20} /> Шапка и Аватар
                    </h4>
                    <p style={{ marginBottom: '1rem', color: '#374151', lineHeight: 1.6 }}><strong>Про аватарку:</strong> <br/> {recommendations[selectedNiche].avatar}</p>
                    <p style={{ color: '#374151', lineHeight: 1.6 }}><strong>Хук для Био:</strong> <br/> {recommendations[selectedNiche].bio}</p>
                  </div>

                  {/* Reels Scenarios */}
                  <div style={{ background: '#f5f3ff', padding: '1.5rem', borderRadius: '16px' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#8b5cf6' }}>
                      <Video size={20} /> Сценарии для Reels
                    </h4>
                    <ul style={{ paddingLeft: '1.5rem', color: '#374151', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {recommendations[selectedNiche].reels.map((reel: string, idx: number) => (
                        <li key={idx}>{reel}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};
