import { randomInt } from "node:crypto";

/**
 * Certificate verification codes look like `GT-2026-7K4M-9QXD`:
 * brand prefix, issue year, then 8 random characters.
 *
 * - Random, never sequential, so nobody can step through codes and list
 *   every student's certificate. 32^8 ≈ 1.1 trillion codes per year.
 * - Crockford base-32 alphabet (no I, L, O, U), so a code read off paper
 *   can't be mistyped; normalizeCertificateCode maps O→0 and I/L→1 back.
 */
const PREFIX = "GT";
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const RANDOM_LENGTH = 8;

export const CERTIFICATE_CODE_EXAMPLE = "GT-2026-7K4M-9QXD";

export function generateCertificateCode(issueDate = new Date()) {
  let random = "";
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    random += ALPHABET[randomInt(ALPHABET.length)];
  }
  return `${PREFIX}-${issueDate.getFullYear()}-${random.slice(0, 4)}-${random.slice(4)}`;
}

/**
 * Turns whatever someone typed ("gt 2026 7k4m 9qxd", "GT20267K4M9QXD",
 * "GT-2026-7K4M-9QXO") into the stored form. Anything that doesn't look like
 * a Graditute code is returned uppercased and trimmed, so lookups still work.
 */
export function normalizeCertificateCode(input: string) {
  const compact = input.toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (!compact.startsWith(PREFIX)) return input.trim().toUpperCase();

  // Fix look-alikes everywhere after the prefix, including the year ("2O26").
  const rest = compact.slice(PREFIX.length).replace(/O/g, "0").replace(/[IL]/g, "1");
  const match = /^(\d{4})([0-9A-Z]{8})$/.exec(rest);
  if (!match) return input.trim().toUpperCase();

  return `${PREFIX}-${match[1]}-${match[2].slice(0, 4)}-${match[2].slice(4)}`;
}
