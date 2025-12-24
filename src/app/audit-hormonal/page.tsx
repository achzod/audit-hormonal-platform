'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  Zap,
  Target,
  Flame,
  TrendingUp,
  Droplet,
  Dumbbell,
  Apple,
  Beaker,
  Brain,
  BookOpen,
  ChevronDown,
  ShieldCheck,
  Cpu,
  Clock3,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function AuditHormonalPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; speed: number; size: number }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(16, 16, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.fillStyle = 'rgba(141, 255, 224, 0.3)';
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#101010] text-white overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />
      <div className="fixed inset-0 scanlines pointer-events-none" />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-10 md:pt-16">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#8DFFE0 1px, transparent 1px), linear-gradient(90deg, #8DFFE0 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,255,224,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(153,144,234,0.08),transparent_30%)]" />
        
        <header className="relative z-20 w-full max-w-6xl mx-auto mb-10 md:mb-16 flex items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#8DFFE0] to-[#9990EA] flex items-center justify-center shadow-[0_0_20px_rgba(141,255,224,0.4)]">
              <Cpu className="w-6 h-6 text-[#0a0a0a]" />
            </div>
            <div>
              <p className="font-ibm-mono text-[11px] uppercase text-[#8DFFE0] tracking-[2px]">Achzod // Biohacking Lab</p>
              <p className="text-white/70 text-sm">Scan Anabolique • Temps réel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(141,255,224,0.3)] bg-white/5">
              <Clock3 className="w-4 h-4 text-[#8DFFE0]" />
              <span className="font-ibm-mono text-xs text-white/80">ETA rapport : &lt; 4h</span>
            </div>
            <Link href="/auth/login" className="px-4 py-2 rounded-lg border border-[rgba(141,255,224,0.4)] text-sm font-ibm-mono hover:bg-white/10 transition">
              Connexion
            </Link>
            <Link href="/audit-hormonal/questionnaire?version=premium" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8DFFE0] to-[#6FE6CC] text-[#0a0a0a] font-audiowide text-sm uppercase shadow-[0_0_20px_rgba(141,255,224,0.5)] hover:scale-[1.02] transition">
              Lancer maintenant
            </Link>
          </div>
        </header>
        
        <motion.div className="relative z-10 text-center max-w-5xl px-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-audiowide text-5xl md:text-6xl font-bold mb-3 uppercase tracking-tight" style={{
            background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>ACHZOD</h1>
          
          <motion.p className="font-ibm-mono text-sm tracking-[2px] uppercase text-[#8DFFE0]/80 mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            OPTIMISATION HORMONALE • PERFORMANCE MAXIMALE
          </motion.p>
          
          <motion.h2 className="font-audiowide text-4xl md:text-6xl font-bold mb-6 uppercase" style={{
            background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
            SCAN ANABOLIQUE<br />COMPLET
          </motion.h2>
          
          <p className="font-audiowide text-xl md:text-2xl text-[#9990EA]/90 mb-12">
            ANALYSE TES AXES HORMONAUX EN 5 MINUTES
          </p>
          
          <motion.div className="my-12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
            <RadarChartPreview />
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <motion.button onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-12 sm:px-16 py-5 bg-gradient-to-r from-[#8DFFE0] to-[#6FE6CC] rounded-lg text-[#101010] font-audiowide font-bold text-sm sm:text-base uppercase tracking-wide border-none cursor-pointer" style={{
              boxShadow: `0 0 20px rgba(141,255,224,0.5), 0 0 40px rgba(141,255,224,0.3), 0 4px 20px rgba(0,0,0,0.5)`
            }} whileHover={{ scale: 1.05, boxShadow: `0 0 30px rgba(141,255,224,0.8), 0 0 60px rgba(141,255,224,0.5), 0 8px 30px rgba(0,0,0,0.6)` }} whileTap={{ scale: 0.98 }}>
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#101010]" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#101010]" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#101010]" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#101010]" />
              LANCER LE SCAN →
            </motion.button>
            <Link href="/audit-hormonal/questionnaire?version=gratuit">
              <motion.button className="px-12 sm:px-14 py-5 border-2 border-[#9990EA] text-[#9990EA] font-audiowide font-bold text-sm sm:text-base uppercase rounded-lg hover:bg-[#9990EA] hover:text-[#0a0a0a] transition" whileHover={{ scale: 1.04 }}>
                Version gratuite 4p
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-8 h-8 text-[#8DFFE0]/50" />
        </motion.div>

        <div className="relative z-10 mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl w-full px-2">
          {[
            { label: '5000+ profils référencés', tone: '#8DFFE0' },
            { label: 'ETA rapport < 4h', tone: '#9990EA' },
            { label: 'Corrélation 92% vs prise de sang', tone: '#8DFFE0' },
          ].map((chip, i) => (
            <motion.div key={chip.label} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-center text-center text-sm font-ibm-mono text-white/80" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
              <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: chip.tone }} />
              {chip.label}
            </motion.div>
          ))}
        </div>
      </section>

      <StatsSection />
      <ProcessSection />
      <HormoneAxesSection />
      <ComparisonSection />
      <DataTrustSection />
      <WhyOptimizeSection />
      <ForWhoSection />
      <ScienceSection />
      <TestimonialsMatrix />
      <FAQSection />
      <TerminalCTA />
      <Footer />
    </div>
  );
}

function RadarChartPreview() {
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" className="mx-auto">
      {[1, 2, 3, 4, 5].map((i) => (
        <polygon key={i} points="160,40 277,100 277,220 160,280 43,220 43,100" fill="none" stroke="rgba(141,255,224,0.1)" strokeWidth="1" style={{ transform: `scale(${i * 0.2})`, transformOrigin: '160px 160px' }} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line key={angle} x1="160" y1="160" x2={160 + 120 * Math.cos((angle - 90) * Math.PI / 180)} y2={160 + 120 * Math.sin((angle - 90) * Math.PI / 180)} stroke="rgba(141,255,224,0.2)" strokeWidth="1" />
      ))}
      <motion.polygon points="160,60 240,120 220,200 160,250 100,200 120,120" fill="url(#radarGradient)" fillOpacity="0.3" stroke="url(#radarStroke)" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 1 }} />
      <defs>
        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8DFFE0" />
          <stop offset="100%" stopColor="#9990EA" />
        </linearGradient>
        <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8DFFE0" />
          <stop offset="100%" stopColor="#9990EA" />
        </linearGradient>
      </defs>
      <text x="160" y="30" fill="#8DFFE0" fontSize="11" fontFamily="IBM Plex Mono" textAnchor="middle">TEST</text>
      <text x="280" y="110" fill="#8DFFE0" fontSize="11" fontFamily="IBM Plex Mono" textAnchor="start">CORT</text>
      <text x="280" y="230" fill="#8DFFE0" fontSize="11" fontFamily="IBM Plex Mono" textAnchor="start">INS</text>
      <text x="160" y="300" fill="#8DFFE0" fontSize="11" fontFamily="IBM Plex Mono" textAnchor="middle">LEPT</text>
      <text x="40" y="230" fill="#8DFFE0" fontSize="11" fontFamily="IBM Plex Mono" textAnchor="end">THY</text>
      <text x="40" y="110" fill="#8DFFE0" fontSize="11" fontFamily="IBM Plex Mono" textAnchor="end">GH</text>
    </svg>
  );
}

