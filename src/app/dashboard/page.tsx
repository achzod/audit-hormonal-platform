'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, FileText, Clock, CheckCircle, XCircle, LogOut, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Audit {
  id: string;
  type: string;
  version: string;
  status: string;
  createdAt: string;
  completedAt?: string;
  htmlContent?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const session = await res.json();
      
      if (!session?.user) {
        router.push('/auth/login?returnUrl=/dashboard');
        return;
      }
      
      setUser(session.user);
      fetchAudits();
    } catch (error) {
      console.error('Error checking auth:', error);
      router.push('/auth/login?returnUrl=/dashboard');
    }
  };

  const fetchAudits = async () => {
    try {
      const res = await fetch('/api/audit/list');
      const data = await res.json();
      setAudits(data.audits || []);
    } catch (error) {
      console.error('Error fetching audits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'PROCESSING':
        return <Loader2 className="animate-spin text-secondary" size={20} />;
      case 'FAILED':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-white/40" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Terminé';
      case 'PROCESSING':
        return 'En cours...';
      case 'FAILED':
        return 'Erreur';
      case 'PENDING':
        return 'En attente';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-dark/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="font-jakarta text-2xl font-extrabold gradient-text">ACHZOD</div>
          </Link>

          <div className="flex items-center gap-6">
            {user && (
              <div className="text-sm">
                <span className="text-white/60">Bienvenue,</span>
                <span className="font-semibold ml-2">{user.name || user.email}</span>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              <span className="text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="font-jakarta text-4xl font-extrabold mb-3 gradient-text">
            Ton Dashboard
          </h1>
          <p className="text-white/70 text-lg">Accède à tes audits personnalisés</p>
        </div>

        {/* Audits Grid */}
        {audits.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <FileText className="mx-auto mb-6 text-white/40" size={64} />
            <h2 className="font-jakarta text-2xl font-bold mb-4">Aucun audit pour le moment</h2>
            <p className="text-white/60 mb-8">
              Commence par répondre au questionnaire pour obtenir ton audit personnalisé
            </p>
            <Link href="/audit-complet" className="inline-block">
              <button className="btn-primary">Commencer mon audit</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audits.map((audit) => (
              <motion.div
                key={audit.id}
                className="glass rounded-2xl p-6 hover:border-secondary transition-all cursor-pointer"
                whileHover={{ y: -4 }}
                onClick={() => audit.status === 'COMPLETED' && setSelectedAudit(audit)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-jakarta font-bold text-lg mb-1">
                      Audit {audit.type === 'METABOLIQUE' ? 'Métabolique' : 'Hormonal'}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {audit.version === 'PREMIUM' ? (
                        <span className="text-primary flex items-center gap-1">
                          <Sparkles size={14} />
                          Premium
                        </span>
                      ) : (
                        <span className="text-secondary">Gratuit</span>
                      )}
                    </div>
                  </div>
                  {getStatusIcon(audit.status)}
                </div>

                <div className="text-sm text-white/60 space-y-2">
                  <div>Status: {getStatusText(audit.status)}</div>
                  <div>Créé: {new Date(audit.createdAt).toLocaleDateString('fr-FR')}</div>
                  {audit.completedAt && (
                    <div>
                      Terminé: {new Date(audit.completedAt).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>

                {audit.status === 'COMPLETED' && audit.version === 'GRATUIT' && (
                  <button className="mt-4 w-full btn-purple text-sm py-2">
                    Upgrade Premium →
                  </button>
                )}

                {audit.status === 'COMPLETED' && audit.version === 'PREMIUM' && (
                  <button className="mt-4 w-full btn-primary text-sm py-2">
                    Voir l'audit complet
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Audit viewer modal */}
        {selectedAudit && selectedAudit.htmlContent && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 overflow-auto"
            onClick={() => setSelectedAudit(null)}
          >
            <div
              className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="font-jakarta text-xl font-bold text-gray-900">
                  Ton Audit {selectedAudit.type === 'METABOLIQUE' ? 'Métabolique' : 'Hormonal'}
                </h2>
                <button
                  onClick={() => setSelectedAudit(null)}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div
                className="p-8"
                dangerouslySetInnerHTML={{ __html: selectedAudit.htmlContent }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
