'use client';

import { useAuth } from "@/features/auth";
import { Loading } from "@/shared";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

export const UnauthorisedRoute = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { isPending, isAuthorized } = useAuth();
    
    useEffect(() => {
        if (!isPending && isAuthorized) {
            router.replace('/'); 
        }
    }, [isAuthorized, isPending, router]);

    if (isPending) return <Loading />;
    
    if (isAuthorized) return null;
    
    return <>{children}</>;
};