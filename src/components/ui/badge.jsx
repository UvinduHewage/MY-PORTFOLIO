import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
  default:
    'border border-accent bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-md',
  secondary:
    'border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive:
    'border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold shadow-md',
  outline: 'border border-border text-foreground hover:bg-accent',
  success: 'border border-green-500 bg-green-500 text-white hover:bg-green-600 font-bold shadow-md',
};

function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
