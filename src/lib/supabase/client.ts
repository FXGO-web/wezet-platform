"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../supabase/types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createBrowserSupabaseClient(): ReturnType<typeof createBrowserClient<Database>> {
  if (!browserClient) {
    browserClient = createBrowserClient<Database>({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    });
  }
  return browserClient;
}
