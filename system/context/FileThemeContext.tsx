import { StaticImageData } from "next/image";
import React, { useEffect, createContext, useState, useMemo } from "react";

import VaporwaveArcade from "../../components/filetheme/VaporwaveArcade";
import Love from "../../components/filetheme/Love";
import TangGang from "../../components/filetheme/TangGang";
import aWizard from "../../components/filetheme/aWizard";

export type FileTheme = "love" | "vaporwave-arcade" | "tang-gang" | "awizard";

export interface FileThemeCustomOptions {
  name: string;
  EtherscanIcon: StaticImageData;
  FarmIcon: StaticImageData;
  LoveIcon: StaticImageData;
  FireIcon: StaticImageData;
  PaperIcon: StaticImageData;
  BridgeIcon: StaticImageData;
  HeartBridgeIcon: StaticImageData;
  MglthIcon: StaticImageData;
  OmakIcon: StaticImageData;
  BabiesIcon: StaticImageData;
  WTIcon: StaticImageData;
  GooeyIcon: StaticImageData;
  PokeganIcon: StaticImageData;
  UniswapIcon: StaticImageData;
  WalletIcon: StaticImageData;
  SettingsIcon: StaticImageData;
  ShutdownIcon: StaticImageData;
  startLoveIcon: string;
  startIcon: string;
  closeIcon: string;
  background: string;
  telegramIcon: string;
  discordIcon: string;
  TwitterIcon: StaticImageData;
  HeartBreakIcon: StaticImageData;
  heartbreakActiveButton: StaticImageData;
  heartbreakExitButton: StaticImageData;
  heartbreakDeadButton: StaticImageData;
  ChiaIcon: StaticImageData;
  GobyIcon: StaticImageData;
  SpaceIcon: StaticImageData;
  MintIcon: StaticImageData;
  TradeIcon: StaticImageData;
  DexieIcon: StaticImageData;
  SageIcon: StaticImageData;
  TibetIcon: StaticImageData;
  FarmerIcon: StaticImageData;
  CLinksIcon: StaticImageData;
  HoaIcon: StaticImageData;
  NinemmIcon: StaticImageData;
  TangbearsIcon: StaticImageData;
  BasebearsIcon: StaticImageData;
  DexscreenerIcon: StaticImageData;
  TGtwitterIcon: StaticImageData;
  TGDiscordIcon: StaticImageData;
  ArtIcon: StaticImageData;
  SpeechlessIcon: StaticImageData;
  LoveBearIcon: StaticImageData;
  aWizardIcon: StaticImageData;
  DBCIcon: StaticImageData;
  PainIcon: StaticImageData;
  NemoIcon: StaticImageData;
  NemoRinoIcon: StaticImageData;
  MaxIcon: StaticImageData;
  TreeIcon: StaticImageData;
  VoteIcon: StaticImageData;
}

export interface IFileTheme {
  fileTheme: FileTheme;
  setFileTheme: (id: FileTheme) => void;
  files: FileThemeCustomOptions;
  wallpaper?: string;
  setWallpaper: (wallpaper: string) => void;
}

const defaultTheme: FileTheme = "awizard";

export const themeMap: { [key in FileTheme]: Partial<FileThemeCustomOptions> } = {
  love: Love,
  "vaporwave-arcade": VaporwaveArcade,
  "tang-gang": TangGang,
  "awizard": aWizard,
};

export const FileThemeContext = createContext<IFileTheme>({} as IFileTheme);

export const FileThemeProvider = ({ children }: { children: any }) => {
  const [wallpaper, setWallpaper] = React.useState<string>();
  const [fileTheme, _setFileTheme] = React.useState<FileTheme>(() => {
    return defaultTheme;
  });

  const setBodyThemeClass = (theme: FileTheme) => {
    const body = document.querySelector("body");
    body!.className = `theme-${theme}`;
  };

  useEffect(() => {
    const localStorageFileTheme = localStorage.getItem("fileTheme");
    if (!localStorageFileTheme) {
      setBodyThemeClass(defaultTheme);
      return;
    }
    setBodyThemeClass(localStorageFileTheme as FileTheme);
  }, []);

  const files = React.useMemo(() => {
    return {
      ...themeMap[defaultTheme],
      ...themeMap[fileTheme],
    } as FileThemeCustomOptions;
  }, [fileTheme]);

  const setFileTheme = (newTheme: FileTheme) => {
    localStorage.setItem("fileTheme", newTheme);
    _setFileTheme(newTheme);
    setBodyThemeClass(newTheme);
  };

  return (
    <FileThemeContext.Provider
      value={{
        fileTheme,
        setFileTheme,
        files,
        setWallpaper,
        wallpaper,
      }}
    >
      <div
        className={
          fileTheme === "love"
            ? "theme-love"
            : fileTheme === "vaporwave-arcade"
            ? "theme-vaporwave-arcade"
            : fileTheme === "tang-gang"
            ? "theme-tang-gang"
            : "theme-awizard"
        }
      >
        {children}
      </div>
    </FileThemeContext.Provider>
  );
};

