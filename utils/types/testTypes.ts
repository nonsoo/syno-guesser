import { resData } from "./projectTypes";

interface Props {
  data: resData[];
  wordOfDay: string;
}

const respData: resData = {
  def: "",
  fl: "",
  hwi: { hw: "" },
  meta: {
    id: "1",
    uuid: "23232desf3",
    src: "Source Text",
    stems: [""],
    syns: [["hello"], ["hi"]],
    target: {
      tsrc: "http://localhost",
      tuuid: "",
    },
  },
  shortdef: ["this is a short def"],
};

export const mockData: Props = { data: [respData], wordOfDay: "Word" };
