import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error ? 'border-danger-500 focus-visible:ring-danger-500' : 'border-border',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-danger-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
