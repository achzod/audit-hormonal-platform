# AchZod Coaching - Plateforme Audit Métabolique

Plateforme web complète pour génération d'audits métaboliques personnalisés avec IA (Claude Sonnet 4.5).

## Stack Technique

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL (Prisma ORM)
- **Paiements**: Stripe + PayPal
- **IA**: Anthropic Claude Sonnet 4.5
- **Email**: Gmail SMTP
- **Hosting**: Render

## Features

### ✅ Landing Page
- Design futuriste dark biohacking (Aquamarine #8DFFE0 + Purple #9990EA)
- Section hero avec particles animés
- Stats cards (5000+ transformations, 98% réussite, 11 certifications)
- Comparaison Gratuit vs Premium
- Témoignages carousel
- FAQ accordion
- CTA multiples
- Footer complet avec newsletter

### ✅ Questionnaire Interactif
- 40 questions réparties en 6 sections
- Types de questions: text, number, select, radio, checkbox, slider, textarea
- Progress bar avec navigation entre sections
- Validation des champs requis
- Sauvegarde automatique localStorage

### ✅ Checkout
- Stripe integration (Carte bancaire)
- PayPal integration (à implémenter)
- Récapitulatif détaillé
- Prix: 79€ (prix de lancement vs 147€)
- Garanties et réassurances

### ✅ Authentification
- NextAuth.js avec CredentialsProvider
- Pages Login + Register
- Sessions JWT
- Protected routes (Dashboard)

### ✅ Dashboard
- Liste des audits par user
- Status en temps réel (PENDING, PROCESSING, COMPLETED, FAILED)
- Visualisation inline des audits terminés
- Upgrade Gratuit → Premium

### ✅ API Routes
- `/api/auth/[...nextauth]` - NextAuth handler
- `/api/auth/register` - Création compte
- `/api/checkout/create-session` - Stripe checkout
- `/api/audit/generate` - Génération audit Claude
- `/api/audit/list` - Liste audits user

### ✅ Génération Audits Claude
- Intégration Anthropic Claude Sonnet 4.5
- Prompts depuis `audit_generator.py` (existant Python)
- Version GRATUIT: 4 sections, 4000 tokens
- Version PREMIUM: 18 sections, 16000 tokens
- Conversion TXT → HTML avec styling

## Installation

```bash
# Clone repo
git clone <repo-url>
cd web

# Install dependencies
npm install

# Setup env vars
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npx prisma generate

# Push schema to DB
npx prisma db push

# Run dev server
npm run dev
```

## Env Variables

Voir `.env.example` pour la liste complète :
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret pour NextAuth
- `ANTHROPIC_API_KEY` - Clé API Claude
- `STRIPE_SECRET_KEY` - Clé Stripe
- `PAYPAL_CLIENT_ID` - ID PayPal
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` - SMTP Gmail

## Deploiement Render

```bash
# Push sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# Render auto-deploy via render.yaml
# Configure les env vars dans dashboard Render
```

## Structure

```
web/
├── prisma/
│   └── schema.prisma          # Models User, Audit, Payment
├── src/
│   ├── app/
│   │   ├── audit-complet/     # Landing + Questionnaire + Checkout
│   │   ├── auth/              # Login + Register
│   │   ├── dashboard/         # User dashboard
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   └── claude.ts          # Claude API integration
│   └── types/
│       ├── questionnaire.ts   # 40 questions definition
│       └── next-auth.d.ts     # NextAuth types
├── public/                    # Static files
├── .env                       # Env vars (git-ignored)
├── render.yaml                # Render config
└── package.json
```

## TODO

- [ ] Implémenter PayPal checkout
- [ ] Ajouter webhook Stripe pour confirmer paiements
- [ ] Emails transactionnels (audit généré, paiement confirmé)
- [ ] Intégration SendPulse pour newsletter
- [ ] Page admin pour monitoring
- [ ] Tests E2E
- [ ] SEO metadata par page
- [ ] Analytics (Plausible / Google Analytics)

## Support

Contact: coaching@achzodcoaching.com
