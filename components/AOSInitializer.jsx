// components/AOSInitializer.jsx
"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 1000,      // Animation duration (milliseconds)
      once: true,          // Whether animation should only happen once - good for performance
      disable: function () {
    return window.innerWidth < 768;
  },   // Optional: disable on mobile for smoother performance
    });
  }, []);

  return null;
}