import { useRef, useState, ChangeEvent } from "react";

interface DocUploadProps {
    name: string;
    label: string;
    onFileChange: (name: string, file: File) => void;
}

const DocUpload = ({ name, label, onFileChange }: DocUploadProps) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<any>();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            onFileChange(name, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onUpload = () => {
        hiddenInputRef.current?.click();
    };

    const uploadButtonLabel = preview ? "Change doc" : label;

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

            {/* Display preview of the uploaded file */}
            {preview && <img src={preview} alt="File Preview" style={{ maxWidth: "100%", marginTop: "10px" }} />}
        </div>
    );
};

export default DocUpload;
