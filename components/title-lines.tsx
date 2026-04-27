type TitleLinesProps = {
  text: string;
  lines: readonly string[];
  lineTestId?: string;
  preventWrap?: boolean;
};

export function TitleLines({ text, lines, lineTestId, preventWrap = false }: TitleLinesProps) {
  const lineClassName = ["block", preventWrap ? "sm:whitespace-nowrap" : ""].filter(Boolean).join(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="block">
        {lines.map((line) => (
          <span key={line} data-testid={lineTestId} className={lineClassName}>
            {line}
          </span>
        ))}
      </span>
    </>
  );
}
