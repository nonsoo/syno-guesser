import { ReactNode } from "react";
export interface endgameProps {
  secretWord: string;
  winState: boolean;
  myGuesses: userGuessLst[];
  children: ReactNode;
}

export type synonyms = string[];
export interface synonym {
  language: string;
  text: string;
}

export interface newResData {
  id: string;
  metadata: {
    operation: string;
    provider: string;
    scheme: string;
  };
  results: {
    id: string;
    languages: string;
    lexicalEntries: {
      entries: {
        senses: {
          id: string;
          synonyms: synonym[];
          subsenses: {
            id: string;
            synonyms: synonym[];
          }[];
        }[];
      }[];
    }[];
  }[];
  word: string;
}

export type entries = newResData["results"][0]["lexicalEntries"][0]["entries"];

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

export interface triggerWord {
  word: string;
  score: number;
}

export interface userGuessLst {
  id: string;
  word: string;
  statusColour: string;
}

export interface StoredGameState {
  secretWord: string;
  winState: boolean;
  gameState: boolean;
  myGuesses: userGuessLst[];
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
