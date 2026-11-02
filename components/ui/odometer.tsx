// CSS-only rolling counter. Renders the final formatted value for screen readers and
// a decorative odometer of digit strips that roll into place on load.
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  let digitIndex = 0;
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span className="odo" aria-hidden="true">
        {value.split("").map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const d = parseInt(ch, 10);
          const delay = `${(digitIndex++ * 0.07).toFixed(2)}s`;
          return (
            <span key={i} className="odo-digit">
              <span className="odo-strip" style={{ ["--d" as string]: d, ["--delay" as string]: delay }}>
                {DIGITS.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
