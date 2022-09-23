import axios from "axios";

const fetchData = async (route: string) => {
  const data = await axios.get(route);

  return data.data;
};

export default fetchData;
