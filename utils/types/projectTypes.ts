import { ReactNode } from "react";

import { wordListThemes } from "../constants/word-lists";
export interface EndgameProps {
  secretWord: string;
  winState: boolean;
  myGuesses: UserGuessLst[];
  gamesPlayed: number | null;
  winStreak: number | null;
  maxWinStreak: number | null;
  archivedGame: boolean;
  children: ReactNode;
}

export type Synonyms = string[];

export interface ResData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  def: any;
  fl: string;
  hwi: { hw: string };
  meta: {
    id: string;
    uuid: string;
    src: string;
    stems: string[];
    syns: Synonyms[];
    target: {
      tsrc: string;
      tuuid: string;
    };
  };
  shortdef: string[];
}

export interface TriggerWord {
  word: string;
  score: number;
}

export interface UserGuessLst {
  id: string;
  word: string;
  statusColour: "hsl(111, 32%, 38%)" | "hsl(0, 84%, 68%)";
}

export type StatusColour = "hsl(111, 32%, 38%)" | "hsl(0, 84%, 68%)";
export type WordListThemeConstant = {
  [key: string]: { themeList: string[]; startDate: Date };
};
export type WordListTheme = keyof typeof wordListThemes;
export type WordListThemes = typeof wordListThemes;
export type WordListSetMap = Map<
  keyof WordListThemes,
  Set<WordListThemes[keyof WordListThemes]["themeList"][number]>
>;
