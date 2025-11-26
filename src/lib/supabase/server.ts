import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createServerSupabaseClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
        async set(name: string, value: string) {
          const cookieStore = await cookies();
          cookieStore.set(name, value);
        },
        async remove(name: string) {
          const cookieStore = await cookies();
          cookieStore.set(name, "", { maxAge: 0 });
        },
      },
    }
  );
}
