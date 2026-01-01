import Link from "next/link";

export default function PrimaryButton({ href, children, className = "" })  {
  return (
    <Link
    href={href}
    className={`
      px-10 py-4 rounded-full font-semibold transition-all duration-300 ease-in-out
      bg-indigo-600 text-white shadow-lg shadow-indigo-600/30
      hover:bg-indigo-700  transform hover:-translate-y-0.5
      flex items-center justify-center gap-2 ${className}
    `}
  >
    {children}
  </Link>
  )
};