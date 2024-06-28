import { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
};

export function Button({className, variant, disabled, isLoading, children, ...props}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        "flex items-center justify-center px-6 h-12 rounded-2xl bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed tranking-[-0.5px] text-white font-medium transition-all",
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' && 'bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-950/5',
        className,
      )}
    >
      {!isLoading ? children : <Spinner className="w-6 h-6" />}
    </button>
  )
}
