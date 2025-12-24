'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '5000+', label: 'TRANSFORMATIONS RÉUSSIES', icon: '🏆' },
  { number: '98%', label: 'TAUX DE RÉUSSITE', icon: '⚡' },
  { number: '11', label: 'CERTIFICATIONS INTERNATIONALES', icon: '🎓' },
  { number: '14+', label: 'MÉDIAS RECOMMANDENT', icon: '📰' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StatsSection() {
  return (
    <section className="py-20 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 hover:border-secondary"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="font-jakarta text-4xl font-extrabold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-white/40 text-sm mt-12 font-medium"
          variants={itemVariants}
        >
          Recommandé par MarketWatch, Reuters, Yahoo Finance, Bloomberg & +10 médias
        </motion.p>
      </motion.div>
    </section>
  );
}

