import { getApiClient } from "../configs/api-client";

const apiV1Client = getApiClient({ baseUrl: "https://api.example.com/api/v1" });

export { apiV1Client };
