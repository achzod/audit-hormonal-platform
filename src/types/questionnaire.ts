export interface QuestionnaireSection {
  id: string;
  title: string;
  icon: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'slider' | 'textarea';
  question: string;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required?: boolean;
}

export interface QuestionnaireResponses {
  [key: string]: string | number | string[];
}

// 40 questions réparties en 6 sections
export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  {
    id: 'profil',
    title: 'Profil',
    icon: '👤',
    questions: [
      { id: 'prenom', type: 'text', question: 'Prénom', required: true },
      { id: 'nom', type: 'text', question: 'Nom', required: true },
      { id: 'age', type: 'number', question: 'Âge', min: 18, max: 100, required: true },
      { id: 'sexe', type: 'radio', question: 'Sexe', options: ['Homme', 'Femme'], required: true },
      { id: 'poids', type: 'number', question: 'Poids actuel (kg)', min: 30, max: 200, step: 0.1, required: true },
      { id: 'taille', type: 'number', question: 'Taille (cm)', min: 120, max: 220, required: true },
      { id: 'tour_taille', type: 'number', question: 'Tour de taille (cm)', min: 50, max: 200, required: false },
    ],
  },
  {
    id: 'historique',
    title: 'Historique',
    icon: '📋',
    questions: [
      { id: 'poids_objectif', type: 'number', question: 'Poids objectif (kg)', min: 30, max: 200, step: 0.1, required: true },
      { id: 'variation_poids_12mois', type: 'select', question: 'Variation de poids derniers 12 mois', options: ['Stable (-2kg à +2kg)', 'Perte légère (-2 à -5kg)', 'Perte importante (> -5kg)', 'Prise légère (+2 à +5kg)', 'Prise importante (> +5kg)', 'Yo-yo constant'], required: true },
      { id: 'transformations_passees', type: 'radio', question: 'As-tu déjà fait une vraie transformation ?', options: ['Oui', 'Non'], required: true },
      { id: 'blessures', type: 'textarea', question: 'Blessures actuelles ou récentes (genou, dos, épaule...)', placeholder: 'Décris tes blessures ou écris "Aucune"', required: false },
      { id: 'pathologies', type: 'textarea', question: 'Pathologies ou traitements médicaux', placeholder: 'Diabète, hypertension, hypothyroïdie... ou "Aucun"', required: false },
      { id: 'prises_sang', type: 'radio', question: 'As-tu fait une prise de sang récente (< 6 mois) ?', options: ['Oui', 'Non'], required: true },
    ],
  },
  {
    id: 'metabolisme',
    title: 'Métabolisme',
    icon: '🔥',
    questions: [
      { id: 'repas_par_jour', type: 'select', question: 'Nombre de repas par jour', options: ['1 repas', '2 repas', '3 repas', '4+ repas'], required: true },
      { id: 'collations', type: 'select', question: 'Collations quotidiennes', options: ['Aucune', '1 collation', '2 collations', '3+ collations'], required: true },
      { id: 'jeune_intermittent', type: 'radio', question: 'Pratiques-tu le jeûne intermittent ?', options: ['Oui régulièrement', 'Parfois', 'Non jamais'], required: true },
      { id: 'calcul_macros', type: 'radio', question: 'Calcules-tu tes macros / calories ?', options: ['Oui toujours', 'Parfois', 'Non jamais'], required: true },
      { id: 'sensations_faim', type: 'slider', question: 'Comment décris-tu tes sensations de faim ?', min: 1, max: 10, unit: '/10 (1=inexistantes, 10=constantes)', required: true },
      { id: 'fast_food', type: 'select', question: 'Fast-food / restaurants par semaine', options: ['Jamais', '1-2 fois', '3-4 fois', '5+ fois'], required: true },
      { id: 'alcool', type: 'select', question: 'Consommation d\'alcool par semaine', options: ['Jamais', '1-2 verres', '3-5 verres', '6+ verres'], required: true },
      { id: 'cafes', type: 'number', question: 'Cafés par jour', min: 0, max: 10, required: true },
    ],
  },
  {
    id: 'hormonal',
    title: 'Hormonal',
    icon: '⚡',
    questions: [
      { id: 'stress_niveau', type: 'slider', question: 'Niveau de stress au quotidien', min: 1, max: 10, unit: '/10', required: true },
      { id: 'sommeil_heures', type: 'number', question: 'Heures de sommeil par nuit', min: 3, max: 12, step: 0.5, required: true },
      { id: 'sommeil_qualite', type: 'slider', question: 'Qualité du sommeil', min: 1, max: 10, unit: '/10', required: true },
      { id: 'reveils_nocturnes', type: 'radio', question: 'Réveils nocturnes fréquents ?', options: ['Oui souvent', 'Parfois', 'Rarement'], required: true },
      { id: 'energie_matin', type: 'slider', question: 'Niveau d\'énergie au réveil', min: 1, max: 10, unit: '/10', required: true },
      { id: 'coups_barre', type: 'select', question: 'Coups de barre dans la journée', options: ['Jamais', '1 fois (après-midi)', '2+ fois', 'Fatigue constante'], required: true },
      { id: 'libido', type: 'slider', question: 'Niveau de libido', min: 1, max: 10, unit: '/10', required: true },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    icon: '🏃',
    questions: [
      { id: 'activite_pro', type: 'select', question: 'Type d\'activité professionnelle', options: ['Bureau sédentaire', 'Mixte (bureau + déplacements)', 'Physique modérée', 'Physique intense'], required: true },
      { id: 'entrainement_frequence', type: 'select', question: 'Fréquence d\'entraînement par semaine', options: ['0 séance', '1-2 séances', '3-4 séances', '5+ séances'], required: true },
      { id: 'entrainement_type', type: 'checkbox', question: 'Types d\'entraînement pratiqués', options: ['Musculation', 'Cardio', 'HIIT', 'CrossFit', 'Course', 'Natation', 'Sport collectif', 'Yoga / Pilates'], required: false },
      { id: 'cardio_duree', type: 'select', question: 'Durée moyenne cardio par session', options: ['0 min', '10-20 min', '20-40 min', '40+ min'], required: true },
      { id: 'supplements', type: 'textarea', question: 'Suppléments actuels', placeholder: 'Protéine whey, créatine, vitamine D... ou "Aucun"', required: false },
      { id: 'tabac', type: 'radio', question: 'Tabac', options: ['Oui', 'Non', 'Ex-fumeur'], required: true },
    ],
  },
  {
    id: 'objectifs',
    title: 'Objectifs',
    icon: '🎯',
    questions: [
      { id: 'objectif_principal', type: 'select', question: 'Objectif principal', options: ['Perdre du gras', 'Prendre du muscle', 'Recomposition (gras + muscle)', 'Performance sportive', 'Santé / bien-être'], required: true },
      { id: 'delai_objectif', type: 'select', question: 'Dans quel délai ?', options: ['1-3 mois', '3-6 mois', '6-12 mois', 'Pas de deadline'], required: true },
      { id: 'motivation_niveau', type: 'slider', question: 'Niveau de motivation', min: 1, max: 10, unit: '/10', required: true },
      { id: 'engagement', type: 'slider', question: 'Prêt(e) à suivre des consignes strictes ?', min: 1, max: 10, unit: '/10', required: true },
      { id: 'blocages_actuels', type: 'textarea', question: 'Quels sont tes plus gros blocages aujourd\'hui ?', placeholder: 'Stagnation, manque d\'énergie, résultats décevants...', required: true },
      { id: 'objectif_perso', type: 'textarea', question: 'Qui veux-tu impressionner avec ta transformation ?', placeholder: 'Toi-même, ton/ta partenaire, tes collègues...', required: true },
    ],
  },
];

