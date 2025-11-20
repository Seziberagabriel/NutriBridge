import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const baseClasses = 'font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      default: 'bg-amber-600 text-white hover:bg-amber-700',
      outline: 'border border-stone-300 text-stone-900 hover:bg-stone-100',
      ghost: 'text-stone-900 hover:bg-stone-100',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
