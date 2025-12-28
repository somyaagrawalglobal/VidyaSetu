"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function CourseSlugButton({ course }) {
  if (!course) return null;

  return (
    <Link
      href={`/addstudent/${course.slug}?price=${course.price}`}
      className={`
        flex items-center justify-center gap-3
        px-10 py-4
        bg-indigo-600
        text-white
        font-extrabold text-xl
        rounded-xl
        shadow-xl shadow-indigo-500/50
        hover:bg-indigo-700
        transition duration-300
        transform hover:scale-[1.03]
        focus:outline-none focus:ring-4 focus:ring-indigo-300
      `}
    >
      <LogIn className="w-6 h-6" />
      <span>Join Now</span>
    </Link>
  );
}
