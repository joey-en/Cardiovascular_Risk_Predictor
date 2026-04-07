import type { CSSProperties } from "react";

type MaterialIconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  style?: CSSProperties;
};

const defaultVariation =
  "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" as const;
const filledVariation = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" as const;

export function MaterialIcon({ name, className = "", filled, style: styleProp }: MaterialIconProps) {
  const style: CSSProperties = {
    fontVariationSettings: filled ? filledVariation : defaultVariation,
    ...styleProp,
  };

  return (
    <span className={`material-symbols-outlined ${className}`.trim()} style={style}>
      {name}
    </span>
  );
}
