import Image from "next/image";

/**
 * Official marks are shown on white tiles in both themes — the MCA wordmark is
 * dark navy and would vanish on the dark-mode background.
 */
const RECOGNITIONS = [
  {
    name: "Ministry of Micro, Small & Medium Enterprises (MSME)",
    src: "/images/recognition/msme.svg",
    width: 512,
    height: 512,
  },
  {
    name: "Startup India (DPIIT)",
    src: "/images/recognition/startup-india.png",
    width: 222,
    height: 82,
  },
  {
    name: "Ministry of Corporate Affairs (MCA)",
    src: "/images/recognition/mca.svg",
    width: 252,
    height: 110,
  },
];

/** Compact strip that closes the hero, so it is seen on the first screen. */
export function RecognitionStrip() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-5 border-t border-border pt-[clamp(16px,3dvh,28px)]">
      <div className="flex max-w-[460px] flex-col gap-1.5">
        <span className="eyebrow">Recognised by</span>
        <span className="text-lg font-bold leading-snug tracking-[-0.01em]">
          Our partner companies are recognised by MSME, Startup India and MCA.
        </span>
      </div>

      <ul className="m-0 grid w-full list-none grid-cols-3 gap-3 p-0 sm:flex sm:w-auto">
        {RECOGNITIONS.map((item) => (
          <li
            key={item.src}
            className="flex h-16 min-w-0 items-center justify-center rounded-card border border-border bg-white px-3 sm:w-[156px] sm:px-4"
          >
            <Image
              src={item.src}
              alt={item.name}
              title={item.name}
              width={item.width}
              height={item.height}
              unoptimized
              className="h-11 w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
