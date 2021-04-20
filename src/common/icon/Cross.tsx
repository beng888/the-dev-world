import { MouseEventHandler } from "react";

interface Props {
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: MouseEventHandler;
}

const Cross: React.FC<Props> = ({
  stroke,
  strokeWidth,
  onClick,
  className,
}) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className}`} onClick={onClick}>
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M10 10 L90 90"
      />
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M90 10 L10 90"
      />
    </svg>
  );
};

export default Cross;
