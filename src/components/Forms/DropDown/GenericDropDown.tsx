import React, {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {DownIcon} from '../../../icons';

interface Option {
  value: string;
  label: string;
}

interface GenericDropdownProps {
  name: string;
  label: string;
  options: Option[];
  defaultOption?: string;
  onChange?: (value: string) => void;
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  name,
  label,
  options,
  defaultOption = '',
  onChange: externalOnChange,
}) => {
  const [isOptionSelected, setIsOptionSelected] =
    useState<boolean>(!!defaultOption);
  const {
    control,
    formState: {errors},
  } = useFormContext();

  // Safely access error message using optional chaining
  const errorMessage = (errors as unknown)?.[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value, name}}) => (
        <div className="mb-4">
          <label className="mb-3 block text-black dark:text-white">
            {label}
          </label>

          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              name={name}
              value={
                typeof value === 'string' || typeof value === 'number'
                  ? value
                  : ''
              }
              onChange={(e) => {
                const selectedValue = e.target.value;
                setIsOptionSelected(true);
                onChange(selectedValue);
                externalOnChange?.(selectedValue);
              }}
              onBlur={onBlur}
              className={`relative z-20 w-full appearance-none rounded border px-12 py-3 outline-none transition ${errorMessage ? 'border-red-500' : 'border-stroke'} dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
            >
              <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                {defaultOption || `Select ${label}`}
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-body dark:text-bodydark"
                >
                  {option.label}
                </option>
              ))}
            </select>

            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
              <DownIcon />
            </span>
          </div>

          {/* ✅ Show error */}
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      )}
    />
  );
};

export default GenericDropdown;
