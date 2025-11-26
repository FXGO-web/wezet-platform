"use client";

import { createContext, useContext, useMemo } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

const SupabaseContext = createContext<ReturnType<typeof createBrowserSupabaseClient> | undefined>(undefined);

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}