// components/SignupForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Button from './Button';
import Logo from './CustomLogo';

export default function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);
    if (error) setError(error.message);
    else alert('Check your email to confirm your account');
  };

  return (

    <form onSubmit={handleSignup} className="max-w-sm mx-auto p-4 space-y-4">
      <div className="flex items-center justify-center"><Logo></Logo></div>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full border rounded p-2 mt-2"
        required
      />
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
        title="signup"
        disabled={loading}
        className="w-auto bg-orange-400 text-white p-2 rounded"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}
