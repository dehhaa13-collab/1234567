import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { AnalysisTab } from '../components/AnalysisTab';
import { StrategyTab } from '../components/StrategyTab';
import type { StageType } from '../App';

interface HomeProps {
  stage: StageType;
  setStage: (stage: StageType) => void;
}

export const Home = ({ stage }: HomeProps) => {
  const [activeTab, setActiveTab] = useState('analysis');

  if (stage === 'strategy') {
    return <StrategyTab />;
  }

  // Stage 1: Analysis Flow
  return (
    <div className="app-container" style={{ padding: '0 2rem 2rem 2rem', marginTop: '-2rem' }}>
      <HeroSection />

      {/* Main SaaS App Interface */}
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Navigation Tabs (Inside Analysis Stage) */}
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'analysis' && <AnalysisTab key="analysis" />}

          {activeTab === 'plan' && (
            <motion.div key="plan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem 0' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Контент-план</h2>
              <p style={{ color: '#6b7280' }}>В этой вкладке ИИ генерирует календарный план на месяц вперед на основе вашего ремонта.</p>
            </motion.div>
          )}
          
          {activeTab === 'ideas' && (
            <motion.div key="ideas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem 0' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Генерация Рилс</h2>
              <p style={{ color: '#6b7280' }}>Раздел в разработке. Загрузите свои видео и получите смонтированный Reels, основанный на анализе профиля.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
