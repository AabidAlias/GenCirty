import { navigate } from "../router";

export default function RouterLink({ to, onClick, ...props }) {
  return (
    <a
      {...props}
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        // Let the browser handle new-tab, right-click, and modified clicks.
        if (props.target === "_blank") return;
        if (e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (!to || typeof to !== "string") return;
        if (to.startsWith("http:") || to.startsWith("https:") || to.startsWith("mailto:")) return;

        e.preventDefault();
        navigate(to);
      }}
    />
  );
}

