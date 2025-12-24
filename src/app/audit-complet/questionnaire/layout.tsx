import { Suspense } from 'react';

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Chargement...</div>}>{children}</Suspense>;
}

