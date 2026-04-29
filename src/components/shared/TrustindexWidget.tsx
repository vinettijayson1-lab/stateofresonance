'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Trustindex widget token (the value after the `?` in the loader URL) */
  token: string;
  /** Which Trustindex loader to use. Defaults to the standard `loader.js`. */
  loader?: 'loader' | 'loader-feed' | 'loader-cert';
  className?: string;
};

/**
 * Trustindex's loader scripts use `document.currentScript.parentNode` to know
 * where to insert the widget. Empty `<div data-url="...">` placeholders do
 * nothing — the script tag itself must be in the DOM at the desired location.
 *
 * This component creates a container div on the client and appends the Trustindex
 * loader script inside it, which is the only reliable way to render the widget.
 */
export default function TrustindexWidget({ token, loader = 'loader', className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Don't double-inject on remount or React strict-mode double effects
    if (container.dataset.tiInjected === 'true') return;
    container.dataset.tiInjected = 'true';

    const script = document.createElement('script');
    script.src = `https://cdn.trustindex.io/${loader}.js?${token}`;
    script.async = true;
    container.appendChild(script);

    return () => {
      // On hot-reload / unmount we don't try to clean up the rendered widget,
      // but we do clear our flag so a fresh mount can re-inject.
      if (container) container.dataset.tiInjected = 'false';
    };
  }, [token, loader]);

  return <div ref={containerRef} className={className} aria-label="Verified customer reviews" />;
}
