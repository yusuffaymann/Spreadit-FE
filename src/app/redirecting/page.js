"use client";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import storeCookies from "../utils/storeCookies";
import getCookies from "../utils/getCookies";
import { useRouter } from "next/navigation";

function RedirectFromGoogle()
{
    const router = useRouter();
    async function getMySession() {
        const session = await getSession();
        if (session) {
            return session.data;
        }
    }

    useEffect(() => {
        getMySession().then((data) => {
            if (data) {
                storeCookies(data);
            }
        }).then(() => {router.push('/')});
    }, []);
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}

export default RedirectFromGoogle;