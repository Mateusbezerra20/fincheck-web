import * as RdxPopover from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

interface PopoverComponentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverRoot({ children } : PopoverComponentProps) {
  return (
    <RdxPopover.Root>
      { children }
    </RdxPopover.Root>
  )
}

function PopoverTrigger({ children } : PopoverComponentProps) {
  return (
    <RdxPopover.Trigger asChild>
      { children }
    </RdxPopover.Trigger>
  )
}

function PopoverContent({ children, className } : PopoverComponentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'z-[55] bg-white p-4 rounded-2xl space-y-2 border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        { children }
      </RdxPopover.Content>
    </RdxPopover.Portal>
  )
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
}