"use client";

import { createContext } from "react";

interface ScoutScreenContextType {
  screens: {
    component: React.ReactNode;
    canGoBack: boolean;
  }[];
  nextScreen: () => void;
  prevScreen: () => void;
  goToScreen: (screenName: string) => void;
  currentScreenIndex: number;
}

export const ScoutScreenContext = createContext<ScoutScreenContextType>(
  {} as ScoutScreenContextType
);
