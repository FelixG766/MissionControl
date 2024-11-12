"use client"
import { useUserContext } from "@/context/user/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const useRedirect = (redirect: string) => {
    const { getUserLoginStatus } = useUserContext();
    const router = useRouter();
    useEffect(() => {
        const redirectUser = async () => {
            try {
                const isUserLogged = await getUserLoginStatus();
                if (!isUserLogged) {
                    router.push(redirect);
                }
            } catch (error) {
                console.log("Error in redirect user.", error);
            }
        }
        redirectUser();
    }, [redirect, getUserLoginStatus, router])
}
export default useRedirect;