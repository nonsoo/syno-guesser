import { GameState } from "@/utils/store/GameStore/gameStore.types";

const mockInitialState: GameState = {
  wordOfDay: "happy",
  gameState: {
    status: "in-progress",
    winState: "none",
    dayOfPlay: 42,
  },
  archivedGame: false,
  myLives: 6,
  guessLst: [],
  synonyms: ["cheerful", "joyful", "content", "pleased"],
  availableHints: [
    "delighted",
    "smile",
    "glad",
    "sunny",
    "smiling",
    "laughing",
    "blessed",
    "merry",
  ],
};

const mockTriggerWords: string[] = [
  "sadness",
  "unhappy",
  "sad",
  "sorrow",
  "grief",
  "depressed",
];

export const mockGame = {
  initialState: mockInitialState,
  triggerWords: mockTriggerWords,
};
