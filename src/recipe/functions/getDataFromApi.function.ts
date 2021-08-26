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

export const dataFromAPI = async (numberOfRequest: number) => {
  const requestToAPI = [...Array(numberOfRequest + 1).keys()]
    .slice(1)
    .map((id: number) => axiosHelper(baseURL(id)));

  const resolveOfPromise = await Promise.allSettled(requestToAPI);
  const fullFilled = resolveOfPromise.filter(
    ({ status }) => status !== "rejected"
  ) as R[];

  return mapData(fullFilled.map(e => e.value));
};
