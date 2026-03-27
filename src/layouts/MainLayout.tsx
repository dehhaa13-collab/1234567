import type { ReactNode } from 'react';
import { Sparkles, ArrowRight, Activity } from 'lucide-react';
import type { StageType } from '../App';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
  stage: StageType;
  setStage: (stage: StageType) => void;
}

export const MainLayout = ({ children, stage, setStage }: MainLayoutProps) => {
  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="#ec4899" size={28} />
          <h1 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Outfit' }}>Content Factory</h1>
        </div>
        
        {/* Переключатель этапов (Top Right Corner Switcher) */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#fdf2f8', padding: '0.25rem', borderRadius: '99px', border: '1px solid rgba(236,72,153,0.2)' }}>
          <button 
            onClick={() => setStage('analysis')}
            style={{
              position: 'relative',
              padding: '0.5rem 1.25rem',
              borderRadius: '99px',
              fontFamily: 'Outfit',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: 'none',
              background: 'transparent',
              color: stage === 'analysis' ? '#fff' : '#4b5563',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {stage === 'analysis' && (
              <motion.div 
                layoutId="switcher-bg"
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', borderRadius: '99px', zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <Activity size={16} /> 1. Аудит
          </button>
          
          <button 
            onClick={() => setStage('strategy')}
            style={{
              position: 'relative',
              padding: '0.5rem 1.25rem',
              borderRadius: '99px',
              fontFamily: 'Outfit',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: 'none',
              background: 'transparent',
              color: stage === 'strategy' ? '#fff' : '#4b5563',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {stage === 'strategy' && (
              <motion.div 
                layoutId="switcher-bg"
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', borderRadius: '99px', zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <ArrowRight size={16} /> 2. Стратегия
          </button>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};
