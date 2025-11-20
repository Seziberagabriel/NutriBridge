import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border border-stone-200 bg-white text-stone-900 shadow-sm ${className}`}
      {...props}
    />
  )
)

Card.displayName = 'Card'

export { Card }
