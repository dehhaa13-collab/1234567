import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';

export type StageType = 'analysis' | 'strategy';
export type AppState = 'onboarding' | 'dashboard';

export const App = () => {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [stage, setStage] = useState<StageType>('analysis');

  if (appState === 'onboarding') {
    return <Onboarding onComplete={() => setAppState('dashboard')} />;
  }

  return (
    <MainLayout stage={stage} setStage={setStage}>
      <Home stage={stage} setStage={setStage} />
    </MainLayout>
  );
};

export default App;
