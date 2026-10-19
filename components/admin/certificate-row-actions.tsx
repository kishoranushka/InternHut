"use client";

import { useTransition } from "react";
import { restoreCertificate, revokeCertificate } from "@/lib/actions/certificate-actions";
import { Button } from "@/components/ui/button";

export function CertificateRowActions({
  id,
  code,
  revoked,
}: {
  id: string;
  code: string;
  revoked: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/verify?code=${encodeURIComponent(code)}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-outline btn-sm"
      >
        View
      </a>
      {revoked ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => {
            if (confirm(`Restore ${code}? It will show as valid again.`)) {
              startTransition(() => restoreCertificate(id));
            }
          }}
        >
          Restore
        </Button>
      ) : (
        <Button
          type="button"
          variant="danger"
          size="sm"
          disabled={isPending}
          onClick={() => {
            const reason = prompt(`Why is ${code} being revoked? This reason is shown publicly on the verify page.`);
            if (reason === null) return;
            startTransition(async () => {
              const result = await revokeCertificate(id, reason);
              if ("error" in result) alert(result.error);
            });
          }}
        >
          Revoke
        </Button>
      )}
    </div>
  );
}
