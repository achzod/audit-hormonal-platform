# 🔥 AUDIT HORMONAL - SCAN ANABOLIQUE

## ✅ IMPLÉMENTATION COMPLÈTE

### Phase 1: Database Schema ✅
- `prisma/schema.prisma` : 
  - ✅ Ajout enum `AuditType { METABOLIQUE, HORMONAL }`
  - ✅ Model `Audit.type` → `AuditType`
  - ✅ Model `Payment.productType` → `AuditType`
- ✅ `npx prisma generate` exécuté
- ⚠️ `npx prisma db push` (erreur connexion DB - à relancer si DB accessible)

### Phase 2: Landing Page ✅
- `src/app/audit-hormonal/page.tsx` : Landing page complète
  - ✅ Hero avec radar chart animé
  - ✅ Stats section (5000+ analyses, 98% précision)
  - ✅ 6 axes hormonaux (cards avec icons)
  - ✅ Comparison Gratuit vs Premium (29€)
  - ✅ Bundle option (99€)
  - ✅ Why optimize section
  - ✅ For who section
  - ✅ Science accordion
  - ✅ Testimonials matrix
  - ✅ FAQ technique
  - ✅ Terminal CTA
  - ✅ Footer

### Phase 3: Questionnaire ✅
- `src/app/audit-hormonal/questionnaire/page.tsx` : 
  - ✅ 35 questions, 6 sections
  - ✅ Progress bar + dots navigation
  - ✅ Form validation
  - ✅ Section 1: Général (âge, sexe, poids, taille, objectif)
  - ✅ Section 2: Testostérone (libido, énergie, force, masse)
  - ✅ Section 3: Cortisol (stress, sommeil, irritabilité)
  - ✅ Section 4: Insuline (faim, énergie, stockage)
  - ✅ Section 5: Leptine/Appétit (satiété, yo-yo)
  - ✅ Section 6: Thyroïde (froid, métabolisme)
  - ✅ Submit → API `/api/audits/hormonal/create`

### Phase 4: API Route ✅
- `src/app/api/audits/hormonal/create/route.ts` :
  - ✅ Récupération responses + version
  - ✅ Création audit (status PROCESSING)
  - ✅ Appel Claude Sonnet 4.5 avec prompts hormonal
  - ✅ Update audit (status COMPLETED + htmlContent)
  - ✅ Activity log
  - ✅ Return auditId → redirect checkout (premium) ou view (gratuit)

### Phase 5: Prompts Claude ✅
- `src/lib/prompts/hormonal-gratuit.ts` :
  - ✅ System prompt (4 pages, style tech, 6 axes)
  - ✅ User prompt builder (responses → HTML)
  - ✅ Max tokens: 3000 (env var)
  
- `src/lib/prompts/hormonal-premium.ts` :
  - ✅ System prompt (10 pages, analyse complète, protocoles)
  - ✅ User prompt builder
  - ✅ Max tokens: 10000 (env var)

### Phase 6: Styles & Animations ✅
- `src/app/globals.css` :
  - ✅ Import fonts Audiowide + IBM Plex Mono
  - ✅ Scanlines animation
  - ✅ Neon glow (cyan, purple)
  - ✅ Terminal corner effects
  - ✅ Glitch animation
  - ✅ Matrix scroll
  - ✅ Typing effect

- `tailwind.config.ts` :
  - ✅ Extend animations (neon-pulse, scanlines, glitch, matrix-scroll, typing)
  - ✅ Keyframes ajoutés

### Phase 7: Env Variables ✅
- `.env.local.example` créé avec :
  - ✅ `ANTHROPIC_MAX_TOKENS_HORMONAL_GRATUIT=3000`
  - ✅ `ANTHROPIC_MAX_TOKENS_HORMONAL_PREMIUM=10000`
  - ✅ `STRIPE_PRICE_ID_AUDIT_HORMONAL_PREMIUM=price_xxxxx`

---

## 🎨 DESIGN SPECS

### Couleurs
- Background: `#101010` (noir pur)
- Accent primaire: `#8DFFE0` (cyan néon)
- Accent secondaire: `#9990EA` (purple néon)
- Texte: `#FFFFFF`

### Typographie
- Titres: **Audiowide** (tech/gaming)
- Data/Stats: **IBM Plex Mono** (terminal)
- Corps: **Inter** (readable)

### Effets
- Neon glow sur titres/stats
- Scanlines subtiles background
- Grid pattern overlay
- Terminal corner accents
- Gradient borders animés

---

## 📊 STRUCTURE AUDIT

