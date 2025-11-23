"use client";

import { useMemo } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  return <>{children}</>;
}
