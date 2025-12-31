'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import AOSInitializer from './AOSInitializer';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isWatchPage = pathname?.includes('/watch');

    return (
        <>
            {!isWatchPage && <Navbar />}
            <AOSInitializer />
            <main>{children}</main>
            {!isWatchPage && <Footer />}
        </>
    );
}
