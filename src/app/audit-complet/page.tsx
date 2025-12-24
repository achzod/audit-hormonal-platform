'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import StatsSection from '@/components/StatsSection';

const testimonials = [
  {
    text: "L'audit a révélé une résistance à l'insuline que je ne soupçonnais pas. En 90 jours avec le protocole, -11kg et mes abdos sont visibles pour la première fois.",
    author: 'Karim R.',
    subtitle: '34 ans, -11kg en 90 jours',
  },
  {
    text: "Mon métabolisme était complètement ralenti après 3 ans de yo-yo. L'analyse a identifié mes erreurs. Maintenant je maintiens mon poids sans effort.",
    author: 'Laura M.',
    subtitle: '28 ans, -8kg maintenus depuis 6 mois',
  },
  {
    text: "Le diagnostic circadien a tout changé. J'ai compris pourquoi je stockais malgré mes efforts. Résultats en 3 semaines.",
    author: 'Thomas B.',
    subtitle: '41 ans, -6kg en 3 semaines',
  },
];

const faqs = [
  {
    q: 'Quelle est la différence entre gratuit et premium ?',
    a: "L'audit gratuit te donne un diagnostic de base (4 pages) avec ton score métabolique et les 3 premiers insights. L'audit premium (15 pages) débloque l'analyse complète des 47 points de données, ton profil hormonal détaillé, et surtout ta roadmap 90 jours personnalisée avec tous les protocoles nutrition/training/lifestyle. C'est la différence entre 'savoir où tu en es' et 'savoir exactement quoi faire étape par étape'.",
  },
  {
    q: 'Combien de temps prend le questionnaire ?',
    a: '5-7 minutes maximum. 40 questions organisées en 6 sections (Profil, Historique, Métabolisme, Hormonal, Lifestyle, Objectifs). Chaque question est rapide et les réponses sont guidées (sliders, sélection, etc.).',
  },
  {
    q: 'Quand vais-je recevoir mon audit ?',
    a: 'Version gratuite : sous 4 heures maximum. Version premium : immédiatement après paiement (génération en moins de 5 minutes). Tu reçois un email avec lien vers ton dashboard où l\'audit est accessible à vie.',
  },
  {
    q: "L'audit peut-il remplacer une prise de sang ?",
    a: "Non, l'audit analyse tes réponses et utilise l'IA pour estimer ton profil métabolique et hormonal. C'est très précis pour identifier des patterns et blocages, mais ce n'est pas un examen médical. Si ton audit révèle des signaux d'alerte, on te recommandera de faire des analyses sanguines pour confirmer.",
  },
  {
    q: 'Puis-je passer de gratuit à premium après ?',
    a: "Oui, absolument. Si tu commences avec l'audit gratuit, tu pourras upgrade vers premium à tout moment depuis ton dashboard pour 79€. Toutes tes données questionnaire sont conservées, on régénère juste la version complète.",
  },
  {
    q: 'Garantie satisfait ou remboursé ?',
    a: "Oui, 14 jours satisfait ou remboursé sur l'audit premium. Si l'analyse ne te convient pas, on te rembourse intégralement sans question.",
  },
];

const features = [
  {
    icon: '📊',
    title: 'Ton Profil Métabolique Exact',
    description: 'Score global sur 100 + analyse 12 marqueurs (efficacité énergétique, régulation insuline, sensibilité leptine, pattern cortisol, fonction thyroïdienne, etc.)',
  },
  {
    icon: '🎯',
    title: 'Tes Blocages Cachés',
    description: 'Identification précise des mécanismes qui sabotent tes résultats (résistance hormonale, désynchronisation circadienne, inflammation métabolique...)',
  },
  {
    icon: '🗺️',
    title: "Ton Plan d'Action 90 Jours",
    description: 'Roadmap phase par phase avec objectifs mesurables, protocoles nutrition/training adaptés, KPIs à tracker chaque semaine',
  },
];

