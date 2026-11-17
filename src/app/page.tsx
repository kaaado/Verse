import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()

  let isConnected = false
  let statusMessage = ''
  let latencyMs = 0

  const start = Date.now()
  try {
    const { data, error } = await supabase.auth.getSession()
    latencyMs = Date.now() - start
    if (!error) {
      isConnected = true
      statusMessage = 'Successfully connected to Supabase backend.'
    } else {
      statusMessage = error.message
    }
  } catch (err: any) {
    statusMessage = err?.message || 'Failed to connect to Supabase.'
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-12 text-slate-100 font-sans">
      <main className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">THE YACINEVERSE</h1>
            <p className="text-xs text-slate-400">Next.js App Router + Supabase Connection</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Supabase Status</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isConnected
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                {isConnected ? 'ONLINE' : 'DEGRADED'}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-400">{statusMessage}</p>

            {isConnected && (
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs">
                <div>
                  <span className="text-slate-500">API Endpoint:</span>
                  <p className="font-mono text-slate-300 truncate">
                    {process.env.NEXT_PUBLIC_SUPABASE_URL}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Handshake Latency:</span>
                  <p className="font-mono text-emerald-400">{latencyMs} ms</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Configuration
            </h2>
            <ul className="mt-3 space-y-2 text-xs font-mono text-slate-300">
              <li className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                <span>Framework:</span>
                <span className="text-slate-100">Next.js 16 (App Router)</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                <span>SSR Package:</span>
                <span className="text-slate-100">@supabase/ssr</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                <span>Client Helpers:</span>
                <span className="text-emerald-400">utils/supabase/server.ts</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Session Middleware:</span>
                <span className="text-emerald-400">src/middleware.ts</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
