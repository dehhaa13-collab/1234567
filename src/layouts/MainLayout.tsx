import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="#ec4899" size={28} />
          <span style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Outfit', fontWeight: 700, color: 'var(--text-heading)' }}>Content Factory</span>
        </div>
        
        {/* Simple Login Button placed back without the Switcher */}
        <button style={{ background: 'transparent', border: '1px solid #111827', padding: '0.5rem 1.5rem', borderRadius: '99px', fontFamily: 'Outfit', fontWeight: 600, cursor: 'pointer' }}>
          Войти
        </button>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};
