'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { NAV_LINKS } from '@/constants/pages';
import { supabase } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';
import Logo from './CustomLogo';

export default function Navbar() {

  const [session, setSession] = useState<Session | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  // Get session + listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch profile when session changes
  useEffect(() => {
    if (session?.user?.id) {
      supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single()
        .then(({ data }) => {
          if (data) setFullName(data.full_name);
        });
    }
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setFullName(null);
  };

  return (
    <nav className="bg-white p-4 shadow-md flex items-center justify-between">
      {/* Logo */}
      
      <Logo></Logo>

      {/* Nav links */}
      <ul className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      
      <div className="flex gap-3">
        {session ? (
          <>
            <span className="text-gray-700">
              Hi, {fullName || session.user.email}
            </span>
            <Button
              type="button"
              title="Logout"
              className="bg-red-500 text-white"
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
          
      <Link href="/login">
              <Button
                type="button"
                title="Login"
                className="bg-green-400 text-white"
              />
            </Link>
            <Link href="/signup">
              <Button
                type="button"
                title="Sign Up"
                className="bg-orange-400 text-white"
              />
            </Link>
          </>
        )}
      </div>

      

     
    </nav>
  );
}
