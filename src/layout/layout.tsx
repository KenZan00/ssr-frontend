import type { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

interface prop {
    children: ReactNode;
}

export default function Layout({children}: prop) {
    return (
        <div className="layout-container">
            <Header />
            <main className='main' id="main">{children}</main>
            <Footer />
        </div>
    )
}
