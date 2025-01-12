"use client";

import { createContext } from "react";

interface ScoutScreenContextType {
  screens: {
    component: React.ReactNode;
    canGoBack: boolean;
    canGoForward: boolean;
  }[];
  nextScreen: () => void;
  prevScreen: () => void;
  goToScreen: (screenIndex: number) => void;
  currentScreenIndex: number;
}

export const ScoutScreenContext = createContext<ScoutScreenContextType>(
  {} as ScoutScreenContextType
);
