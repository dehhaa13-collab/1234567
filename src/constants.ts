export interface UserProfile {
  name: string;
  niche: string;
  experience: string;
  problem: string;
}

export const NICHE_LABELS: Record<string, string> = {
  hair: 'волосы (стилист)',
  permanent: 'перманентный макияж',
  lashes: 'ресницы/брови',
  nails: 'ногти (нейл-мастер)',
};
