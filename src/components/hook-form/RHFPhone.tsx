import { useFormContext, Controller } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export interface RHFPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export default function RHFPhone({ name, ...other }: RHFPhoneProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <PhoneInput
                    {...field}
                    {...other}
                    value={field.value || ''}
                    onChange={field.onChange}
                    country={'gb'}
                // defaultCountry='GB'
                />
            )}
        />
    );
}