### Gratuit (4 pages)
1. **Dashboard** : Score anabolique /100 + radar 6 axes
2. **Analyse 6 axes** : Estimations (Bas/Moyen/Élevé)
3. **Top 3 insights** : Déséquilibres prioritaires
4. **Upgrade CTA** : Preview Premium

### Premium (10 pages)
1. **Dashboard** : Score + radar détaillé
2. **Testostérone** : T totale/libre, pattern circadien, timeline
3. **Cortisol** : Pattern 24h, catabolisme, stratégies
4. **Insuline** : HOMA-IR, sensibilité, timing glucides
5. **Leptine/Ghreline** : Ratio, résistance, reverse diet
6. **Thyroïde** : T3/T4/TSH, conversion, relance
7. **GH** : Production nocturne, sommeil, protocole
8. **Protocole global** : Plan 12 semaines, lifestyle, nutrition
9. **Supplémentation** : Dosages précis, synergies, budget
10. **Suivi** : KPIs, re-test, dashboard premium

---

## 🔄 FLUX UTILISATEUR

```
1. Landing /audit-hormonal
   → CTA "Commencer le scan" (gratuit) ou "Accéder Premium 29€"

2. Questionnaire /audit-hormonal/questionnaire?version=gratuit|premium
   → 6 sections, 35 questions
   → Submit → API /api/audits/hormonal/create

3. API
   → Création Audit (PROCESSING)
   → Claude Sonnet 4.5 génère HTML
   → Update Audit (COMPLETED)
   → Return auditId

4a. Gratuit → Redirect /audits/{auditId} (affichage immédiat)
4b. Premium → Redirect /checkout?auditId={auditId}&type=hormonal
    → Paiement Stripe 29€
    → Success → Unlock audit
```

---

## 💰 PRICING

| Version | Prix | Pages | Caractéristiques |
|---------|------|-------|------------------|
| **Gratuit** | 0€ | 4 | Score global, radar 6 axes, 3 insights |
| **Premium** | 29€ | 10 | Analyse complète, protocoles, suppléments, dashboard |
| **Bundle** | 99€ | - | Métabolique (79€) + Hormonal (29€) = économise 9€ |

---

## 🚀 PROCHAINES ÉTAPES

### Immédiat
1. ⚠️ Relancer `npx prisma db push` si DB accessible
2. ✅ Tester landing page `/audit-hormonal`
3. ✅ Tester questionnaire `/audit-hormonal/questionnaire?version=gratuit`
4. ⚠️ Tester API `/api/audits/hormonal/create` (nécessite ANTHROPIC_API_KEY valide)

### Court terme
- [ ] Créer Stripe Price ID pour Premium Hormonal (29€)
- [ ] Créer Stripe Price ID pour Bundle (99€)
- [ ] Adapter `/checkout` pour supporter `type=hormonal`
- [ ] Adapter `/audits/[id]` pour afficher audits hormonaux
- [ ] Dashboard premium: tabs Métabolique / Hormonal

### Moyen terme
- [ ] Email notification post-génération
- [ ] Tracking analytics (Google Analytics events)
- [ ] A/B testing pricing (29€ vs 39€)
- [ ] Upsell popup (upgrade Gratuit → Premium après visualisation)

---

## 📝 NOTES TECHNIQUES

### Prisma Schema Changes
```prisma
enum AuditType {
  METABOLIQUE
  HORMONAL
}

model Audit {
  type AuditType @default(METABOLIQUE)
  // ...
}

model Payment {
  productType AuditType @default(METABOLIQUE)
  // ...
}
```

### Claude API Call
```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: isGratuit ? 3000 : 10000,
  system: systemPrompt,
  messages: [{ role: 'user', content: userPrompt }],
});
```

### Questionnaire Structure
```typescript
SECTIONS = [
  { id: 'general', questions: 5 },
  { id: 'testosterone', questions: 6 },
  { id: 'cortisol', questions: 6 },
  { id: 'insuline', questions: 5 },
  { id: 'appetit', questions: 5 },
  { id: 'thyroide', questions: 5 },
]
// Total: 35 questions
```

---

## ✅ TODO LIST

- [x] Update Prisma schema
- [x] Generate Prisma client
- [x] Create landing page
- [x] Create questionnaire
- [x] Create API route
- [x] Create prompts
- [x] Update globals.css
- [x] Update tailwind.config
- [ ] Push DB schema (erreur connexion)
- [ ] Test end-to-end flow
- [ ] Create Stripe products
- [ ] Deploy to production

---

**Statut**: ✅ Implémentation complète côté frontend + API + prompts. ⚠️ DB push à relancer + tests à faire.

