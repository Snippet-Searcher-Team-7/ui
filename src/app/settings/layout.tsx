import {ReactNode} from 'react'
import Authenticated from "@/util/authenticated";


type AuthenticatedLayoutProps = {
    children: ReactNode
}

export default function AuthenticatedLayout({children}: AuthenticatedLayoutProps) {
    return (
        <Authenticated>
            {children}
        </Authenticated>
    )
}