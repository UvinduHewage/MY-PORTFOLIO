import React from 'react';
import { cn } from '../../lib/utils';

const Separator = React.forwardRef(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...(decorative ? { role: 'none' } : { role: 'separator', 'aria-orientation': orientation })}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';

export { Separator };
