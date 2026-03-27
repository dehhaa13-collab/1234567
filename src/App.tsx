import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';

export type AppState = 'onboarding' | 'dashboard';

export interface UserProfile {
  name: string;
  niche: string;
  experience: string;
  problem: string;
}

export const App = () => {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  if (appState === 'onboarding') {
    return <Onboarding onComplete={(profile) => {
      setUserProfile(profile);
      setAppState('dashboard');
    }} />;
  }

  return (
    <MainLayout>
      <Home userProfile={userProfile} />
    </MainLayout>
  );
};

export default App;
