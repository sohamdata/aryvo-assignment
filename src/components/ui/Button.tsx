interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({ label, ...other }: ButtonProps) {
    return (
        <button
            className="px-4 py-2 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 transition duration-300"
            {...other}
        >
            {label}
        </button>
    )
}
