import axios from "axios";
import { baseURL } from "./url.function";
import mapData from "./mapdata.function";

interface R {
  status: string;
  value: object;
}

const axiosHelper = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const dataFromAPI = async () => {
  const NUMBER_OF_REQUESTS = 2;
  const requestToAPI = [...Array(NUMBER_OF_REQUESTS + 1).keys()].map(
    (id: number) => axiosHelper(baseURL(id))
  );

  const resolveOfPromise = await Promise.allSettled(requestToAPI);
  const fullFilled = resolveOfPromise.filter(
    ({ status }) => status !== "rejected"
  ) as R[];

  const mapped = mapData(fullFilled.map(e => e.value));
  console.log(mapped);
};
