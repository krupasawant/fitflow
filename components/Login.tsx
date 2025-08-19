'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Button from './Button';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push('/'); // redirect after login
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 space-y-4">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        type="submit"
        title="login"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
}
