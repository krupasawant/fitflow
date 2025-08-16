import {cookies} from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createServerSupabaseClient() {
  const cookieStore =  cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        set() {
          // no-op: cookies() from next/headers is readonly
        },
        remove() {
          // no-op: cookies() from next/headers is readonly
        },
      },
    }
  );
}
