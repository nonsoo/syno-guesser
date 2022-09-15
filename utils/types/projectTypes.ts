import { ReactNode } from "react";
export interface endgameProps {
  secretWord: string;

  winState: boolean;
  myGuesses: string[];
  children: ReactNode;
}

export type synonyms = string[];

export interface resData {
  def: any;
  fl: string;
  hwi: { hw: string };
  meta: {
    id: string;
    uuid: string;
    src: string;
    stems: string[];
    syns: synonyms[];
    target: {
      tsrc: string;
      tuuid: string;
    };
  };
  shortdef: string[];
}

export interface StoredGameState {
  secretWord: string;
  winState: boolean;
  gameState: boolean;
  myGuesses: string[];
  synonyms: string[];
  myLives: number;
  dayOfPlay: number;
}

export interface StoredGameStatistics {
  gamesPlayed: number[];
  winStreak: number;
  maxWinStreak: number;
}

export interface BookmarkWord {
  secretWord: string;
  synonyms: synonyms;
}

export interface setupValues {
  offsetDate: number;
  totalGuessAllowed: number;
  synonymSet: Set<number>;
}
