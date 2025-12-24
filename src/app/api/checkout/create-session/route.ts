import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { version, paymentMethod, responses } = body;

    if (version !== 'premium') {
      return NextResponse.json({ error: 'Version invalide' }, { status: 400 });
    }

    const amount = 7900; // 79€ en centimes

    if (paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Audit Métabolique Premium',
                description: 'Analyse complète 360° + Roadmap 90 jours',
                images: ['https://via.placeholder.com/500'], // TODO: Replace with real image
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/register?success=true&returnUrl=/dashboard`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout?cancelled=true`,
        metadata: {
          version,
          responses: JSON.stringify(responses),
        },
      });

      return NextResponse.json({ url: session.url });
    } else if (paymentMethod === 'paypal') {
      // TODO: Implement PayPal checkout
      // For now, fallback to Stripe
      return NextResponse.json(
        { error: 'PayPal temporairement indisponible, utilise Stripe' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Méthode de paiement invalide' }, { status: 400 });
  } catch (error) {
    console.error('Create session error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session' },
      { status: 500 }
    );
  }
}

