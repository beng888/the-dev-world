import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalContextWrapper({ children }) {
  const [style, setStyle] = useState({
    color: null,
    mobile: true,
    showNav: false,
    navScrollDistance: 0,
  });

  const [route, setRoute] = useState({
    changingRoute: false,
    newRoute: null,
    isPageTransitioning: false,
  });

  const [nav, setNav] = useState({
    navScrollTraveled: 0,
    navScrollDistance: 0,
  });

  const [loco, setLoco] = useState({
    resetLocomotive: false,
  });

  const [globalKey, setGlobalKey] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        style: [style, setStyle],
        route: [route, setRoute],
        nav: [nav, setNav],
        loco: [loco, setLoco],
        globalKey: [globalKey, setGlobalKey],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
