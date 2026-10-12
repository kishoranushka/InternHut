/** One filter group in the catalogue sidebar: a legend plus a list of radio or checkbox options. */
export function FilterGroup<T extends string>({
  legend,
  options,
  selected,
  onSelect,
  mode,
}: {
  legend: string;
  options: { value: T; label: string }[];
  selected: T[];
  onSelect: (value: T) => void;
  mode: "radio" | "checkbox";
}) {
  return (
    <fieldset className="m-0 flex flex-col border-0 p-0">
      <legend className="m-0 mb-2.5 p-0 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
        {legend}
      </legend>
      {options.map((option) => {
        const isOn = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            className={mode === "radio" ? "radio-btn" : "option-btn"}
            aria-pressed={isOn}
            onClick={() => onSelect(option.value)}
          >
            {mode === "radio" ? (
              <span className="radio-dot" />
            ) : (
              <span className="checkbox-box">
                {isOn && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}
