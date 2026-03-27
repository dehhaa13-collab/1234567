import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { useState } from 'react';

export type StageType = 'analysis' | 'strategy';

export const App = () => {
  const [stage, setStage] = useState<StageType>('analysis');

  return (
    <MainLayout stage={stage} setStage={setStage}>
      <Home stage={stage} setStage={setStage} />
    </MainLayout>
  );
};

export default App;
