import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "../supabase/types";

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string) => cookieStore.set(name, value),
        remove: (name: string) => cookieStore.set(name, "", { maxAge: 0 }),
      },
    }
  );
}
