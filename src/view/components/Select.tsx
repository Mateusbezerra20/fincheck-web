import React, { useState } from 'react';
import * as RdxSelect from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../utils/cn';

interface SelectProps {
  value?: string;
  onChange(value: string): void;
  className?: string;
  error?: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
}

export function Select({ value, className, placeholder, options, error, onChange } : SelectProps) {
  const [selectedItem, setSelectedItem] = useState(value || '');

  function handleSelect(value: string) {
    setSelectedItem(value);
    onChange(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'z-10 absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 transition-all',
            selectedItem && 'text-xs top-2 translate-y-0'
          )}
        >
          { placeholder }
        </label>

        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              "bg-white text-gray-800 text-left w-full px-3 pt-4 h-[52px] border border-gray-500 rounded-lg focus:border-gray-800 outline-none transition-all relative",
              error && "!border-red-900",
              className,
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6"/>
            </RdxSelect.Icon>

          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-50 overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2 space-y-2">

                {options.map((option) => (
                  <RdxSelect.Item
                    key={ option.value }
                    value={ option.value }
                    className="p-2 rounded-2xl text-gray-800 text-sm data-[state=checked]:font-medium outline-none data-[highlighted]:bg-gray-50 transition-colors"
                  >
                    <RdxSelect.ItemText>{ option.label }</RdxSelect.ItemText>

                  </RdxSelect.Item>
                ))}

              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      { error && (
        <div className="flex gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{ error }</span>
        </div>
      )}
    </div>
  )
}
