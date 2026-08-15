/**
 * PageContainer — max-width wrapper with consistent horizontal padding
 *
 * Props: children, className
 */
export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
