'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [responses, setResponses] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('questionnaireResponses');
    if (!saved) {
      router.push('/audit-complet/questionnaire?version=premium');
      return;
    }
    setResponses(JSON.parse(saved));
  }, [router]);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Créer session Stripe ou PayPal
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: 'premium',
          paymentMethod,
          responses,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session');
      }

      // Redirect to payment
      if (paymentMethod === 'stripe' && data.url) {
        window.location.href = data.url;
      } else if (paymentMethod === 'paypal' && data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
      setLoading(false);
    }
  };

  if (!responses) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-jakarta text-3xl font-bold gradient-text mb-4">
            ACHZOD COACHING
          </div>
          <h1 className="font-jakarta text-4xl md:text-5xl font-extrabold mb-4">
            Audit Métabolique Premium
          </h1>
          <p className="text-white/70 text-lg">
            Analyse complète 360° • Roadmap 90 jours • Livraison immédiate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Recap */}
          <div>
            <div className="glass rounded-3xl p-8 mb-6">
              <h2 className="font-jakarta text-2xl font-bold mb-6">Ce que tu vas recevoir</h2>
              <ul className="space-y-4">
                {[
                  'Analyse complète 15 pages personnalisées',
                  '47 points de données métaboliques croisés',
                  'Profil hormonal détaillé (cortisol, thyroïde, insuline)',
                  'Analyse biomécanique posturale',
                  'Roadmap 90 jours étape par étape',
                  'Protocoles nutrition + training sur-mesure',
                  'Optimisation lifestyle & supplémentation',
                  'Accès dashboard premium illimité',
                  'Support email prioritaire 48h',
                  'Livraison en moins de 5 minutes',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-secondary flex-shrink-0 mt-1" size={20} />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 bg-secondary/10 border-secondary/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Prix normal</span>
                <span className="line-through text-white/50">147€</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Prix de lancement</span>
                <span className="text-secondary font-bold">79€</span>
              </div>
              <div className="border-t border-white/10 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="font-jakarta text-xl font-bold">Total</span>
                <span className="font-jakarta text-3xl font-extrabold gradient-text">79€</span>
              </div>
            </div>
          </div>

          {/* Right - Payment */}
          <div>
            <div className="glass rounded-3xl p-8">
              <h2 className="font-jakarta text-2xl font-bold mb-6">Méthode de paiement</h2>

              <div className="space-y-4 mb-8">
                <label
                  className={`flex items-center gap-4 p-6 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'stripe'
                      ? 'bg-secondary/10 border-2 border-secondary'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                    className="w-5 h-5 accent-secondary"
                  />
                  <CreditCard size={32} className="text-secondary" />
                  <div className="flex-1">
                    <div className="font-bold">Carte bancaire</div>
                    <div className="text-sm text-white/60">Visa, Mastercard, Amex</div>
                  </div>
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='25'%3E%3Ctext x='0' y='20' font-family='Arial' font-weight='bold' font-size='16' fill='%235469d4'%3Estripe%3C/text%3E%3C/svg%3E"
                    alt="Stripe"
                    className="h-6"
                  />
                </label>

                <label
                  className={`flex items-center gap-4 p-6 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-secondary/10 border-2 border-secondary'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="w-5 h-5 accent-secondary"
                  />
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00457C">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                  </svg>
                  <div className="flex-1">
                    <div className="font-bold">PayPal</div>
                    <div className="text-sm text-white/60">Paiement sécurisé</div>
                  </div>
                </label>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Redirection en cours...
                  </>
                ) : (
                  <>
                    Payer 79€ maintenant
                    <Check size={20} />
                  </>
                )}
              </button>

              <div className="mt-6 space-y-3 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-secondary" />
                  <span>Paiement sécurisé SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-secondary" />
                  <span>14 jours satisfait ou remboursé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-secondary" />
                  <span>Livraison immédiate par email</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-white/50">
              En confirmant, tu acceptes les{' '}
              <Link href="/legal/cgv" className="text-secondary hover:underline">
                CGV
              </Link>{' '}
              et la{' '}
              <Link href="/legal/privacy" className="text-secondary hover:underline">
                politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

