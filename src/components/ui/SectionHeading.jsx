/**
 * SectionHeading — consistent section title + optional subtitle
 *
 * Props: title, subtitle, align ('left' | 'center'), className
 */
export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-sm sm:text-base max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}
