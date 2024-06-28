import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../utils/cn';

function DropdownMenuRoot({ children } : { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Root>
      { children }
    </RdxDropdownMenu.Root>
  )
}

function DropdownMenuTrigger({ children } : { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none" asChild>
      { children }
    </RdxDropdownMenu.Trigger>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

function DropdownMenuContent({ children, className, align='center' } : DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'z-50 bg-white p-2 rounded-2xl space-y-2 border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
        sideOffset={16}
        align={align}
      >
        { children }
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  )
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

function DropdownMenuItem({ children, className, onSelect } : DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'outline-none min-h-[40px] p-2 rounded-2xl flex items-center text-gray-800 text-sm data-[highlighted]:bg-gray-50 transition-colors cursor-pointer',
        className,
      )}
    >
      { children }
    </RdxDropdownMenu.Item>
  )
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
}
