// Minimal client-side navigation helper for this app's custom router (App.jsx).
export function navigate(to) {
  if (!to || typeof to !== "string") return;
  if (window.location.pathname === to) return;
  window.history.pushState({}, "", to);
  // App.jsx listens to popstate to update its internal `path` state.
  window.dispatchEvent(new PopStateEvent("popstate"));
}

