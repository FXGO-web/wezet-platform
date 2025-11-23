"use client";

import { createContext, useContext, useMemo } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type SupabaseContextType = {
  supabase: ReturnType<typeof createBrowserSupabaseClient>;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createBrowserSupabaseClient<Database>(), []);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return ctx.supabase;
}