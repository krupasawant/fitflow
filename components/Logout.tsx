'use client';

import Link from "next/link";
import Button from "@/components/Button";
import { useSupabaseAuth } from "./SupabaseProvider";
import { supabase } from "@/lib/supabase";

export default function Logout() {
  const { session } = useSupabaseAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session) {
    return (
      <Button 
        type="button" 
        title="Logout"
        icon="/logout.png"
        className="bg-red-500 text-white"
        onClick={handleLogout}
      />
    );
  }

  
}
