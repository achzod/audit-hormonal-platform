import { Suspense } from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Chargement...</div>}>{children}</Suspense>;
}

