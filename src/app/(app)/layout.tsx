"use client";

import SupabaseProvider from "@/components/supabase-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <SupabaseProvider>{children}</SupabaseProvider>;
}
