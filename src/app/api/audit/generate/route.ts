import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';
import { generateAudit, convertTxtToHtml } from '../../../../lib/claude';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { responses, version, type = 'METABOLIQUE' } = body;

    if (!responses) {
      return NextResponse.json({ error: 'Réponses manquantes' }, { status: 400 });
    }

    // Create audit record
    const audit = await prisma.audit.create({
      data: {
        userId: session.user.id,
        type,
        version: version.toUpperCase(),
        status: 'PROCESSING',
        responses,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'AUDIT_GENERATION_STARTED',
        details: { auditId: audit.id, version, type },
      },
    });

    // Generate audit asynchronously
    const startTime = Date.now();

    try {
      const txtContent = await generateAudit({
        responses,
        version: version.toUpperCase(),
        type,
      });

      const clientName = `${responses.prenom || ''} ${responses.nom || ''}`.trim() || 'Client';
      const htmlContent = convertTxtToHtml(txtContent, clientName);

      const generationTimeMs = Date.now() - startTime;

      // Update audit with generated content
      await prisma.audit.update({
        where: { id: audit.id },
        data: {
          status: 'COMPLETED',
          htmlContent,
          analysis: { txt: txtContent },
          completedAt: new Date(),
          generationTimeMs,
        },
      });

      // Log success
      await prisma.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'AUDIT_GENERATED',
          details: { auditId: audit.id, generationTimeMs },
        },
      });

      return NextResponse.json({
        success: true,
        auditId: audit.id,
        generationTimeMs,
      });
    } catch (error) {
      console.error('Generation error:', error);

      // Update audit status to FAILED
      await prisma.audit.update({
        where: { id: audit.id },
        data: { status: 'FAILED' },
      });

      // Log failure
      await prisma.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'AUDIT_GENERATION_FAILED',
          details: { auditId: audit.id, error: String(error) },
        },
      });

      throw error;
    }
  } catch (error) {
    console.error('Generate audit error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de l\'audit' },
      { status: 500 }
    );
  }
}

