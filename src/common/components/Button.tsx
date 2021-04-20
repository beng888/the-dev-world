const Button: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div className={`relative cursor-pointer group w-max ${className}`}>
      {children}
      {[...Array(2).keys()].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`absolute inset-0 duration-700 ease-out transform-gpu border border-white rounded-full ${
            i === 0
              ? "group-hover:scale-110 group-hover:opacity-50"
              : "group-hover:scale-150 group-hover:opacity-0"
          } `}
        />
      ))}
    </div>
  );
};

export default Button;
