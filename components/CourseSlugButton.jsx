"use client"

import Link from 'next/link';
import { LogIn } from 'lucide-react'; // Changed the icon to LogIn

export default function CourseSlugButton({course}) {
    return (
        <button
            onClick={() => alert(`Attempting to join course: ${course.title}`)}
            className={`
                flex items-center justify-center gap-3  /* Added flex and gap for icon */
                px-10 py-4               /* Increased padding */
                bg-indigo-600 
                text-white 
                font-extrabold text-xl   /* Bolder and larger text */
                rounded-xl                /* Softer, larger rounded corners */
                shadow-xl shadow-indigo-500/50  /* Stronger shadow with color */
                hover:bg-indigo-700 
                transition duration-300 
                transform hover:scale-[1.03]  /* Added subtle scale on hover */
                focus:outline-none focus:ring-4 focus:ring-indigo-300
            `}
        >
            <LogIn className="w-6 h-6" /> {/* Changed the icon to LogIn */}
            <Link href={`${course.slug}/addstudent`}>Join Now</Link>
        </button>
    )
}