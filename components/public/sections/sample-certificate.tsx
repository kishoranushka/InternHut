/**
 * Sample certificate artwork. Carries an explicit "SAMPLE" banner and
 * watermark so it can never be mistaken for an issued credential.
 */
export function SampleCertificate() {
  return (
    <div className="relative bg-muted p-panel-x">
      <div className="absolute top-0 left-0 z-[2] inline-flex h-[30px] items-center gap-2 bg-warning px-3 text-caption font-bold tracking-[0.06em] text-white">
        SAMPLE · NOT AN ISSUED CREDENTIAL
      </div>

      <div className="relative aspect-[1.414/1] overflow-hidden bg-card p-[clamp(10px,1.4vw,18px)] shadow-float">
        <div className="flex h-full flex-col justify-between border border-navy p-[clamp(14px,2.4vw,32px)]">
          <div className="flex items-start justify-between gap-3">
            <span className="flex items-center gap-[clamp(8px,1vw,14px)]">
              <span className="text-[clamp(12px,1.2vw,16px)] font-bold tracking-[-0.01em]">
                Graditute
              </span>
              <span className="block h-4 w-px bg-border-strong" />
              <span className="text-[clamp(9px,0.85vw,12px)] font-semibold text-muted-foreground">
                [Partner company]
              </span>
            </span>
            <span className="text-[clamp(9px,0.8vw,11px)] font-bold tracking-[0.08em] text-muted-foreground">
              GT-2026-SAMP-LE00
            </span>
          </div>

          <div className="flex flex-col gap-[clamp(4px,0.8vw,10px)]">
            <span className="text-[clamp(8px,0.75vw,10px)] font-bold uppercase tracking-[0.2em] text-accent">
              Certificate of completion
            </span>
            <span className="text-[clamp(20px,2.8vw,38px)] font-bold leading-[1.05] tracking-[-0.035em]">
              Sample Student Name
            </span>
            <span className="max-w-[400px] text-[clamp(9px,0.9vw,12px)] leading-[1.55] text-body">
              has completed the 8-week internship{" "}
              <b className="text-navy">Frontend Development with React</b> with
              [Partner company], delivering all project milestones under mentor
              review.
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex gap-[clamp(12px,2vw,32px)]">
              <div className="flex min-w-[90px] flex-col gap-[3px] border-t border-navy pt-1.5">
                <span className="text-[clamp(8px,0.8vw,11px)] font-bold">
                  Company mentor
                </span>
                <span className="text-[clamp(7px,0.7vw,10px)] text-muted-foreground">
                  [Partner company]
                </span>
              </div>
              <div className="flex min-w-[90px] flex-col gap-[3px] border-t border-navy pt-1.5">
                <span className="text-[clamp(8px,0.8vw,11px)] font-bold">
                  Issued [DATE]
                </span>
                <span className="text-[clamp(7px,0.7vw,10px)] text-muted-foreground">
                  Verify at graditute/verify
                </span>
              </div>
            </div>

            <svg
              viewBox="0 0 21 21"
              className="h-auto w-[clamp(40px,5vw,64px)] flex-none"
              role="img"
              aria-label="Sample QR code"
            >
              <rect width="21" height="21" fill="var(--card)" />
              <g fill="var(--navy)">
                <path d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0z" />
              </g>
              <g fill="var(--card)">
                <path d="M1 1h5v5H1zM15 1h5v5h-5zM1 15h5v5H1z" />
              </g>
              <g fill="var(--navy)">
                <path d="M2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2z" />
                <path d="M9 1h2v1H9zM12 2h1v1h-1zM8 3h1v2H8zM10 3h1v1h-1zM11 4h1v2h-1zM9 5h1v1H9zM8 8h2v1H8zM11 8h1v2h-1zM13 8h2v1h-2zM16 8h1v1h-1zM18 8h2v1h-2zM20 9h1v2h-1zM9 10h1v1H9zM14 10h2v1h-2zM8 11h1v2H8zM17 11h1v2h-1zM12 12h2v1h-2zM19 12h1v1h-1zM10 13h1v1h-1zM15 13h1v2h-1zM9 14h2v1H9zM12 14h1v2h-1zM18 14h2v1h-2zM8 16h1v1H8zM10 16h1v2h-1zM14 16h2v1h-2zM17 16h1v2h-1zM20 16h1v1h-1zM12 18h2v1h-2zM8 19h2v1H8zM15 18h1v1h-1zM18 19h2v1h-2zM11 20h1v1h-1zM14 20h2v1h-2z" />
              </g>
            </svg>
          </div>
        </div>

        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] whitespace-nowrap text-[clamp(56px,9vw,120px)] font-extrabold tracking-[0.08em] text-[rgba(180,83,9,0.08)]">
          SAMPLE
        </span>
      </div>
    </div>
  );
}
