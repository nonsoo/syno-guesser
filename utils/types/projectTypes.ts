import { ReactNode, SetStateAction } from "react";
export interface EndgameProps {
  secretWord: string;
  winState: boolean;
  myGuesses: UserGuessLst[];
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

export interface StoredGameState {
  secretWord: string;
  winState: boolean;
  gameState: boolean;
  myGuesses: UserGuessLst[];
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
  synonyms: Synonyms;
}

export interface SetupValues {
  totalGuessAllowed: number;
  randomizedHints: Synonyms;
}

type SetState<T> = (value: SetStateAction<T>) => void;

export type IonGetHint = (
  lst_of_random_Synonyms: Synonyms,
  setSynos: SetState<Synonyms>,
  setMyLives: SetState<number>,
  setGameState: SetState<boolean>,
  myLives: number,
  offsetDate: number,
  secretWord: string,
  winState: boolean,
  guessLst: UserGuessLst[],
  synos: Synonyms
) => void;

export type IonGuess = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any,
  myGuess: string,
  wordSet: Set<string>,
  trgWords: string[],
  synonyms: Synonyms,
  secretWord: string,
  winState: boolean,
  myLives: number,
  guessLst: UserGuessLst[],
  synos: Synonyms,
  offsetDate: number,
  setMyGuess: SetState<string>,
  setGameState: SetState<boolean>,
  setWinState: SetState<boolean>,
  setGuessLst: SetState<UserGuessLst[]>,
  setMyLives: SetState<number>,
  setShowAlert: () => void
) => void;

export type FindInArray = (
  wordSet: Set<string>,
  myGuess: string,
  trgWords: string[],
  synonyms: Synonyms
) => boolean;
