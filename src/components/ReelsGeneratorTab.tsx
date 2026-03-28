import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Wand2, AlertTriangle } from 'lucide-react';

export const ReelsGeneratorTab = () => {
  const [step, setStep] = useState<'upload' | 'unavailable'>('upload');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    setFileName(file.name);
    setStep('unavailable');
  };

  const resetUpload = () => {
    setStep('upload');
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem 0' }}>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit', color: '#111827' }}>AI-Монтажер (Магия)</h2>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
          Загрузи сырое видео по сценарию — ИИ вырежет паузы, наложит субтитры, подберёт музыку и сделает обложку.
        </p>
      </div>

      <AnimatePresence mode="wait">

        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              background: 'white',
              border: '2px dashed #ec4899',
              borderRadius: '24px',
              padding: '4rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ background: '#fdf2f8', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <UploadCloud color="#db2777" size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'Outfit' }}>Загрузи сырое видео</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Тайминг до 3 минут. Формат MP4 или MOV.</p>
            <button className="btn-primary">
              <Wand2 size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Выбрать файл
            </button>
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleUpload(e.target.files[0]);
                }
              }}
            />
          </motion.div>
        )}

        {step === 'unavailable' && (
          <motion.div key="unavailable" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{
              background: '#fffbeb',
              padding: '2.5rem',
              borderRadius: '24px',
              border: '1px solid #fde68a',
              textAlign: 'center',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
            }}>
              <AlertTriangle color="#f59e0b" size={56} style={{ margin: '0 auto 1.5rem auto' }} />
              <h3 style={{ color: '#92400e', fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
                Функция в разработке
              </h3>

              {fileName && (
                <p style={{ color: '#92400e', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  Файл «{fileName}» загружен, но обработка пока недоступна.
                </p>
              )}

              <p style={{ color: '#78350f', lineHeight: 1.7, maxWidth: '550px', margin: '0 auto 1rem auto', fontSize: '1.05rem' }}>
                AI-монтаж видео требует подключения к серверу обработки видео (FFmpeg + GPU). На данный момент эта функция находится в активной разработке.
              </p>

              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid #fde68a',
                maxWidth: '450px',
                margin: '1.5rem auto',
                textAlign: 'left'
              }}>
                <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.75rem' }}>Что будет доступно:</strong>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#78350f', lineHeight: 2 }}>
                  <li>Автоматическая вырезка пауз и тишины</li>
                  <li>Генерация субтитров через Whisper AI</li>
                  <li>Подбор трендовых звуков</li>
                  <li>Создание обложки</li>
                </ul>
              </div>

              <button onClick={resetUpload} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                Вернуться назад
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};
