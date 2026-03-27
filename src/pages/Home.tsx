import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ListChecks, Wand2, Sparkles } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { AnalysisTab } from '../components/AnalysisTab';
import { ContentPlanTab } from '../components/ContentPlanTab';
import { ReelsGeneratorTab } from '../components/ReelsGeneratorTab';
import type { UserProfile } from '../App';

interface HomeProps {
  userProfile: UserProfile | null;
}

export const Home = ({ userProfile }: HomeProps) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'plan' | 'reels'>('analysis');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const performTransition = (nextTab: 'analysis' | 'plan' | 'reels') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(nextTab);
      // Wait a moment for the content to render before the wipe finishes
    }, 1000);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  return (
    <div className="app-container" style={{ padding: '0 2rem 2rem 2rem', marginTop: '-2rem' }}>
      
      {/* Full Screen Transition Wipe */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ left: '-100vw' }}
            animate={{ left: 0 }}
            exit={{ left: '100vw' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <Sparkles color="white" size={80} style={{ animation: 'pulse 1.5s infinite' }} />
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontFamily: 'Outfit' }}>
              Готовим следующий этап...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection />

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="tabs-container">
          <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => performTransition('analysis')}>
            <Search size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 1: Ремонт профиля
          </button>
          <button className={`tab-btn ${activeTab === 'plan' ? 'active' : ''}`} onClick={() => performTransition('plan')}>
            <ListChecks size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 2: Контент-план
          </button>
          <button className={`tab-btn ${activeTab === 'reels' ? 'active' : ''}`} onClick={() => performTransition('reels')}>
            <Wand2 size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 3: ИИ-Монтажер
          </button>
        </div>

        <div style={{ position: 'relative', minHeight: '600px' }}>
          {!isTransitioning && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {activeTab === 'analysis' && <AnalysisTab userProfile={userProfile} onNext={() => performTransition('plan')} />}
              {activeTab === 'plan' && <ContentPlanTab userProfile={userProfile} onNext={() => performTransition('reels')} />}
              {activeTab === 'reels' && <ReelsGeneratorTab />}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
