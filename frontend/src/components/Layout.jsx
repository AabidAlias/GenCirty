/**
 * components/Layout.jsx
 * App shell with sidebar navigation.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-black text-white border-b-4 border-brand-600 px-6 py-4 flex items-center gap-3">
        <span className="text-2xl">🎓</span>
        <div>
          <h1 className="text-lg font-extrabold leading-none tracking-tight">
            Smart Certificate Automation
          </h1>
          <p className="text-xs text-white/80">
            Generate &amp; send certificates at scale
          </p>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {children}
      </main>

      <footer className="text-center text-xs text-zinc-600 py-4">
        Smart Certificate Automation System &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
