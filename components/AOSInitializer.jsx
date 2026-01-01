// components/AOSInitializer.jsx
"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS
import { usePathname } from 'next/navigation';

export default function AOSInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000,      // Animation duration (milliseconds)
      once: true,          // Whether animation should only happen once
      // disable: 'mobile',   // Enabled on mobile for consistent behavior and premium feel
    });
  }, []);

  useEffect(() => {
    // Refresh AOS when the route changes to detect new elements
    // We add delays to account for loading states or suspense boundaries
    // where the actual content might appear after the route change event.
    AOS.refresh();

    const timeout1 = setTimeout(() => {
      AOS.refresh();
    }, 500);

    const timeout2 = setTimeout(() => {
      AOS.refresh();
    }, 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [pathname]);

  return null;
}