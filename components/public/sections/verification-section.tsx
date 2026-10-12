import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { SampleCertificate } from "./sample-certificate";

export function VerificationSection() {
  return (
    <section className="px-section-x py-section-y-lg">
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-wide gap-y-14">
        <div className="min-w-0 flex-[6_1_460px]">
          <SampleCertificate />
        </div>

        <div className="flex min-w-0 flex-[5_1_360px] flex-col gap-7">
          <span className="eyebrow">Certificate verification</span>
          <h2 className="m-0 text-h2-sm font-bold">
            Every certificate can be checked in seconds.
          </h2>
          <p className="m-0 text-body-lg leading-[1.65] text-muted-foreground">
            Each certificate names the partner company and carries a unique ID
            and QR code. Employers and colleges can confirm the holder,
            internship, company, completion date and skills assessed.
          </p>

          <form
            action={ROUTES.verify}
            method="GET"
            role="search"
            className="flex flex-col gap-2"
          >
            <label htmlFor="home-certificate-id" className="text-sm font-bold">
              Certificate ID
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                id="home-certificate-id"
                name="code"
                type="text"
                placeholder="e.g. IS-2026-000000"
                className="input tnum h-13 w-auto flex-[1_1_220px]"
              />
              <button type="submit" className="btn btn-navy btn-lg">
                Verify
              </button>
            </div>
            <span className="text-meta text-muted-foreground">
              The ID is printed at the top right of every certificate.
            </span>
          </form>

          <Link href={ROUTES.verify} className="arrow-link text-ui">
            Go to the verification page <i>&rarr;</i>
          </Link>
        </div>
      </div>
    </section>
  );
}
