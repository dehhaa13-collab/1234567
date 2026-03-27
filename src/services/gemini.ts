const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiResponse {
  success: boolean;
  text: string;
  error?: string;
}

export async function askGemini(prompt: string): Promise<GeminiResponse> {
  if (!API_KEY) {
    return {
      success: false,
      text: '',
      error: 'API-ключ не настроен. Добавьте VITE_GOOGLE_API_KEY в файл .env'
    };
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 4096,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `HTTP ${response.status}`;
      return {
        success: false,
        text: '',
        error: `Ошибка API Google: ${errorMessage}`
      };
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return {
        success: false,
        text: '',
        error: 'ИИ вернул пустой ответ. Попробуйте ещё раз.'
      };
    }

    return { success: true, text };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
    return {
      success: false,
      text: '',
      error: `Не удалось связаться с ИИ: ${message}`
    };
  }
}
