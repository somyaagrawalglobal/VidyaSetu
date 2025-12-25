export default function ProgramBadge({ text, style }) {
  <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow-lg ${style}`}>
    {text}
  </span>
}