import {ReactNode} from 'react'
import dynamic from 'next/dynamic';


type AuthenticatedLayoutProps = {
    children: ReactNode
}
const Authenticated = dynamic(() => import('../../util/authenticated'), {
    ssr: false, // Disable server-side rendering
});

export default function AuthenticatedLayout({children}: AuthenticatedLayoutProps) {
    return (
        <Authenticated>
            {children}
        </Authenticated>
    )
}