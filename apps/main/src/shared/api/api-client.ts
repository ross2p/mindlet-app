import { getApiClient } from "../configs/api-client";

const apiV1Client = getApiClient({ baseUrl: "http://localhost:3000/api/v1" });

export { apiV1Client };
