export interface endgameProps {
  secretWord: string;
  numGuesses: number;
}

type synonyms = string[];

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
