export const VeryLargeCard = ({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div
      className={`w-full max-w-xl rounded-lg border border-gray-200 bg-white p-8 shadow-xl ${innerClassName}`}
    >
      {children}
    </div>
  </div>
)
