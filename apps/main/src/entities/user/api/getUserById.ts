import { apiV1Client } from "@/shared";
import { type GlobalResponse, type UserEntity } from "@ross2p/types";

export const getUserById = async (userId: string): Promise<GlobalResponse<UserEntity>> => {
    const response = await apiV1Client.get(`/user/${userId}`);
    return response.data;
};