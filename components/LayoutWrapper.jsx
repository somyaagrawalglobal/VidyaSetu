'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import AOSInitializer from './AOSInitializer';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    // Layout logic simplified: Always render wrapper, control print visibility via CSS

    return (
        <>
            <Navbar />
            <AOSInitializer />
            <main>{children}</main>
            <Footer />
        </>
    );
}
