/**
 * App.jsx — Routes now include /terms and /privacy
 */
import { Component, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import VerifyPage from "./pages/VerifyPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-400 mb-6 font-mono bg-gray-50 p-3 rounded-lg">
              {this.state.error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => { localStorage.removeItem("cert_user"); window.location.href = "/"; }}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
            >
              Clear & Go Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppRouter() {
  const { user, loading } = useAuth();
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">🎓</div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Public pages — always accessible regardless of login
  if (path === "/verify")  return <VerifyPage />;
  if (path === "/terms")   return <TermsPage />;
  if (path === "/privacy") return <PrivacyPage />;

  // Auth gate
  if (user) return <Dashboard />;
  return <LandingPage />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ErrorBoundary>
  );
}