function StatsSection() {
  const stats = [
    { label: 'ANALYSES RÉALISÉES', value: '5000+', icon: Activity },
    { label: 'PRÉCISION ALGORITHMIQUE', value: '98%', icon: Target },
    { label: 'MARQUEURS HORMONAUX', value: '6', icon: Beaker },
    { label: 'TAUX OPTIMISATION', value: '94%', icon: TrendingUp },
  ];

  return (
    <section className="relative py-16 bg-[rgba(141,255,224,0.02)] border-t border-b border-[rgba(141,255,224,0.15)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div key={index} className="terminal-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#8DFFE0]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#9990EA]" />
              <stat.icon className="w-12 h-12 mb-4 text-[#8DFFE0]" />
              <p className="font-ibm-mono text-[10px] uppercase tracking-[1.5px] text-white/60 mb-2">{stat.label}</p>
              <p className="font-audiowide text-5xl bg-gradient-to-r from-[#8DFFE0] to-[#9990EA] bg-clip-text text-transparent">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { title: 'Questionnaire 5 min', desc: '35 questions ciblées lifestyle, symptômes, entraînement, sommeil.', icon: Clock3 },
    { title: 'IA Hormones', desc: 'Modèle Claude Sonnet 4.5 + base 5000 profils hormonaux réels.', icon: Cpu },
    { title: 'Rapport & actions', desc: 'Radar 6 axes, scores, protocole priorisé et supplémentation.', icon: ShieldCheck },
  ];

  return (
    <section className="relative py-20 bg-[#0b0b0b] border-t border-b border-[rgba(141,255,224,0.08)]">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,rgba(141,255,224,0.15),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(153,144,234,0.18),transparent_40%)]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.h2 className="font-audiowide text-3xl md:text-4xl uppercase text-center mb-14" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          PROCESSUS ULTRA RAPIDE
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.title} className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white/5 backdrop-blur" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#8DFFE0] via-[#9990EA] to-transparent" />
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8DFFE0] to-[#9990EA] flex items-center justify-center shadow-[0_0_25px_rgba(141,255,224,0.35)]">
                  <step.icon className="w-6 h-6 text-[#0b0b0b]" />
                </div>
                <h3 className="font-audiowide text-xl text-white">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.desc}</p>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="font-ibm-mono text-xs uppercase text-[#8DFFE0]/80">Step {i + 1}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HormoneAxesSection() {
  const axes = [
    { icon: Dumbbell, title: 'TESTOSTÉRONE TOTALE & LIBRE', description: 'Analyse ton niveau anabolique, libido, force musculaire, récupération. Identifie hypogonadisme, pic/creux circadiens, impact training.', metric: '12 indicateurs croisés', color: 'cyan' },
    { icon: Zap, title: 'PATTERN CORTISOL 24H', description: 'Détecte désynchronisation circadienne, stress chronique, catabolisme musculaire. Évalue pic matinal, plateau soir, impact sommeil.', metric: 'Pattern temporel analysé', color: 'purple' },
    { icon: Apple, title: 'SENSIBILITÉ INSULINE', description: 'Mesure résistance insuline, efficacité partitioning glucides, risque diabète type 2. Analyse réponse post-prandiale.', metric: 'HOMA-IR estimé', color: 'cyan' },
    { icon: Target, title: 'RÉGULATION APPÉTIT', description: 'Évalue résistance leptine, sensibilité ghreline, signaux satiété/faim. Identifie dérèglements post-régime, effet yo-yo.', metric: 'Ratio L/G calculé', color: 'purple' },
    { icon: Flame, title: 'FONCTION THYROÏDIENNE', description: 'Analyse métabolisme basal, conversion T4→T3, downregulation adaptive. Détecte hypothyroïdie subclinique, impact diète.', metric: 'Triade TSH/T3/T4', color: 'cyan' },
    { icon: TrendingUp, title: 'HORMONE DE CROISSANCE', description: 'Estime production GH nocturne, pulses diurnes, impact hypertrophie. Analyse qualité sommeil profond, timing training.', metric: 'Fenêtre anabolique', color: 'purple' },
  ];

  return (
    <section className="relative py-24 bg-[#101010]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 className="font-audiowide text-4xl md:text-5xl uppercase text-center mb-20" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          LES 6 AXES HORMONAUX ANALYSÉS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {axes.map((axe, index) => (
            <motion.div key={index} className="terminal-card group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ borderColor: axe.color === 'cyan' ? 'rgba(141,255,224,0.6)' : 'rgba(153,144,234,0.6)' }}>
              <div className={`w-16 h-16 mb-6 ${axe.color === 'cyan' ? 'text-[#8DFFE0]' : 'text-[#9990EA]'}`}>
                <axe.icon className="w-full h-full transition-transform group-hover:scale-110" />
              </div>
              <h3 className="font-audiowide text-xl mb-4 text-white">{axe.title}</h3>
              <p className="text-white/80 leading-relaxed mb-6 font-inter text-[15px]">{axe.description}</p>
              <p className="font-ibm-mono text-xs uppercase text-[#8DFFE0]/70 tracking-wider">{axe.metric}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="comparison" className="relative py-24 bg-gradient-to-b from-[#101010] to-[#0a0a0a]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(141,255,224,0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.h2 className="font-audiowide text-4xl md:text-5xl uppercase text-center mb-16" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          CHOISIS TON NIVEAU D'ANALYSE
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div className="bg-[#0a0a0a] border-2 border-[rgba(141,255,224,0.4)] rounded-3xl p-12 relative" style={{ boxShadow: '0 0 30px rgba(141,255,224,0.15)' }} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="font-ibm-mono text-sm text-[#8DFFE0] mb-6 border border-[#8DFFE0]/30 inline-block px-4 py-2 rounded">
              ┌─────────────────────────┐<br />
              │  SCAN BASIQUE  //  FREE │<br />
              └─────────────────────────┘
            </div>
            <h3 className="font-audiowide text-3xl text-[#8DFFE0] mb-6">Diagnostic Hormonal Gratuit</h3>
            <div className="mb-8">
              <p className="font-audiowide text-6xl text-[#8DFFE0] neon-cyan">GRATUIT</p>
            </div>
            <div className="space-y-3 mb-10 font-ibm-mono text-sm">
              {['Scan 4 pages personnalisé', 'Score anabolique global /100', 'Radar 6 axes hormonaux', '3 insights prioritaires', 'Livraison sous 4h', 'Dashboard basique'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8DFFE0] text-lg">✓</span>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            <Link href="/audit-hormonal/questionnaire?version=gratuit">
              <motion.button className="w-full py-4 border-2 border-[#8DFFE0] text-[#8DFFE0] font-audiowide text-base uppercase rounded-lg transition-all" whileHover={{ backgroundColor: '#8DFFE0', color: '#0a0a0a', boxShadow: '0 0 30px rgba(141,255,224,0.6)' }}>
                COMMENCER LE SCAN
              </motion.button>
            </Link>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-[rgba(141,255,224,0.05)] to-[rgba(153,144,234,0.05)] border-2 border-[#9990EA] rounded-3xl p-12 relative" style={{ boxShadow: '0 0 40px rgba(153,144,234,0.25)' }} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#9990EA] to-[#7B6FD6] px-6 py-2 rounded-full font-audiowide text-xs uppercase animate-neon-pulse">OPTIMAL</div>
            <div className="font-ibm-mono text-sm text-[#9990EA] mb-6 border border-[#9990EA]/30 inline-block px-4 py-2 rounded">
              ┌──────────────────────────────┐<br />
              │  SCAN PREMIUM  //  COMPLET  │<br />
              └──────────────────────────────┘
            </div>
            <h3 className="font-audiowide text-3xl text-[#9990EA] mb-6">Analyse Hormonale Complète</h3>
            <div className="mb-2">
              <span className="font-audiowide text-2xl text-white/50 line-through">79€</span>
            </div>
            <div className="mb-4">
              <p className="font-audiowide text-6xl bg-gradient-to-r from-[#9990EA] to-[#7B6FD6] bg-clip-text text-transparent neon-purple">29€</p>
            </div>
            <div className="mb-8 inline-block bg-[rgba(153,144,234,0.2)] border border-[#9990EA] px-4 py-1 rounded-full">
              <span className="font-ibm-mono text-xs uppercase text-[#9990EA]">EARLY ACCESS</span>
            </div>
            <div className="space-y-3 mb-10 font-ibm-mono text-sm">
              {['Analyse complète 10 pages', '6 axes hormonaux détaillés', 'Profil testostérone T/L', 'Pattern cortisol 24h', 'Résistance insuline HOMA-IR', 'Ratio leptine/ghreline', 'Fonction thyroïdienne T3/T4/TSH', 'Estimation GH nocturne', 'Protocole optimisation hormonale', 'Supplémentation ciblée', 'Dashboard premium illimité', 'Livraison immédiate'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#9990EA] text-lg">✓</span>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            <Link href="/audit-hormonal/questionnaire?version=premium">
              <motion.button className="w-full py-4 bg-gradient-to-r from-[#9990EA] to-[#7B6FD6] text-white font-audiowide text-base uppercase rounded-lg" style={{ boxShadow: '0 0 30px rgba(153,144,234,0.5)' }} whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(153,144,234,0.8)' }}>
                ACCÉDER MAINTENANT - 29€
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div className="mt-16 max-w-4xl mx-auto bg-[#0a0a0a] border-2 border-[rgba(141,255,224,0.3)] rounded-2xl p-8 font-ibm-mono" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center">
            <div className="text-[#8DFFE0] mb-4 text-sm">
              ┌────────────────────────────────────────┐<br />
              │  BUNDLE COMPLET  //  OPTIMAL           │<br />
              │  Audit Métabolique + Audit Hormonal   │<br />
              │                                        │<br />
              │  Prix séparés : 79€ + 29€ = 108€      │<br />
              │  Prix bundle : <span className="text-2xl font-audiowide">99€</span>                     │<br />
              │  <span className="text-[#9990EA]">ÉCONOMISE 9€</span>                          │<br />
              └────────────────────────────────────────┘
            </div>
            <Link href="/bundle">
              <motion.button className="mt-6 px-12 py-4 bg-gradient-to-r from-[#8DFFE0] via-[#9990EA] to-[#7B6FD6] text-[#0a0a0a] font-audiowide text-base uppercase rounded-lg" whileHover={{ scale: 1.05 }}>
                OBTENIR LE BUNDLE - 99€
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DataTrustSection() {
  const badges = [
    'Chiffrement AES-256',
    'RGPD // UE',
    'Serveurs sécurisés',
    'Zéro partage tiers',
  ];

  return (
    <section className="relative py-20 bg-[#0b0b0b] border-t border-b border-[rgba(141,255,224,0.08)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-ibm-mono text-xs uppercase text-[#8DFFE0]/80 mb-3">Sécurité & Fiabilité</p>
            <h3 className="font-audiowide text-3xl md:text-4xl text-white mb-4">Tes données sont blindées.</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Données chiffrées, stockées en Europe, accès restreint. Rapport livré puis purge programmée des données brutes côté IA. Tu gardes le contrôle total.
            </p>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span key={badge} className="px-4 py-2 rounded-full border border-[rgba(141,255,224,0.3)] text-xs font-ibm-mono text-white/80 bg-white/5">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div className="relative" initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[rgba(141,255,224,0.08)] to-[rgba(153,144,234,0.12)] border border-[rgba(141,255,224,0.18)] shadow-[0_0_40px_rgba(141,255,224,0.25)]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#8DFFE0]" />
                <p className="font-ibm-mono text-sm text-white/80">Audit de sécurité continu</p>
              </div>
              <div className="space-y-3 text-sm text-white/80 font-ibm-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8DFFE0] animate-neon-pulse" />
                  Logs chiffrés & rotation 30j
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9990EA] animate-neon-pulse" />
                  Accès restreint par rôle (staff only)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8DFFE0] animate-neon-pulse" />
                  Purge des entrées IA après livraison
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyOptimizeSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a]">
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-audiowide text-sm uppercase text-[#8DFFE0] tracking-[2px] mb-4">LA VÉRITÉ QUE PERSONNE NE TE DIT</p>
            <h2 className="font-audiowide text-4xl md:text-5xl mb-8 leading-tight">Tes Hormones Contrôlent <span className="text-[#8DFFE0]">TOUT</span></h2>
            <div className="space-y-6 text-white/80 leading-relaxed text-[17px]">
              <p>Ton métabolisme, ta force, ta libido, ton sommeil, ton stress, ta composition corporelle... Tout est régulé par tes axes hormonaux.</p>
              <p>La plupart des gens s'entraînent et mangent correctement mais ne progressent pas. Pourquoi ? Résistance à l'insuline. Cortisol chroniquement élevé. Testostérone dans les chaussettes. Leptine désensibilisée.</p>
              <p>Sans connaître tes niveaux hormonaux, tu navigues à l'aveugle. Tu peux avoir la discipline parfaite, si tes hormones travaillent contre toi, tu stagnes.</p>
              <p>Le Scan Anabolique identifie tes déséquilibres hormonaux cachés en 5 minutes. Sans prise de sang. Juste des questions précises analysées par IA entraînée sur 5000+ profils.</p>
            </div>
            <div className="mt-10 space-y-3 font-ibm-mono text-sm">
              {['Identifie résistance insuline avant diabète', 'Détecte désynchronisation cortisol', 'Estime testostérone sans prise de sang', 'Révèle downregulation thyroïdienne'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#8DFFE0] rounded-full animate-neon-pulse" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className="relative" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative w-full aspect-square bg-gradient-to-br from-[rgba(141,255,224,0.05)] to-[rgba(153,144,234,0.05)] rounded-3xl border border-[rgba(141,255,224,0.2)] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-64 h-64">
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div key={i} className="absolute w-12 h-12 bg-gradient-to-br from-[#8DFFE0] to-[#9990EA] rounded-full" style={{
                      top: '50%', left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px)`,
                      boxShadow: '0 0 20px rgba(141,255,224,0.5)'
                    }} animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#9990EA] to-[#7B6FD6] rounded-full" style={{ boxShadow: '0 0 40px rgba(153,144,234,0.8)' }} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ForWhoSection() {
  const profiles = [
    { emoji: '🏋️', title: 'Tu t\'entraînes mais stagnes', description: 'Force qui n\'augmente plus, récupération lente, sommeil moyen, libido en baisse. Tes hormones sont probablement le problème.' },
    { emoji: '🔄', title: 'Tu reprends après chaque régime', description: 'Métabolisme ralenti, résistance à la leptine, cortisol élevé. Le scan identifie pourquoi ton corps stocke par réflexe.' },
    { emoji: '🧬', title: 'Tu veux optimiser ta performance', description: 'Baseline hormonale complète pour tracker progressions, impact suppléments, efficacité protocoles. Data-driven optimization.' }
  ];

  return (
    <section className="relative py-24 bg-[rgba(255,255,255,0.01)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 className="font-audiowide text-4xl md:text-5xl uppercase text-center mb-16" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          LE SCAN EST POUR TOI SI...
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, i) => (
            <motion.div key={i} className="terminal-card text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="text-6xl mb-6">{profile.emoji}</div>
              <h3 className="font-audiowide text-xl mb-4 text-[#8DFFE0]">{profile.title}</h3>
              <p className="text-white/80 leading-relaxed">{profile.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { icon: Brain, title: 'Comment ça marche ?', content: 'L\'IA analyse 35 questions sur ton historique, lifestyle, symptômes, performances. Elle croise ces données avec une base de 5000+ profils hormonaux réels. L\'algorithme identifie des patterns invisibles à l\'œil nu et estime tes niveaux hormonaux avec 92% de corrélation vs prises de sang.' },
    { icon: Droplet, title: 'C\'est aussi précis qu\'une prise de sang ?', content: 'Non. C\'est une estimation algorithmique basée sur tes réponses. Précision : 85-92% selon l\'axe. Suffisant pour identifier des déséquilibres majeurs et orienter vers analyses sanguines si nécessaire. Avantage : immédiat, pas invasif, €29 vs €200+ en labo.' },
    { icon: Zap, title: 'Quelle est la différence vs audit métabolique ?', content: 'Audit métabolique = focus métabolisme global (énergie, digestion, composition corporelle). Audit hormonal = focus axes hormonaux spécifiques (T, cortisol, insuline, etc). Complémentaires. Bundle des 2 recommandé pour vision 360°.' },
    { icon: BookOpen, title: 'Données scientifiques sources ?', content: 'Algorithme entraîné sur : 5000+ profils hormonaux réels, 12 études peer-reviewed sur corrélations symptômes-hormones, base de données NHANES, guidelines endocrinologie clinique. Validation continue avec retours utilisateurs.' }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#101010] to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 className="font-audiowide text-4xl md:text-5xl uppercase text-center mb-16" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          MÉTHODOLOGIE SCIENTIFIQUE
        </motion.h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div key={i} className="border border-[rgba(141,255,224,0.2)] rounded-xl overflow-hidden bg-[rgba(255,255,255,0.02)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-[rgba(141,255,224,0.05)] transition-all">
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-[#8DFFE0]" />
                  <span className="font-audiowide text-lg">{item.title}</span>
                </div>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-[#8DFFE0]" />
                </motion.div>
              </button>
              <motion.div initial={false} animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="p-6 pt-0 text-white/80 leading-relaxed">{item.content}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsMatrix() {
  const testimonials = [
    { quote: 'Testostérone estimée basse. Prise de sang confirmée. Protocole supp → +40% en 3 mois.', name: 'Marc, 35 ans' },
    { quote: 'Pattern cortisol inversé détecté. Changé horaires training → récup × 2.', name: 'Lisa, 29 ans' },
    { quote: 'Résistance insuline identifiée. Timing glucides ajusté → -8kg sans cardio.', name: 'Thomas, 41 ans' },
    { quote: 'Scan révélé downregulation thyroïde. T3 confirmée. Traitement → énergie +300%.', name: 'Sarah, 33 ans' },
    { quote: 'Leptine désensibilisée post-régime. Protocole reverse diet → maintien poids facile.', name: 'Kevin, 27 ans' },
    { quote: 'GH estimée faible. Optimisé sommeil → hypertrophie relancée.', name: 'Alex, 38 ans' },
  ];

  return (
    <section className="relative py-24 bg-[#101010] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 className="font-audiowide text-4xl md:text-5xl uppercase text-center mb-16" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          RÉSULTATS UTILISATEURS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(141,255,224,0.1)] rounded-xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ borderColor: 'rgba(141,255,224,0.4)', y: -5 }}>
              <p className="text-white/90 mb-4 font-ibm-mono text-sm leading-relaxed">&quot;{testimonial.quote}&quot;</p>
              <p className="text-[#8DFFE0] font-audiowide text-xs">— {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'Combien de marqueurs hormonaux analysés ?', a: '6 axes principaux : Testostérone (T totale + libre), Cortisol (pattern 24h), Insuline (sensibilité + HOMA-IR), Leptine/Ghreline (ratio), Thyroïde (T3/T4/TSH estimés), GH (production nocturne). Chaque axe = 4-8 sous-marqueurs croisés.' },
    { q: 'Gratuit vs Premium : différences ?', a: 'Gratuit (4 pages) : scores globaux + radar 6 axes + 3 insights prioritaires. Premium (10 pages) : analyse détaillée de chaque axe + patterns temporels + protocoles optimisation + supplémentation ciblée + tracking dashboard.' },
    { q: 'Faut-il être à jeun ?', a: 'Non, c\'est un questionnaire, pas une prise de sang. Réponds honnêtement à tes symptômes/historique. L\'algo estime tes niveaux hormonaux basé sur tes réponses.' },
    { q: 'Puis-je comparer avec ma prise de sang ?', a: 'Oui, recommandé. Le scan te dit quels marqueurs analyser. Tu fais ta prise de sang → tu compares. Ça valide l\'estimation et permet tracking précis dans le temps.' },
    { q: 'Compatible avec TRT ou autre traitement hormonal ?', a: 'Oui. Utile pour baseline avant TRT, ou pour tracker évolution sous traitement. Attention : pas un substitut au suivi médical. Toujours consulter endocrinologue pour ajustements.' }
  ];

  return (
    <section className="relative py-24 bg-[rgba(255,255,255,0.01)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 className="font-audiowide text-4xl md:text-5xl uppercase text-center mb-16" style={{
          background: 'linear-gradient(135deg, #8DFFE0, #9990EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          FAQ TECHNIQUE
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border border-[rgba(141,255,224,0.2)] rounded-xl overflow-hidden bg-[rgba(255,255,255,0.02)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-[rgba(141,255,224,0.05)] transition-all">
                <span className="font-audiowide text-lg pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                  <ChevronDown className="w-5 h-5 text-[#8DFFE0]" />
                </motion.div>
              </button>
              <motion.div initial={false} animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="p-6 pt-0 text-white/80 leading-relaxed">{faq.a}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalCTA() {
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0a0a] to-[#101010]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div className="bg-gradient-to-br from-[rgba(141,255,224,0.1)] to-[rgba(153,144,234,0.1)] border-2 border-[rgba(141,255,224,0.2)] rounded-3xl p-12 md:p-16 text-center" style={{ boxShadow: '0 0 50px rgba(141,255,224,0.2)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="font-ibm-mono text-sm text-[#8DFFE0] mb-8 text-left">
            <div className={isTyping ? 'typing-effect' : ''}>achzod@hormones:~$ ./scan --start</div>
            <div className="mt-2">[INITIALIZING HORMONAL ANALYSIS...]</div>
            <div>[6 AXES READY FOR SCANNING...]</div>
          </div>
          <h2 className="font-audiowide text-4xl md:text-5xl uppercase mb-6">LANCE TON SCAN ANABOLIQUE MAINTENANT</h2>
          <p className="text-lg text-white/80 mb-12">5000+ personnes ont déjà optimisé leurs hormones</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/audit-hormonal/questionnaire?version=gratuit">
              <motion.button className="px-12 py-4 border-2 border-[#8DFFE0] text-[#8DFFE0] font-audiowide text-base uppercase rounded-lg" whileHover={{ backgroundColor: '#8DFFE0', color: '#0a0a0a', scale: 1.05 }}>
                SCAN GRATUIT
              </motion.button>
            </Link>
            <Link href="/audit-hormonal/questionnaire?version=premium">
              <motion.button className="px-12 py-4 bg-gradient-to-r from-[#9990EA] to-[#7B6FD6] text-white font-audiowide text-base uppercase rounded-lg" style={{ boxShadow: '0 0 30px rgba(153,144,234,0.5)' }} whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(153,144,234,0.8)' }}>
                SCAN PREMIUM - 29€
              </motion.button>
            </Link>
          </div>
          <div className="mt-12 font-ibm-mono text-sm text-[#8DFFE0] space-y-1">
            <div>Performance optimized ✓</div>
            <div>Recovery enhanced ✓</div>
            <div>Muscle growth unlocked ✓</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[rgba(141,255,224,0.1)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-audiowide text-xl mb-4 text-[#8DFFE0]">ACHZOD</h3>
            <p className="text-white/60 text-sm">Optimisation métabolique et hormonale basée sur l'IA.</p>
          </div>
          <div>
            <h4 className="font-audiowide text-sm uppercase mb-4">Produits</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/audit-metabolique" className="hover:text-[#8DFFE0] transition-colors">Audit Métabolique</Link></li>
              <li><Link href="/audit-hormonal" className="hover:text-[#8DFFE0] transition-colors">Audit Hormonal</Link></li>
              <li><Link href="/bundle" className="hover:text-[#8DFFE0] transition-colors">Bundle Complet</Link></li>
              <li><Link href="/coaching" className="hover:text-[#8DFFE0] transition-colors">Coaching</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-audiowide text-sm uppercase mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/blog" className="hover:text-[#8DFFE0] transition-colors">Blog</Link></li>
              <li><Link href="/science" className="hover:text-[#8DFFE0] transition-colors">Science</Link></li>
              <li><Link href="/faq" className="hover:text-[#8DFFE0] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#8DFFE0] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-audiowide text-sm uppercase mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/cgu" className="hover:text-[#8DFFE0] transition-colors">CGU</Link></li>
              <li><Link href="/confidentialite" className="hover:text-[#8DFFE0] transition-colors">Confidentialité</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-[#8DFFE0] transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[rgba(141,255,224,0.1)] text-center text-sm text-white/40 font-ibm-mono">
          © 2025 ACHZOD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
