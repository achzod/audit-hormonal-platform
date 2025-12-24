'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

const SECTIONS = [
  {
    id: 'general',
    title: 'INFORMATIONS GÉNÉRALES',
    icon: '📋',
    questions: [
      { id: 'age', label: 'Âge', type: 'number', required: true },
      { id: 'sexe', label: 'Sexe', type: 'select', options: ['Homme', 'Femme'], required: true },
      { id: 'poids', label: 'Poids (kg)', type: 'number', required: true },
      { id: 'taille', label: 'Taille (cm)', type: 'number', required: true },
      { id: 'objectif', label: 'Objectif principal', type: 'select', options: ['Prise de muscle', 'Perte de graisse', 'Performance', 'Santé générale'], required: true },
    ]
  },
  {
    id: 'testosterone',
    title: 'TESTOSTÉRONE & LIBIDO',
    icon: '💪',
    questions: [
      { id: 'libido', label: 'Niveau de libido', type: 'select', options: ['Très faible', 'Faible', 'Moyen', 'Élevé', 'Très élevé'], required: true },
      { id: 'energie_matin', label: 'Énergie au réveil', type: 'select', options: ['Épuisé', 'Fatigué', 'Moyen', 'Bon', 'Excellent'], required: true },
      { id: 'force_musculaire', label: 'Évolution force musculaire (6 derniers mois)', type: 'select', options: ['Baisse', 'Stagnation', 'Légère progression', 'Bonne progression'], required: true },
      { id: 'masse_musculaire', label: 'Évolution masse musculaire', type: 'select', options: ['Perte', 'Stagnation', 'Gain léger', 'Bon gain'], required: true },
      { id: 'recuperation', label: 'Qualité récupération post-training', type: 'select', options: ['Très mauvaise', 'Mauvaise', 'Moyenne', 'Bonne', 'Excellente'], required: true },
      { id: 'motivation', label: 'Motivation à l\'entraînement', type: 'select', options: ['Nulle', 'Faible', 'Moyenne', 'Forte', 'Très forte'], required: true },
    ]
  },
  {
    id: 'cortisol',
    title: 'CORTISOL & STRESS',
    icon: '⚡',
    questions: [
      { id: 'stress_level', label: 'Niveau de stress général', type: 'select', options: ['Très faible', 'Faible', 'Moyen', 'Élevé', 'Très élevé'], required: true },
      { id: 'energie_soir', label: 'Énergie en fin de journée', type: 'select', options: ['Épuisé', 'Fatigué', 'Normal', 'Énergique'], required: true },
      { id: 'sommeil_qualite', label: 'Qualité du sommeil', type: 'select', options: ['Très mauvaise', 'Mauvaise', 'Moyenne', 'Bonne', 'Excellente'], required: true },
      { id: 'reveil_nuit', label: 'Réveils nocturnes', type: 'select', options: ['Jamais', 'Rarement (1-2/mois)', 'Parfois (1-2/semaine)', 'Souvent (3+/semaine)'], required: true },
      { id: 'difficulte_endormissement', label: 'Difficulté à t\'endormir', type: 'select', options: ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours'], required: true },
      { id: 'irritabilite', label: 'Irritabilité / Anxiété', type: 'select', options: ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours'], required: true },
    ]
  },
  {
    id: 'insuline',
    title: 'INSULINE & GLUCIDES',
    icon: '🍽️',
    questions: [
      { id: 'faim_apres_glucides', label: 'Faim après repas riche en glucides', type: 'select', options: ['Rassasié longtemps', 'Rassasié 2-3h', 'Faim rapidement', 'Faim intense rapidement'], required: true },
      { id: 'energie_apres_glucides', label: 'Énergie après repas glucidiques', type: 'select', options: ['Coup de barre', 'Fatigue légère', 'Stable', 'Énergique'], required: true },
      { id: 'stockage_abdominal', label: 'Tendance stockage abdominal', type: 'select', options: ['Aucune', 'Légère', 'Modérée', 'Importante'], required: true },
      { id: 'envies_sucre', label: 'Envies de sucre dans la journée', type: 'select', options: ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours'], required: true },
      { id: 'fullness_musculaire', label: 'Fullness musculaire après glucides', type: 'select', options: ['Aucun', 'Faible', 'Moyen', 'Bon', 'Excellent'], required: true },
    ]
  },
  {
    id: 'appetit',
    title: 'LEPTINE & APPÉTIT',
    icon: '🎯',
    questions: [
      { id: 'faim_generale', label: 'Niveau de faim général', type: 'select', options: ['Jamais faim', 'Faim normale', 'Souvent faim', 'Faim constante'], required: true },
      { id: 'satiete', label: 'Sensation de satiété après repas', type: 'select', options: ['Jamais rassasié', 'Difficilement rassasié', 'Normalement rassasié', 'Facilement rassasié'], required: true },
      { id: 'regimes_passes', label: 'Régimes dans les 2 dernières années', type: 'select', options: ['Aucun', '1', '2-3', '4+'], required: true },
      { id: 'effet_yoyo', label: 'Reprise poids après régime', type: 'select', options: ['N/A - pas de régime', 'Non', 'Un peu', 'Beaucoup (effet yo-yo)'], required: true },
      { id: 'plateau_perte', label: 'Plateau perte de poids', type: 'select', options: ['N/A', 'Jamais', 'Rare', 'Fréquent'], required: true },
    ]
  },
  {
    id: 'thyroide',
    title: 'THYROÏDE & MÉTABOLISME',
    icon: '🔥',
    questions: [
      { id: 'sensibilite_froid', label: 'Sensibilité au froid', type: 'select', options: ['Aucune', 'Légère', 'Modérée', 'Importante'], required: true },
      { id: 'temperature_corporelle', label: 'Température corporelle perçue', type: 'select', options: ['Toujours froid', 'Souvent froid', 'Normal', 'Souvent chaud'], required: true },
      { id: 'perte_cheveux', label: 'Perte de cheveux', type: 'select', options: ['Aucune', 'Légère', 'Modérée', 'Importante'], required: true },
      { id: 'peau_seche', label: 'Peau sèche', type: 'select', options: ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours'], required: true },
      { id: 'metabolisme_lent', label: 'Sensation métabolisme lent', type: 'select', options: ['Non', 'Un peu', 'Oui', 'Très lent'], required: true },
    ]
  }
];

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const version = searchParams?.get('version') || 'gratuit';

  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const canGoNext = () => {
    const section = SECTIONS[currentSection];
    return section.questions.every(q => {
      if (!q.required) return true;
      const value = responses[q.id];
      return value !== undefined && value !== '' && value !== null;
    });
  };

  const handleNext = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/audits/hormonal/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version,
          responses,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (version === 'premium') {
          router.push(`/checkout?auditId=${data.auditId}&type=hormonal`);
        } else {
          router.push(`/audits/${data.auditId}`);
        }
      } else {
        alert('Erreur: ' + data.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Erreur lors de la soumission');
      setIsSubmitting(false);
    }
  };

  const section = SECTIONS[currentSection];
  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[rgba(141,255,224,0.2)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-audiowide text-xl">
              SCAN ANABOLIQUE
              <span className="ml-3 text-sm text-[#8DFFE0]">
                {version === 'premium' ? 'PREMIUM' : 'GRATUIT'}
              </span>
            </h1>
            <span className="font-ibm-mono text-sm text-white/60">
              {currentSection + 1} / {SECTIONS.length}
            </span>
          </div>
          <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#8DFFE0] to-[#9990EA]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-12">
          {SECTIONS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center">
              <motion.div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                i < currentSection ? 'bg-gradient-to-r from-[#8DFFE0] to-[#9990EA] border-transparent' :
                i === currentSection ? 'border-[#8DFFE0] text-[#8DFFE0]' : 'border-[rgba(255,255,255,0.2)] text-white/40'
              }`} whileHover={{ scale: 1.1 }}>
                {i < currentSection ? <Check className="w-6 h-6" /> : s.icon}
              </motion.div>
              <p className="mt-2 text-xs font-ibm-mono text-white/60 hidden md:block text-center max-w-[80px]">
                {s.title.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>

        <motion.div key={currentSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{section.icon}</div>
              <div>
                <h2 className="font-audiowide text-3xl mb-2">{section.title}</h2>
                <p className="text-white/60 font-ibm-mono text-sm">Section {currentSection + 1}/{SECTIONS.length}</p>
              </div>
            </div>

            <div className="space-y-6">
              {section.questions.map((question) => (
                <div key={question.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(141,255,224,0.1)] rounded-2xl p-6">
                  <label className="block mb-4">
                    <span className="text-lg font-medium">
                      {question.label}
                      {question.required && <span className="text-[#9990EA] ml-1">*</span>}
                    </span>
                  </label>

                  {question.type === 'number' && (
                    <input type="number" value={responses[question.id] || ''} onChange={(e) => handleInputChange(question.id, e.target.value)} className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(141,255,224,0.2)] rounded-lg px-4 py-3 text-white focus:border-[#8DFFE0] focus:outline-none transition-all" />
                  )}

                  {question.type === 'select' && (
                    <div className="grid grid-cols-1 gap-3">
                      {question.options?.map((option) => (
                        <button key={option} onClick={() => handleInputChange(question.id, option)} className={`px-6 py-4 rounded-lg text-left transition-all ${
                          responses[question.id] === option ? 'bg-gradient-to-r from-[#8DFFE0] to-[#9990EA] text-[#101010] font-bold' : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(141,255,224,0.2)] hover:border-[#8DFFE0]'
                        }`}>
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between gap-4 mt-12">
          <button onClick={handlePrevious} disabled={currentSection === 0} className="flex items-center gap-2 px-6 py-3 border-2 border-[rgba(141,255,224,0.3)] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(141,255,224,0.1)] transition-all">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-audiowide text-sm">RETOUR</span>
          </button>

          {currentSection < SECTIONS.length - 1 ? (
            <button onClick={handleNext} disabled={!canGoNext()} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#8DFFE0] to-[#9990EA] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all text-[#101010] font-audiowide font-bold">
              <span>SUIVANT</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!canGoNext() || isSubmitting} className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9990EA] to-[#7B6FD6] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all text-white font-audiowide font-bold animate-neon-pulse">
              {isSubmitting ? <span>GÉNÉRATION...</span> : (
                <>
                  <Check className="w-5 h-5" />
                  <span>GÉNÉRER MON AUDIT</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#8DFFE0]" size={48} />
    </div>
  );
}

export default function QuestionnaireHormonalPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <QuestionnaireContent />
    </Suspense>
  );
}
