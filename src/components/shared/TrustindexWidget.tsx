'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Trustindex widget token (the value after the `?` in the loader URL) */
  token: string;
  /** Which Trustindex loader to use. Defaults to the standard `loader.js`. */
  loader?: 'loader' | 'loader-feed' | 'loader-cert';
  className?: string;
};

/**
 * Trustindex's loader scripts inject a widget at the script tag's DOM location
 * via `document.currentScript.parentNode.insertBefore(...)`. Empty `<div data-url="...">`
 * placeholders alone do nothing — the script tag itself must be present in the
 * DOM at the desired render location.
 *
 * This component creates a container div on mount, dynamically injects the
 * loader script inside it, and shows a graceful loading state while the widget
 * boots. Handles React strict-mode double-effects by tracking injection state.
 */
export default function TrustindexWidget({ token, loader = 'loader', className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Guard against double-injection (React strict mode / hot reload)
    if (container.dataset.tiInjected === 'true') return;
    container.dataset.tiInjected = 'true';

    const src = `https://cdn.trustindex.io/${loader}.js?${token}`;

    // If we've already loaded this exact loader globally, the widget will
    // still render at the script's parent location on re-execution. We
    // append a fresh script tag so the loader runs in this container's scope.
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    container.appendChild(script);

    // Watch for the loader to inject content so we can hide the loading state
    const observer = new MutationObserver(() => {
      // Loader has injected at least one element other than our script
      const hasWidget = Array.from(container.children).some(
        (el) => el.tagName !== 'SCRIPT'
      );
      if (hasWidget) {
        setHasContent(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: false });

    // Failsafe — if no content after 8s, clear loading state anyway so we
    // don't show an infinite spinner
    const timeout = window.setTimeout(() => {
      setHasContent(true);
      observer.disconnect();
    }, 8000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [token, loader]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={containerRef}
        className="w-full min-h-[200px]"
        aria-label="Verified customer reviews"
      />
      {!hasContent && (
        <div className="absolute inset-0 flex items-center justify-center text-[#525252] text-xs tracking-[0.15em] uppercase pointer-events-none">
          Loading reviews…
        </div>
      )}
    </div>
  );
}
