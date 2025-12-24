'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import { QUESTIONNAIRE_SECTIONS, QuestionnaireResponses } from '@/types/questionnaire';

export default function QuestionnairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const version = searchParams.get('version') || 'gratuit';

  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireResponses>({});
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const section = QUESTIONNAIRE_SECTIONS[currentSection];
  const progress = ((currentSection + 1) / QUESTIONNAIRE_SECTIONS.length) * 100;

  const handleChange = (questionId: string, value: string | number | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => {
      const newErrors = new Set(prev);
      newErrors.delete(questionId);
      return newErrors;
    });
  };

  const validateSection = () => {
    const newErrors = new Set<string>();
    section.questions.forEach((q) => {
      if (q.required && !responses[q.id]) {
        newErrors.add(q.id);
      }
    });
    setErrors(newErrors);
    return newErrors.size === 0;
  };

  const handleNext = () => {
    if (!validateSection()) {
      return;
    }

    if (currentSection < QUESTIONNAIRE_SECTIONS.length - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    localStorage.setItem('questionnaireResponses', JSON.stringify(responses));
    localStorage.setItem('auditVersion', version);

    if (version === 'premium') {
      router.push('/audit-complet/checkout');
    } else {
      router.push('/auth/register?returnUrl=/dashboard');
    }
  };

  const renderQuestion = (q: any) => {
    const hasError = errors.has(q.id);
    const value = responses[q.id];

    const inputClassName = `w-full px-4 py-3 bg-white/5 border ${
      hasError ? 'border-red-500' : 'border-white/10'
    } rounded-lg focus:outline-none focus:border-secondary transition-colors`;

    switch (q.type) {
      case 'text':
      case 'number':
        return (
          <input
            type={q.type}
            placeholder={q.placeholder}
            value={value || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
            min={q.min}
            max={q.max}
            step={q.step}
            className={inputClassName}
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={q.placeholder}
            value={value || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
            rows={4}
            className={inputClassName}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
            className={inputClassName}
          >
            <option value="">Sélectionne une option</option>
            {q.options?.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {q.options?.map((opt: string) => (
              <label
                key={opt}
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                  value === opt
                    ? 'bg-secondary/10 border-2 border-secondary'
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-5 h-5 accent-secondary"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {q.options?.map((opt: string) => (
              <label
                key={opt}
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-white/30 transition-all"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(opt)}
                  onChange={(e) => {
                    const current = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      handleChange(q.id, [...current, opt]);
                    } else {
                      handleChange(
                        q.id,
                        current.filter((v) => v !== opt)
                      );
                    }
                  }}
                  className="w-5 h-5 accent-secondary"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div>
            <input
              type="range"
              min={q.min}
              max={q.max}
              step={q.step || 1}
              value={value || q.min}
              onChange={(e) => handleChange(q.id, parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <div className="flex justify-between mt-2 text-sm text-white/60">
              <span>{q.min}</span>
              <span className="text-secondary font-bold text-lg">
                {value || q.min}
                {q.unit && ` ${q.unit}`}
              </span>
              <span>{q.max}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white py-12 px-6">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/audit-complet" className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft className="inline" size={20} /> Retour
          </Link>
          <div className="font-jakarta text-xl font-bold gradient-text">ACHZOD</div>
          <div className="text-white/60 text-sm">
            {version === 'premium' ? '🔥 Premium' : '✨ Gratuit'}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-white/60">
              Section {currentSection + 1} / {QUESTIONNAIRE_SECTIONS.length}
            </span>
            <span className="text-sm font-bold text-secondary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-brand"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {QUESTIONNAIRE_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(i)}
              disabled={i > currentSection}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                i === currentSection
                  ? 'bg-secondary/20 border-2 border-secondary text-secondary'
                  : i < currentSection
                  ? 'bg-white/5 border border-white/20 text-white/80'
                  : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {i < currentSection && <Check size={16} />}
              <span>{s.icon}</span>
              <span className="text-sm font-semibold">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl">{section.icon}</div>
              <div>
                <h2 className="font-jakarta text-3xl font-extrabold gradient-text">
                  {section.title}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  {section.questions.length} questions
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {section.questions.map((q) => (
                <div key={q.id}>
                  <label className="block mb-3">
                    <span className="text-lg font-semibold">
                      {q.question}
                      {q.required && <span className="text-red-400 ml-1">*</span>}
                    </span>
                  </label>
                  {renderQuestion(q)}
                  {errors.has(q.id) && (
                    <p className="text-red-400 text-sm mt-2">Ce champ est requis</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className={`btn-secondary flex items-center gap-2 ${
                currentSection === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft size={20} />
              Précédent
            </button>

            <button onClick={handleNext} className="btn-primary flex items-center gap-2">
              {currentSection === QUESTIONNAIRE_SECTIONS.length - 1 ? (
                <>
                  Terminer
                  <Check size={20} />
                </>
              ) : (
                <>
                  Suivant
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
