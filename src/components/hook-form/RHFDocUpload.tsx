import React, { ChangeEvent, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

type RHFDocUploadProps = {
    name: string;
    label: string;
    onFileChange: (name: string, file: File | null) => void;
};

const RHFDocUpload: React.FC<RHFDocUploadProps> = ({ name, label, onFileChange }) => {
    const { control } = useFormContext();

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files && event.target.files[0];
        // const newFile = event.currentTarget.files && event.currentTarget.files[0];

        if (newFile) {
            onFileChange(name, newFile);
            setFile(newFile);
        }
    };

    const onView = () => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, "_blank");
        }
    };

    const onRemoveFile = () => {
        onFileChange(name, null);
        setFile(null);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div>
                    <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        {label}
                    </label>
                    <input
                        type="file"
                        // onChange={(e) => field.onChange(e.target.files[0])}
                        onChange={(e) => {
                            field.onChange(e.target.files[0]);
                            handleFileChange(e);
                        }}
                        onBlur={field.onBlur}
                    />
                    {file && (
                        <>
                            <span className="ml-2 cursor-pointer text-blue-500 underline" onClick={onView}>
                                View
                            </span>
                            <span className="ml-2 cursor-pointer text-blue-500 underline" onClick={onRemoveFile}>
                                Remove
                            </span>
                        </>
                    )}
                </div>
            )}
        />
    );
};

export default RHFDocUpload;
