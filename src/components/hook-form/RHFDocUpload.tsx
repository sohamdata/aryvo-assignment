import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CiFileOn } from 'react-icons/ci';

type RHFDocUploadProps = {
    name: string;
    label: string;
    onFileChange: (name: string, file: File | null, expiryDate: string | null) => void;
};

export default function RHFDocUpload({ name, label, onFileChange }: RHFDocUploadProps) {
    const { control } = useFormContext();

    const [file, setFile] = useState<File | null>(null);
    const [expiryDate, setExpiryDate] = useState<string | null>(null);

    const handleFileChange = (newFile: File | null, newExpiryDate: string | null) => {
        setFile(newFile);
        setExpiryDate(newExpiryDate);
        onFileChange(name, newFile, newExpiryDate);
    };

    const onView = () => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, "_blank");
        }
    };

    const onRemoveFile = () => {
        handleFileChange(null, null);
        setFile(null);
        setExpiryDate(null);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="mb-4 flex items-center gap-5">
                    <label className="flex justify-between items-center px-4 py-2 w-1/4 text-xs bg-white text-gray-800 rounded-sm shadow-[rgba(17,_17,_26,_0.2)_0px_0px_16px] cursor-pointer hover:bg-gray-100">
                        {label}
                        <CiFileOn />
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                const newFile = e.target.files && e.target.files[0];
                                handleFileChange(newFile, expiryDate);
                                field.onChange(newFile);
                            }}
                            onBlur={field.onBlur}
                        />
                    </label>
                    {/* Expiry date input */}
                    <input
                        type="date"
                        className="w-1/3 px-2 py-1 border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="Expiry date"
                        value={expiryDate || ''}
                        onChange={(e) => {
                            const newExpiryDate = e.target.value;
                            handleFileChange(file, newExpiryDate);
                        }}
                    />
                    {file ? (
                        <div className="mt-2 flex gap-4 text-sm">
                            <span className="text-black">
                                57 Days
                            </span>
                            <div className='flex flex-col md:flex-row items-end'>
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
                        </div>
                    ) : (
                        <span className="text-red-500">Required</span>
                    )}
                </div>
            )}
        />
    );
};
