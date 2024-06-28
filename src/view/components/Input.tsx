import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from "../../utils/cn";

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  placeholder,
  name,
  id,
  error,
  className,
  ...props
  },
  ref) => {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        id={inputId}
        name={name}
        className={cn(
          "bg-white text-gray-800 w-full px-3 pt-4 h-[52px] border border-gray-500 rounded-lg placeholder-shown:pt-0 peer focus:border-gray-800 outline-none transition-all",
          error && "!border-red-900",
          className,
        )}
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs text-gray-700 left-[13px] top-2 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base pointer-events-none transition-all"
      >
        {placeholder}
      </label>

      { error && (
        <div className="flex gap-2 mt-2 text-red-900">
          <CrossCircledIcon/>
          <span className="text-xs">{ error }</span>
        </div>
      ) }
    </div>
  )
})
