import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'blue' | 'gold' | 'emergency' | 'success' | 'gray';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-primary-light text-primary-dark',
      blue: 'bg-blue-light text-blue-primary',
      gold: 'bg-gold-light text-gold',
      emergency: 'bg-red-100 text-emergency',
      success: 'bg-green-100 text-green-700',
      gray: 'bg-gray-100 text-gray-600',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';