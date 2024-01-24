import { useFormContext, Controller } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface RHFInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
}

export default function RHFInput({ name, label, ...other }: RHFInputProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col mb-2">
                    {label && <label htmlFor={name} className="text-xs mb-0.5">{label}</label>}
                    <input
                        {...field}
                        {...other}
                        value={field.value || ''}
                        className={`p-2 border border-gray-300 rounded text-black leading-tight focus:outline-none focus:border-indigo-500 ${other.className}`}
                    />
                </div>
            )}
        />
    );
}
