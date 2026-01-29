import { useMe } from "@/entities/user/hooks/useMe"

export const useAuth = () => {
    
    const {data: user, isPending} = useMe()
    return {
        user: user?.data,
        isAuthorized: Boolean(user?.data),
        isPending
    }
}