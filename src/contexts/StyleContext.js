import { createContext, useContext, useEffect, useState } from "react";

const StyleContext = createContext(null);

export function StyleContextWrapper({ children }) {
  const [style, setStyle] = useState({
    color: null,
    mobile: false,
    isPageTransitioning: false,
    newRoute: null,
  });

  const responsive = () => {
    window.innerWidth < 768
      ? setStyle({ ...style, mobile: true })
      : setStyle({ ...style, mobile: false });
  };

  useEffect(() => {
    responsive();
    window.addEventListener("resize", responsive);
    return () => {
      window.removeEventListener("resize", responsive);
    };
  }, []);

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyleContext() {
  return useContext(StyleContext);
}
