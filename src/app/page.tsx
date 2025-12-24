'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/audit-complet');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold gradient-text mb-4">ACHZOD</div>
        <p className="text-white/70">Redirection...</p>
      </div>
    </div>
  );
}
