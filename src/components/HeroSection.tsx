import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span style={{ backgroundColor: '#fdf2f8', color: '#db2777', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Inter' }}>
          Платформа для продвинутых бьюти-мастеров
        </span>
        <h1 style={{ fontSize: '3.5rem', marginTop: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Автоматизируй свой Instagram. <br />
          <span className="text-gradient">Создавай контент с помощью ИИ.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
          Всё, что нужно для бьюти: от анализа профиля до умного контент-плана рилсов, чтобы привлекать больше клиентов из соцсетей.
        </p>
        <div style={{ display: 'inline-block', padding: '1rem 1.5rem', background: 'rgba(236,72,153,0.05)', borderRadius: '16px', border: '1px solid rgba(236,72,153,0.2)' }}>
          <p style={{ fontStyle: 'italic', color: '#db2777', fontSize: '1rem', margin: 0 }}>
            «Если ты SMM-бьюти, то твоя страница должна конвертировать 24/7.»
          </p>
        </div>
      </motion.div>
    </section>
  );
};
