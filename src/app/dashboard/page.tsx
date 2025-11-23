import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, description, price")
    .limit(6);

  const safeProducts: Product[] = products ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-600">Panel</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Bienvenido, {session.user.email}
          </h1>
          <p className="text-slate-600">
            Aquí construiremos los módulos de productos, pedidos y usuarios.
          </p>
        </header>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Productos
              </p>
              <p className="text-sm text-slate-600">
                Listado inicial desde Supabase.
              </p>
            </div>
            {productsError ? (
              <span className="text-sm text-red-600">{productsError.message}</span>
            ) : null}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {safeProducts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-6 text-center text-sm text-slate-600">
                Aún no hay productos cargados. Añade algunos en Supabase para
                verlos aquí.
              </div>
            ) : (
              safeProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">
                        {product.name}
                      </h2>
                      {product.description ? (
                        <p className="text-sm text-slate-600">
                          {product.description}
                        </p>
                      ) : null}
                    </div>
                    {product.price != null ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                        {(product.price / 100).toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
