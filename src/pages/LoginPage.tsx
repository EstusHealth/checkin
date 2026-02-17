import { useState } from 'react';

interface LoginPageProps {
  onSignIn: (email: string, password: string) => Promise<{ error: unknown }>;
}

export function LoginPage({ onSignIn }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await onSignIn(email, password);
    if (error) {
      setError((error as { message?: string }).message ?? 'Sign in failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-text text-center mb-2">Vitals</h1>
        <p className="text-text-muted text-center mb-8 text-sm">
          Sign in to your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg px-4 py-2 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
