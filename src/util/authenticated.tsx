'use client'
import {ReactNode} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";

type AuthenticatedProps = {
    children: ReactNode,
}
export default function Authenticated({children}: AuthenticatedProps) {
    const {user} = useUser();
    const router = useRouter()

    if (!user) router.push('/api/auth/login')

    return <>{children}</>
}