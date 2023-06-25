import React, { createContext, useState } from "react";

export const DrawerContext = createContext({
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

export const DrawerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const contextValue = {
    isDrawerOpen,
    toggleDrawer,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};
