import { useRef, useState, ChangeEvent } from "react";

interface DocUploadProps {
    name: string;
    label: string;
    onFileChange: (name: string, file: File | null) => void;
}

const DocUpload = ({ name, label, onFileChange }: DocUploadProps) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files && event.target.files[0];

        if (newFile) {
            onFileChange(name, newFile);
            setFile(newFile);
        }
    };

    const onUpload = () => {
        hiddenInputRef.current?.click();
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

    const uploadButtonLabel = file ? `Change ${label}` : label;

    return (
        <div>
            <input
                type="file"
                name={name}
                className="hidden"
                ref={hiddenInputRef}
                onChange={handleFileChange}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onUpload}>
                {uploadButtonLabel}
            </button>

            {file && (
                <>
                    <span className="ml-2 cursor-pointer text-blue-500 underline" onClick={onView}>
                        View
                    </span>
                    <span className="ml-2 cursor-pointer text-red-500 underline" onClick={onRemoveFile}>
                        Remove
                    </span>
                </>
            )}
        </div>
    );
};

export default DocUpload;
