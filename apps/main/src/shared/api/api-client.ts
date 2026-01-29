import axios from "axios";

type ClientConfig = {
  baseUrl: string;
};

const getClient = ({ baseUrl }: ClientConfig) => {
  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return client;
};

const apiV1Client = getClient({ baseUrl: "https://api.example.com/api/v1" });

export { apiV1Client };
