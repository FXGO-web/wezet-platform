import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Users
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">—</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Products
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">—</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Orders
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">—</p>
          </div>
        </div>
      </div>
    </main>
  );
}
