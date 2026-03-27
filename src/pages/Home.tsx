import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, ListChecks, Wand2 } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { AnalysisTab } from '../components/AnalysisTab';
import { VisualAnalysisTab } from '../components/VisualAnalysisTab';
import { ContentPlanTab } from '../components/ContentPlanTab';
import { ReelsGeneratorTab } from '../components/ReelsGeneratorTab';
import type { UserProfile } from '../App';

interface HomeProps {
  userProfile: UserProfile | null;
}

export const Home = ({ userProfile }: HomeProps) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'visual' | 'plan' | 'reels'>('analysis');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Direct tab switch (no wipe animation) for clicking tabs
  const switchTab = (nextTab: 'analysis' | 'visual' | 'plan' | 'reels') => {
    if (nextTab === activeTab) return;
    setActiveTab(nextTab);
  };

  // The custom transition wipe (only for "next" buttons inside tabs)
  const performTransition = (nextTab: 'analysis' | 'visual' | 'plan' | 'reels') => {
    if (nextTab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(nextTab);
    }, 1000);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  return (
    <div className="app-container" style={{ padding: '0 2rem 2rem 2rem', marginTop: '-2rem' }}>
      
      {/* Full Screen Transition Wipe (e.g. Brush/Dryer swipe) */}
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
            {/* The user specifically wanted a dynamic element (brush/dryer). Using Wand as universal magic/brush item */}
            <motion.div 
               initial={{ rotate: -45, scale: 0.8 }} 
               animate={{ rotate: 15, scale: 1.2, x: 50 }} 
               transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Wand2 color="white" size={100} />
            </motion.div>
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontFamily: 'Outfit' }}>
              Перемещение на следующий этап...
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
          <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => switchTab('analysis')}>
            <Search size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 1: Шапка
          </button>
          <button className={`tab-btn ${activeTab === 'visual' ? 'active' : ''}`} onClick={() => switchTab('visual')}>
            <ImageIcon size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 2: Визуал
          </button>
          <button className={`tab-btn ${activeTab === 'plan' ? 'active' : ''}`} onClick={() => switchTab('plan')}>
            <ListChecks size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 3: Сценарии
          </button>
          <button className={`tab-btn ${activeTab === 'reels' ? 'active' : ''}`} onClick={() => switchTab('reels')}>
            <Wand2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Этап 4: Монтаж
          </button>
        </div>

        <div style={{ position: 'relative', minHeight: '600px' }}>
          {!isTransitioning && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {activeTab === 'analysis' && <AnalysisTab userProfile={userProfile} onNext={() => performTransition('visual')} />}
              {activeTab === 'visual' && <VisualAnalysisTab userProfile={userProfile} onNext={() => performTransition('plan')} />}
              {activeTab === 'plan' && <ContentPlanTab userProfile={userProfile} onNext={() => performTransition('reels')} />}
              {activeTab === 'reels' && <ReelsGeneratorTab />}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
