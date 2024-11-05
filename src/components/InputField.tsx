import React from 'react';
import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  type?: string;
  options?: RegisterOptions<T>;
  register: UseFormRegister<T>;
  error?: { message?: string }; // Add error prop for handling errors
  [x: string]: any; // Allows additional attributes
}

const InputField = <T extends FieldValues>({
  name,
  placeholder,
  type = 'text',
  options,
  register,
  error, // Destructure the error prop
  ...rest
}: InputFieldProps<T>) => (
  <div className="flex flex-col">
    <input
      {...register(name, options)}
      type={type}
      placeholder={placeholder}
      className={`text-black p-2 rounded border ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...rest}
    />
    <span className={`text-red-500 mt-1 h-4 ${error ? 'block' : 'hidden'}`}>
      {error?.message ?? ''}
    </span>
  </div>
);

export default InputField;
