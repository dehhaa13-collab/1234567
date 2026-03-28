import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface SpinnerProps {
  title: string;
  subtitle: string;
}

export const Spinner = ({ title, subtitle }: SpinnerProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ textAlign: 'center', padding: '4rem 0' }}
  >
    <div className="spinner" />
    <p style={{ marginTop: '1.5rem', color: 'var(--text-heading)', fontWeight: 600, fontSize: '1.25rem' }}>
      {title}
    </p>
    <p style={{ color: '#db2777', marginTop: '0.5rem' }}>{subtitle}</p>
  </motion.div>
);

interface ErrorBlockProps {
  title: string;
  message: string;
  onRetry: () => void;
}

export const ErrorBlock = ({ title, message, onRetry }: ErrorBlockProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    style={{ padding: '2rem 0' }}
  >
    <div style={{
      background: '#fef2f2',
      padding: '2rem',
      borderRadius: '20px',
      border: '1px solid #fecaca',
      textAlign: 'center'
    }}>
      <XCircle color="#ef4444" size={48} style={{ margin: '0 auto 1rem auto' }} />
      <h3 style={{ color: '#991b1b', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
        {title}
      </h3>
      <p style={{ color: '#7f1d1d', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 2rem auto' }}>
        {message}
      </p>
      <button className="btn-primary" onClick={onRetry}>
        Попробовать ещё раз
      </button>
    </div>
  </motion.div>
);
