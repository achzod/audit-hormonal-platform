import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const audits = await prisma.audit.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        version: true,
        status: true,
        createdAt: true,
        completedAt: true,
        htmlContent: true,
      },
    });

    return NextResponse.json({ audits });
  } catch (error) {
    console.error('List audits error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des audits' },
      { status: 500 }
    );
  }
}
