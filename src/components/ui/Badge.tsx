import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'danger' | 'neutral';
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-success-50 text-success-600': variant === 'success',
          'bg-warning-50 text-warning-500': variant === 'warning',
          'bg-danger-50 text-danger-600': variant === 'danger',
          'bg-surface-alt text-text-secondary': variant === 'neutral',
        },
        className
      )}
      {...props}
    />
  );
}
