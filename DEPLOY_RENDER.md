# 🚀 DÉPLOIEMENT RENDER - AUDIT HORMONAL PLATFORM

## ✅ REPO GITHUB CRÉÉ
- **URL**: https://github.com/achzod/audit-hormonal-platform
- **Visibilité**: Public
- **Code**: Pushé automatiquement

---

## 📋 ÉTAPES DÉPLOIEMENT RENDER

### 1. CRÉER LE SERVICE SUR RENDER

1. Va sur https://dashboard.render.com
2. Clique **"New +"** → **"Web Service"**
3. Connecte le repo: `achzod/audit-hormonal-platform`
4. Configure:
   - **Name**: `audit-hormonal-platform`
   - **Region**: Frankfurt
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (ou Free pour test)

### 2. CONFIGURER LES VARIABLES D'ENVIRONNEMENT

Dans Render dashboard → Environment → Add Environment Variables:

#### **OBLIGATOIRES**:
```
DATABASE_URL=postgresql://user:password@host:5432/database
ANTHROPIC_API_KEY=sk-ant-...
NEXTAUTH_SECRET=généré_avec_openssl_rand_base64_32
NEXTAUTH_URL=https://audit-hormonal-platform.onrender.com
NEXT_PUBLIC_APP_URL=https://audit-hormonal-platform.onrender.com
```

#### **STRIPE** (à créer sur Stripe Dashboard):
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_AUDIT_PREMIUM=price_xxxxx (79€ métabolique)
STRIPE_PRICE_ID_AUDIT_HORMONAL_PREMIUM=price_xxxxx (29€ hormonal)
STRIPE_PRICE_ID_BUNDLE=price_xxxxx (99€ bundle)
```

#### **EMAIL** (SendGrid ou SMTP):
```
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@achzodcoaching.com
```

#### **OPTIONNELLES** (déjà dans render.yaml):
```
NODE_ENV=production
ANTHROPIC_MAX_TOKENS_GRATUIT=5000
ANTHROPIC_MAX_TOKENS_PREMIUM=16000
ANTHROPIC_MAX_TOKENS_HORMONAL_GRATUIT=3000
ANTHROPIC_MAX_TOKENS_HORMONAL_PREMIUM=10000
```

### 3. DÉPLOYER

1. Clique **"Create Web Service"**
2. Render va:
   - Cloner le repo
   - Installer les dépendances
   - Générer Prisma client
   - Build Next.js
   - Démarrer le serveur

**⏱️ Durée**: 5-10 minutes

---

## 🔐 SECRETS À GÉNÉRER

### NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

### DATABASE_URL
- Utilise la DB Render existante ou crée une nouvelle PostgreSQL sur Render
- Format: `postgresql://user:password@host:5432/database?sslmode=require`

---

## 💳 STRIPE PRODUCTS À CRÉER

### Sur Stripe Dashboard (https://dashboard.stripe.com):

1. **Audit Métabolique Premium** (79€):
   - Products → Create Product
   - Name: "Audit Métabolique Premium"
   - Price: 79.00 EUR
   - Recurring: No (one-time)
   - Copie le Price ID → `STRIPE_PRICE_ID_AUDIT_PREMIUM`

2. **Audit Hormonal Premium** (29€):
   - Name: "Audit Hormonal Premium - Scan Anabolique"
   - Price: 29.00 EUR
   - Copie le Price ID → `STRIPE_PRICE_ID_AUDIT_HORMONAL_PREMIUM`

3. **Bundle Complet** (99€):
   - Name: "Bundle Complet - Métabolique + Hormonal"
   - Price: 99.00 EUR
   - Copie le Price ID → `STRIPE_PRICE_ID_BUNDLE`

---

## 🗄️ DATABASE MIGRATION

Une fois le service déployé:

```bash
# Via Render Shell (Dashboard → Shell)
npx prisma db push

# Ou en local connecté à la prod DB
DATABASE_URL="postgresql://..." npx prisma db push
```

---

## ✅ VÉRIFICATION POST-DÉPLOIEMENT

1. **Landing Métabolique**: https://audit-hormonal-platform.onrender.com/
2. **Landing Hormonal**: https://audit-hormonal-platform.onrender.com/audit-hormonal
3. **API Health**: https://audit-hormonal-platform.onrender.com/api/health
4. **Questionnaire Gratuit**: https://audit-hormonal-platform.onrender.com/audit-hormonal/questionnaire?version=gratuit
5. **Questionnaire Premium**: https://audit-hormonal-platform.onrender.com/audit-hormonal/questionnaire?version=premium

---

## 🔄 AUTO-DEPLOY

Le `render.yaml` active `autoDeploy: true` → **chaque push sur `main` redéploie automatiquement**.

---

## 📊 MONITORING

- **Logs**: Render Dashboard → Logs
- **Metrics**: Dashboard → Metrics
- **Alerts**: Configure email alerts pour downtime

---

## 🆘 TROUBLESHOOTING

### Build échoue
```bash
# Vérifier les logs dans Render Dashboard
# Problème fréquent: manque de RAM → upgrade plan
```

### Prisma erreur
```bash
# S'assurer que DATABASE_URL est correcte
# Vérifier que db push a été fait
npx prisma db push --skip-generate
```

### Claude API erreur
```bash
# Vérifier ANTHROPIC_API_KEY valide
# Vérifier quota API Claude
```

---

## 🎯 NEXT STEPS APRÈS DÉPLOIEMENT

1. ✅ Tester flow complet Gratuit (générer audit)
2. ✅ Tester flow Premium (questionnaire → checkout → paiement → audit)
3. ✅ Configurer domaine custom (achzodaudits.com)
4. ✅ Setup Google Analytics
5. ✅ Setup Sentry error tracking
6. ✅ Configure CDN Cloudflare
7. ✅ Setup email notifications SendGrid

---

**🔥 REPO GITHUB**: https://github.com/achzod/audit-hormonal-platform

**📝 STATUT**: Prêt à déployer sur Render

