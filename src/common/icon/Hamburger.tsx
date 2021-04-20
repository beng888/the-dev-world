import { MouseEventHandler } from "react";

interface Props {
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: MouseEventHandler;
}

const Hamburger: React.FC<Props> = ({
  stroke,
  strokeWidth,
  onClick,
  className,
}) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className}`} onClick={onClick}>
      <path
        stroke={stroke}
        strokeWidth={strokeWidth * 3}
        fill="none"
        d="M0 20 100 20"
      />{" "}
      <path
        stroke={stroke}
        strokeWidth={strokeWidth * 2}
        fill="none"
        d="M0 50 100 50"
      />{" "}
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M0 80 100 80"
      />
    </svg>
  );
};

export default Hamburger;
