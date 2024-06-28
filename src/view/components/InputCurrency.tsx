import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';
import { cn } from '../../utils/cn';

interface InputCurrencyProps {
  value?: string | number;
  error?: string;
  onChange(value: string): void;
}

export function InputCurrency({ value, error, onChange } : InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900',
        )}
        thousandSeparator="."
        decimalSeparator=","
        defaultValue={value}
      />

      { error && (
        <div className="flex gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{ error }</span>
        </div>
      )}
    </div>
  )
}