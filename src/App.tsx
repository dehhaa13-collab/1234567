import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Game } from './components/Game';

export const App: React.FC = () => {
  const [userScore, setUserScore] = useState(0);

  return (
    <div className="app-container">
      {/* Background Orbs */}
      <div className="background-system">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <motion.div 
        className="glass-panel"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.h1 
            className="text-gradient"
            style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 900 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Квантовый Улов
          </motion.h1>
          <motion.p 
            style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Проверьте свою реакцию в идеальном стеклянном интерфейсе.
          </motion.p>
        </div>

        <Game onScoreUpdate={setUserScore} />

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <p>Счет: {userScore}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
