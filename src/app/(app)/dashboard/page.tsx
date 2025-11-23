import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type Product = Database["public"]["Tables"]["products"]["Row"];

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, description, price");

  const safeProducts: Product[] = products ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">
        Bienvenido, {session.user.email}
      </h1>

      <p className="mt-4 text-slate-600">Listados desde Supabase</p>

      {productsError && (
        <p className="text-red-500 mt-2">{productsError.message}</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
        {safeProducts.map((product) => (
          <div key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">{product.name}</h2>
            <p className="mt-2 text-slate-600">{product.description}</p>
            <p className="mt-4 text-slate-900 font-bold">{product.price} €</p>
          </div>
        ))}
      </div>
    </main>
  );
}
