
import React from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  contentClassName?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  className,
  contentClassName,
}) => {
  const [show, setShow] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const childRect = e.currentTarget.getBoundingClientRect();
    
    let top = 0;
    let left = 0;
    
    if (position === 'top') {
      top = -10;
      left = childRect.width / 2;
    } else if (position === 'bottom') {
      top = childRect.height + 10;
      left = childRect.width / 2;
    } else if (position === 'left') {
      top = childRect.height / 2;
      left = -10;
    } else if (position === 'right') {
      top = childRect.height / 2;
      left = childRect.width + 10;
    }
    
    setCoords({ top, left });
    setShow(true);
  };

  const positionClass = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2',
  };

  return (
    <div 
      className={cn("relative inline-block", className)} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
      ref={tooltipRef}
    >
      {children}
      
      {show && (
        <div 
          className={cn(
            "absolute z-50 px-2 py-1 text-xs font-medium bg-popover text-popover-foreground rounded shadow-md whitespace-nowrap",
            positionClass[position],
            contentClassName
          )}
          style={{ 
            transformOrigin: position === 'top' 
              ? 'bottom center' 
              : position === 'bottom' 
                ? 'top center' 
                : position === 'left' 
                  ? 'right center' 
                  : 'left center'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// These components are simplified compatibility versions for radix-ui/tooltip
// They're used in read-only files that we can't modify
export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children, delayDuration }) => {
  return <>{children}</>;
};

export interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild }) => {
  return <>{children}</>;
};

export interface TooltipContentProps { 
  children: React.ReactNode; 
  side?: string;
  align?: string;
  hidden?: boolean;
}

export const TooltipContent: React.FC<TooltipContentProps> = ({ children, side, align, hidden }) => {
  return <>{children}</>;
};
