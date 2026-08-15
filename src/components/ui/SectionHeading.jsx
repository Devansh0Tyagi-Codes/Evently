/**
 * SectionHeading — light theme section title + optional subtitle
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
      <h2 className="text-2xl sm:text-3xl font-bold text-ink leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-secondary text-sm sm:text-base max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
