import { Synonyms, UserGuessLst } from "@/utils/types/projectTypes";

export interface GameState {
  wordOfDay: string;
  gameState: {
    status: "in-progress" | "ended";
    winState: "win" | "lose" | "none";
    dayOfPlay: number;
  };
  myLives: number;
  guessLst: UserGuessLst[];
  synonyms: Synonyms;
  availableHints: Synonyms;
}

export interface GameActions {
  getHint: () => void;
  onGuess: ({
    myGuess,
    triggerWords,
    action,
  }: {
    myGuess: string;
    triggerWords: string[];
    action: () => void;
  }) => void;
}

export interface GameProps {
  synonyms: string[];
  wordOfDay: string;
  offsetDate: number;
}
