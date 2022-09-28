import axios from "axios";

interface options {
  headers: {};
}

const fetchData = async (route: string, config?: options) => {
  let data;

  if (config) {
    data = await axios.get(route, config);
  } else {
    data = await axios.get(route);
  }

  return data.data;
};

export default fetchData;
