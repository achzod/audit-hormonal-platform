import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import Anthropic from '@anthropic-ai/sdk';
import { 
  HORMONAL_GRATUIT_SYSTEM_PROMPT, 
  buildHormonalGratuitUserPrompt 
} from '@/lib/prompts/hormonal-gratuit';
import { 
  HORMONAL_PREMIUM_SYSTEM_PROMPT, 
  buildHormonalPremiumUserPrompt 
} from '@/lib/prompts/hormonal-premium';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { version, responses, userId } = body;

    if (!version || !responses) {
      return NextResponse.json(
        { error: 'Missing version or responses' },
        { status: 400 }
      );
    }

    // Determine which prompt to use
    const isGratuit = version === 'gratuit';
    const systemPrompt = isGratuit 
      ? HORMONAL_GRATUIT_SYSTEM_PROMPT 
      : HORMONAL_PREMIUM_SYSTEM_PROMPT;
    const userPrompt = isGratuit
      ? buildHormonalGratuitUserPrompt(responses)
      : buildHormonalPremiumUserPrompt(responses);

    // Get max tokens from env
    const maxTokens = isGratuit
      ? parseInt(process.env.ANTHROPIC_MAX_TOKENS_HORMONAL_GRATUIT || '3000')
      : parseInt(process.env.ANTHROPIC_MAX_TOKENS_HORMONAL_PREMIUM || '10000');

    // Create audit record first (status: PENDING)
    const audit = await prisma.audit.create({
      data: {
        userId: userId || 'anonymous', // Handle anonymous users
        type: 'HORMONAL',
        version: version.toUpperCase() as 'GRATUIT' | 'PREMIUM',
        status: 'PROCESSING',
        responses,
      },
    });

    try {
      // Call Claude API
      const startTime = Date.now();
      
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      const generationTimeMs = Date.now() - startTime;

      // Extract HTML from response
      const htmlContent = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      // Update audit with results
      await prisma.audit.update({
        where: { id: audit.id },
        data: {
          status: 'COMPLETED',
          htmlContent,
          analysis: response as any, // Store full response for debugging
          generationTimeMs,
          completedAt: new Date(),
        },
      });

      // Log activity
      if (userId) {
        await prisma.activityLog.create({
          data: {
            userId,
            action: 'AUDIT_HORMONAL_CREATED',
            details: {
              auditId: audit.id,
              version,
              generationTimeMs,
            },
          },
        });
      }

      return NextResponse.json({
        success: true,
        auditId: audit.id,
        version,
      });

    } catch (apiError) {
      console.error('Claude API Error:', apiError);

      // Update audit status to FAILED
      await prisma.audit.update({
        where: { id: audit.id },
        data: {
          status: 'FAILED',
        },
      });

      return NextResponse.json(
        { error: 'Failed to generate audit' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error creating hormonal audit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

