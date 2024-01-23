import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CiFileOn } from 'react-icons/ci';

type RHFDocUploadProps = {
    name: string;
    label: string;
    onFileChange: (name: string, file: File | null) => void;
};

const RHFDocUpload: React.FC<RHFDocUploadProps> = ({ name, label, onFileChange }) => {
    const { control } = useFormContext();

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (newFile: File) => {
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
                <div className="mb-4">
                    <label className="flex justify-between items-center px-4 py-2 bg-white text-gray-800 rounded-sm shadow-md cursor-pointer hover:bg-gray-100">
                        {label}
                        <CiFileOn />
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                const newFile = e.target.files && e.target.files[0];
                                if (newFile) {
                                    field.onChange(newFile);
                                    handleFileChange(newFile);
                                }
                            }}
                            onBlur={field.onBlur}
                        />
                    </label>
                    {file && (
                        <div className="mt-2">
                            <span className="cursor-pointer text-blue-500 underline" onClick={onView}>
                                View
                            </span>
                            <span
                                className="ml-2 cursor-pointer text-red-500 underline"
                                onClick={(_) => {
                                    field.onChange(null);
                                    onRemoveFile();
                                }}
                            >
                                Remove
                            </span>
                        </div>
                    )}
                </div>
            )}
        />
    );
};

export default RHFDocUpload;
