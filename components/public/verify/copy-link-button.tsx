"use client";

import { useState } from "react";

export function CopyLinkButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/verify?code=${encodeURIComponent(code)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied — nothing more we can do here.
    }
  }

  return (
    <button type="button" className="btn btn-outline btn-sm" onClick={handleCopy}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="1" />
        <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
      </svg>
      {copied ? "Copied" : "Copy verification link"}
    </button>
  );
}
