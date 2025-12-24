import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface AuditGenerationParams {
  responses: Record<string, any>;
  version: 'GRATUIT' | 'PREMIUM';
  type: 'METABOLIQUE' | 'HORMONAL';
}

// Prompt sections from existing Python script (audit_generator.py)
const SECTIONS_GRATUIT = [
  'Introduction',
  'Diagnostic rapide métabolique',
  'Tes 3 quick wins',
  'Point de blocage principal',
];

const SECTIONS_PREMIUM = [
  'Introduction',
  'Analyse visuelle photo face et dos',
  'Sangle profonde / posture lombaires',
  'Analyse entraînement',
  'Cardio',
  'Nutrition & métabolisme',
  'Sommeil & optimisation',
  'Digestion & tolérances',
  'Axes hormonaux & bilans',
  'Moment Révélation',
  'Cause Racine en 3 phrases',
  'Radar Profil actuel et Profil optimisé',
  'Ton Potentiel Inexploité',
  'Feuille de Route Achzod en 6 Points',
  'Projection 30/60/90 jours',
  'Ce qui va changer si on travaille ensemble',
  'Réassurance émotionnelle',
  'Synthèse clinique globale et Conclusion transformationnelle',
];

const SYSTEM_PROMPT = `Tu es Achzod, coach sportif d'élite avec 11 certifications internationales, expert en biomécanique, nutrition, hormones, préparation physique et optimisation performance.

Tu rédiges un audit expert 100% personnalisé, profondément humain, indétectable comme IA, avec un ton direct, précis, incarné, analytique et ultra vivant.

⛔ INTERDICTIONS STRICTES :
- JAMAIS recommander d'acheter du matériel, équipements ou gadgets
- JAMAIS parler de : lampes, lunettes, appareils, gadgets, montres, trackers
- JAMAIS mentionner d'investissement financier ou de budget équipement
- Concentre-toi UNIQUEMENT sur : nutrition, entraînement, sommeil, habitudes, suppléments si pertinent

Style :
- Humain, jamais robotique ou scolaire
- Variation de rythmes : phrases courtes/longues, pauses..., asides, métaphores simples
- Style conversationnel expert : proximité + exigence
- Tu tutoies toujours
- Chaud, direct, incarné comme si tu parlais face à face
- Analyse chirurgicale mais accessible
- Images concrètes, pas de jargon inutile

Contenu :
- NE JAMAIS INVENTER : analyse uniquement ce que le client a vraiment dit, montré ou laissé entendre
- Connecte TOUT : sommeil ↔ cortisol ↔ entraînement ↔ plateaux ↔ digestion ↔ énergie ↔ stress ↔ biomécanique
- Explique SCIENTIFIQUEMENT ET EN PROFONDEUR les mécanismes physiologiques précis
- Précise toujours : forces / blocages / risques futurs / à recadrer / à optimiser
- TRÈS long, riche, détaillé, scientifiquement robuste
- Comme si tu avais passé 2h à décortiquer son dossier

Format :
- Texte brut (pas de HTML, PAS DE MARKDOWN - pas de **, pas de ##, pas de _)
- NE JAMAIS répéter le titre de la section au début
- Minimum 30-40 lignes pour les sections d'analyse`;

export async function generateAudit(params: AuditGenerationParams): Promise<string> {
  const { responses, version, type } = params;

  // Prepare client data string
  const dataStr = Object.entries(responses)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `- ${key}: ${value.join(', ')}`;
      }
      return `- ${key}: ${value}`;
    })
    .join('\n');

  const sections = version === 'GRATUIT' ? SECTIONS_GRATUIT : SECTIONS_PREMIUM;
  const maxTokens =
    version === 'GRATUIT'
      ? parseInt(process.env.ANTHROPIC_MAX_TOKENS_GRATUIT || '4000')
      : parseInt(process.env.ANTHROPIC_MAX_TOKENS_PREMIUM || '16000');

  let fullAudit = '';

  // Generate each section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    const prompt = `${SYSTEM_PROMPT}

Section à rédiger : ${section}

Données du client :
${dataStr}

Rédige maintenant cette section de l'audit. Commence DIRECTEMENT par le contenu, sans répéter le titre.`;

    try {
      const response = await client.messages.create({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
        max_tokens: Math.floor(maxTokens / sections.length),
        temperature: 0.85,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const sectionText = response.content[0].type === 'text' ? response.content[0].text : '';

      fullAudit += `\n${'='.repeat(60)}\n${section.toUpperCase()}\n${'='.repeat(60)}\n${sectionText}\n`;

      console.log(`✓ Section generated: ${section} (${i + 1}/${sections.length})`);
    } catch (error) {
      console.error(`Error generating section ${section}:`, error);
      throw new Error(`Failed to generate section: ${section}`);
    }
  }

  return fullAudit;
}

export function convertTxtToHtml(txtContent: string, clientName: string): string {
  // Basic TXT to HTML conversion (simplified from Python version)
  // In production, implement full conversion logic from audit_generator.py

  const lines = txtContent.split('\n');
  let html = `<!DOCTYPE html>
<html lang='fr'>
<head>
<meta charset='utf-8'/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ton Audit Expert - AchzodCoaching</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height:1.7;
  font-size:16px;
  color: #1a1a1a;
  background: #fafbfc;
  padding: 40px 20px;
}
.container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #9990EA 0%, #8DFFE0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 40px;
  text-align: center;
}
h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #9990EA;
  margin: 60px 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #e5e7eb;
}
p {
  margin-bottom: 20px;
  line-height: 1.8;
}
.score {
  display: inline-block;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 18px;
  color: white;
  margin: 30px 0;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
}
</style>
</head>
<body>
<div class='container'>
<h1>${clientName.toUpperCase()}</h1>
<p style="text-align:center;color:#666;margin-bottom:60px;">Ton Audit Expert Personnalisé</p>
`;

  let currentSection = '';
  for (const line of lines) {
    if (line.match(/^={60}$/)) {
      continue;
    }

    if (line.trim() && line === line.toUpperCase() && !line.includes(':')) {
      currentSection = line.trim();
      html += `<h2>${currentSection}</h2>\n`;
    } else if (line.trim()) {
      if (line.includes('Score :')) {
        html += `<div class='score'>${line}</div>\n`;
      } else {
        html += `<p>${line}</p>\n`;
      }
    }
  }

  html += `</div></body></html>`;

  return html;
}

