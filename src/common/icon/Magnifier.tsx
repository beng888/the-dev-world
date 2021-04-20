interface Props {
  strokeWidth?: number;
  stroke?: string;
}

const Magnifier: React.FC<Props> = ({ strokeWidth, stroke }) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M10 35 A1 1 0 0 1 60 35 A1 1 0 0 1 10 35"
      />
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M85 85 L52.5 52.5"
      />
    </svg>
  );
};

export default Magnifier;
