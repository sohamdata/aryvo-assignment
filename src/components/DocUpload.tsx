import { useRef, useState } from "react";

interface DocUploadProps {
    name: string;
    label: string;
}

const DocUpload = ({ name, label }: DocUploadProps) => {
    const hiddenInputRef = useRef<any>(null);

    const [preview, setPreview] = useState<any>();

    const onUpload = () => {
        hiddenInputRef.current.click();
    };

    const uploadButtonLabel = preview ? "Change doc" : label;

    return (
        <div>
            <input
                type="file"
                name={name}
                className="hidden"
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onUpload}>
                {uploadButtonLabel}
            </button>
        </div>
    );
};

export default DocUpload;
