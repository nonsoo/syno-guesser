import { ReactNode, SetStateAction } from "react";
export interface endgameProps {
  secretWord: string;
  winState: boolean;
  myGuesses: userGuessLst[];
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

export interface triggerWord {
  word: string;
  score: number;
}

export interface userGuessLst {
  id: string;
  word: string;
  statusColour: "hsl(111, 32%, 38%)" | "hsl(0, 84%, 68%)";
}

export type statusColour = "hsl(111, 32%, 38%)" | "hsl(0, 84%, 68%)";

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
  totalGuessAllowed: number;
  randomizedHints: synonyms;
}

type iSetState<T> = (value: SetStateAction<T>) => void;

export type IonGetHint = (
  lst_of_random_synonyms: synonyms,
  setSynos: iSetState<synonyms>,
  setMyLives: iSetState<number>,
  setGameState: iSetState<boolean>,
  myLives: number,
  offsetDate: number,
  secretWord: string,
  winState: boolean,
  guessLst: userGuessLst[],
  synos: synonyms
) => void;

export type IonGuess = (
  e: any,
  myGuess: string,
  wordSet: Set<string>,
  trgWords: string[],
  synonyms: synonyms,
  secretWord: string,
  winState: boolean,
  myLives: number,
  guessLst: userGuessLst[],
  synos: synonyms,
  offsetDate: number,
  setMyGuess: iSetState<string>,
  setGameState: iSetState<boolean>,
  setWinState: iSetState<boolean>,
  setGuessLst: iSetState<userGuessLst[]>,
  setMyLives: iSetState<number>,
  setShowAlert: () => void
) => void;

export type Iis_guess_in_word_lst_func = (
  wordSet: Set<string>,
  myGuess: string,
  trgWords: string[],
  synonyms: synonyms
) => boolean;
