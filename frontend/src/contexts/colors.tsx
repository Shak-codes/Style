"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ColorsContextType = {
  colors: string[];
  dark: string[];
  colorIndex: number;
  setColorIndex: (i: number) => void;
};

const ColorsContext = createContext<ColorsContextType | undefined>(undefined);

interface ColorsProviderProps {
  children: ReactNode;
}

export const ColorsProvider: React.FC<ColorsProviderProps> = ({ children }) => {
  const colors = [
    "oklch(69.6% 0.17 162.48)",
    "oklch(63.7% 0.237 25.331)",
    "oklch(70.5% 0.213 47.604)",
    "oklch(76.9% 0.188 70.08)",
    "oklch(79.5% 0.184 86.047)",
    "oklch(76.8% 0.233 130.85)",
    "oklch(72.3% 0.219 149.579)",
    "oklch(69.6% 0.17 162.48)",
    "oklch(70.4% 0.14 182.503)",
    "oklch(71.5% 0.143 215.221)",
    "oklch(62.3% 0.214 259.815)",
    "oklch(58.5% 0.233 277.117)",
    "oklch(60.6% 0.25 292.717)",
    "oklch(62.7% 0.265 303.9)",
    "oklch(66.7% 0.295 322.15)",
    "oklch(65.6% 0.241 354.308)",
    "oklch(64.5% 0.246 16.439)",
  ];

  const dark = [
    "oklch(44.8% 0.119 151.328)",
    "oklch(50.5% 0.213 27.518)",
    "oklch(55.3% 0.195 38.402)",
    "oklch(55.5% 0.163 48.998)",
    "oklch(55.4% 0.135 66.442)",
    "oklch(53.2% 0.157 131.589)",
    "oklch(52.7% 0.154 150.069)",
    "oklch(50.8% 0.118 165.612)",
    "oklch(51.1% 0.096 186.391)",
    "oklch(52% 0.105 223.128)",
    "oklch(48.8% 0.243 264.376)",
    "oklch(45.7% 0.24 277.023)",
    "oklch(49.1% 0.27 292.581)",
    "oklch(49.6% 0.265 301.924)",
    "oklch(51.8% 0.253 323.949)",
    "oklch(52.5% 0.223 3.958)",
    "oklch(51.4% 0.222 16.935)",
  ];

  const unfocused = [
    "oklch(92.5% 0.084 155.995)",
    "oklch(90.5% 0.093 164.15)",
    "oklch(91% 0.096 180.426)",
    "oklch(91.7% 0.08 205.041)",
    "oklch(90.1% 0.058 230.902)",
    "oklch(88.2% 0.059 254.128)",
    "oklch(87% 0.065 274.039)",
    "oklch(89.4% 0.057 293.283)",
    "oklch(90.2% 0.063 306.703)",
    "oklch(90.3% 0.076 319.62)",
    "oklch(89.9% 0.061 343.231)",
    "oklch(89.2% 0.058 10.001)",
  ];

  const focusedText = "oklch(97% 0.001 106.424)";
  const unfocusedText = "oklch(86.9% 0.005 56.366)";

  const [colorIndex, setColorIndexRaw] = useState<number>(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem("colorIndex")
          : null;
      return raw ? Number(raw) : 0;
    } catch {
      return 0;
    }
  });

  const setColorIndex = (i: number) => {
    setColorIndexRaw(i);
    localStorage.setItem("colorIndex", String(i));
  };

  useEffect(() => {
    const safeIndex = Math.max(0, Math.min(colorIndex, colors.length - 1));
    const accent = colors[safeIndex];
    const accentDark = dark[safeIndex];

    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--accent-dark", accentDark);
    document.documentElement.style.setProperty(
      "--unfocused",
      "oklch(26.2% 0.051 172.552)"
    );
    document.documentElement.style.setProperty("--focused-text", focusedText);
    document.documentElement.style.setProperty(
      "--unfocused-text",
      unfocusedText
    );
  }, [colorIndex, colors, dark]);

  return (
    <ColorsContext.Provider value={{ colors, dark, colorIndex, setColorIndex }}>
      {children}
    </ColorsContext.Provider>
  );
};

export const useColors = (): ColorsContextType => {
  const context = useContext(ColorsContext);
  if (context === undefined) {
    throw new Error("useColors must be used within a ColorsProvider");
  }
  return context;
};
