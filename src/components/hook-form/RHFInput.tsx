import { useFormContext, Controller } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface RHFInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export default function RHFInput({ name, ...other }: RHFInputProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <input
                    {...field}
                    {...other}
                    value={field.value || ''}
                    className="py-2 px-3 border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                />
            )}
        />
    );
}
