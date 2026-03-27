import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { AnalysisTab } from '../components/AnalysisTab';
import { ContentPlanTab } from '../components/ContentPlanTab';
import type { UserProfile } from '../App';

interface HomeProps {
  userProfile: UserProfile | null;
}

export const Home = ({ userProfile }: HomeProps) => {
  const [activeTab, setActiveTab] = useState('analysis');

  return (
    <div className="app-container" style={{ padding: '0 2rem 2rem 2rem', marginTop: '-2rem' }}>
      <HeroSection />

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="tabs-container">
          <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>
            <BarChart3 size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Анализ профиля (Ремонт)
          </button>
          <button className={`tab-btn ${activeTab === 'plan' ? 'active' : ''}`} onClick={() => setActiveTab('plan')}>
            Контент-план
          </button>
          <button className={`tab-btn ${activeTab === 'ideas' ? 'active' : ''}`} onClick={() => setActiveTab('ideas')}>
            Генерация Рилс
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'analysis' && <AnalysisTab key="analysis" userProfile={userProfile} />}

          {activeTab === 'plan' && <ContentPlanTab key="plan" userProfile={userProfile} />}
          
          {activeTab === 'ideas' && (
            <motion.div key="ideas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem 0' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Генерация Рилс</h2>
              <p style={{ color: '#6b7280' }}>Раздел в разработке. ИИ автоматически смонтирует ваши эстетичные исходники в готовые Reels по сценариям из Контент-плана.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