export default function AuditCompletPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToComparison = () => {
    document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-dark-light via-dark to-dark" />
        <ParticlesBackground />

        <motion.div
          className="relative z-10 text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-jakarta text-5xl md:text-6xl font-extrabold mb-4 gradient-text tracking-tight">
            ACHZOD
          </h1>

          <p className="text-white/70 text-lg mb-16">
            Deviens la meilleure version de toi-même
          </p>

          <h2 className="font-jakarta text-4xl md:text-6xl font-extrabold mb-6 gradient-text uppercase tracking-tight">
            AUDIT MÉTABOLIQUE
            <br />
            COMPLET
          </h2>

          <p className="text-xl text-white/80 mb-12">
            Analyse ton métabolisme en 5 minutes • Rapport personnalisé complet
          </p>

          <motion.button
            onClick={scrollToComparison}
            className="btn-primary group inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Commencer mon audit
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </motion.button>
        </motion.div>

        <motion.div className="absolute bottom-10" style={{ opacity }}>
          <div className="w-6 h-10 border-2 border-secondary/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-secondary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Comparison Section */}
      <section id="comparison" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-jakarta text-4xl md:text-5xl font-extrabold text-center mb-16 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choisis Ta Version
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GRATUIT Card */}
            <motion.div
              className="glass rounded-3xl p-8 md:p-12 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute -top-4 right-6 bg-gradient-aqua text-dark px-6 py-2 rounded-full font-jakarta font-extrabold text-xs uppercase glow-aqua">
                LIMITÉ
              </div>

              <h3 className="font-jakarta text-3xl font-extrabold text-secondary mb-2">
                Audit Gratuit
              </h3>
              <p className="text-white/60 text-base mb-8">Diagnostic de base</p>

              <div className="font-jakarta text-6xl font-black gradient-text my-8">GRATUIT</div>

              <ul className="space-y-4 mb-8">
                {[
                  'Diagnostic 4 pages personnalisé',
                  'Score métabolique global /100',
                  '3 quick insights actionnables',
                  'Point de blocage principal identifié',
                  'Livraison sous 4 heures',
                  'Accès dashboard basique',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <Check className="text-secondary flex-shrink-0 mt-1" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/audit-complet/questionnaire?version=gratuit" className="block">
                <button className="btn-secondary w-full">Commencer Gratuitement</button>
              </Link>
            </motion.div>

            {/* PREMIUM Card */}
            <motion.div
              className="glass-purple rounded-3xl p-8 md:p-12 relative pulse-border"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute -top-4 right-6 bg-gradient-purple text-white px-6 py-2 rounded-full font-jakarta font-extrabold text-xs uppercase glow-purple animate-pulse-slow">
                RECOMMANDÉ
              </div>

              <h3 className="font-jakarta text-3xl font-extrabold text-primary mb-2">
                Audit Premium
              </h3>
              <p className="text-white/60 text-base mb-8">Analyse complète 360°</p>

              <div className="mb-4">
                <div className="text-white/40 line-through text-2xl font-semibold">147€</div>
                <div className="font-jakarta text-6xl font-black gradient-text-purple">79€</div>
                <div className="inline-block bg-primary/15 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase mt-3">
                  PRIX DE LANCEMENT
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Analyse complète 15 pages',
                  '47 points de données croisés',
                  'Profil métabolique 12 marqueurs',
                  'Analyse biomécanique complète',
                  'Profil hormonal détaillé',
                  'Roadmap personnalisée 90 jours',
                  'Protocoles nutrition + training sur-mesure',
                  'Optimisation lifestyle & supplémentation',
                  'Accès dashboard premium illimité',
                  'Livraison immédiate (< 5min)',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/audit-complet/questionnaire?version=premium" className="block">
                <button className="btn-purple w-full">Accéder Maintenant - 79€</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-dark-light/50 to-dark">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-jakarta text-4xl md:text-5xl font-extrabold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ce Que Tu Vas Découvrir
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="font-jakarta text-xl font-bold mb-4 gradient-text">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-jakarta text-4xl md:text-5xl font-extrabold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ils Ont Transformé Leur Métabolisme
          </motion.h2>

          <div className="relative h-96 flex items-center justify-center">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className={`glass rounded-3xl p-10 max-w-3xl ${
                  i === currentTestimonial ? 'block' : 'hidden'
                }`}
                initial={{ opacity: 0, x: 100 }}
                animate={i === currentTestimonial ? { opacity: 1, x: 0 } : {}}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl text-secondary mb-6">"</div>
                <p className="text-lg italic leading-relaxed mb-8 text-white/90">
                  {testimonial.text}
                </p>
                <div>
                  <div className="font-jakarta text-lg font-bold">{testimonial.author}</div>
                  <div className="text-white/60 text-sm">{testimonial.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentTestimonial ? 'bg-secondary w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-jakarta text-4xl md:text-5xl font-extrabold text-center mb-16 gradient-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Questions Fréquentes
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-jakarta font-bold text-lg">{faq.q}</span>
                  <span className="text-2xl text-secondary">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-white/80 leading-relaxed">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 border-t border-b border-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-jakarta text-4xl md:text-5xl font-extrabold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Prêt À Débloquer Ton Métabolisme ?
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Rejoins les 5000+ personnes qui ont transformé leur corps avec une approche
            scientifique.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/audit-complet/questionnaire?version=gratuit">
              <button className="btn-secondary px-12">Commencer Gratuitement</button>
            </Link>
            <Link href="/audit-complet/questionnaire?version=premium">
              <button className="btn-purple px-12">Accéder Au Premium - 79€</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="font-jakarta text-3xl font-extrabold gradient-text mb-4">
                ACHZOD
              </div>
              <p className="text-white/60 mb-6">
                Deviens la meilleure version de toi-même
              </p>
              <div className="flex gap-4">
                {['Instagram', 'YouTube', 'TikTok'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-white/60 hover:text-secondary transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-jakarta font-bold mb-4">Produits</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link href="/audit-complet" className="hover:text-white transition-colors">
                    Audit Métabolique
                  </Link>
                </li>
                <li>Coaching</li>
                <li>Ebooks</li>
              </ul>

              <h3 className="font-jakarta font-bold mt-6 mb-4">Entreprise</h3>
              <ul className="space-y-2 text-white/60">
                <li>À propos</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="font-jakarta font-bold mb-4">Reste Dans Le Lab</h3>
              <p className="text-white/60 text-sm mb-4">
                Reçois analyses, protocoles et offres en avant-première
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="ton@email.com"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary"
                />
                <button className="btn-primary px-6 py-2">S'inscrire</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            <p>© 2025 AchzodCoaching • 11 Certifications Internationales</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-white transition-colors">
                CGV
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Politique confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

