interface ToggleSwitchProps {
    label: string;
    toggleState: boolean;
    onToggle: () => void;
}

const ToggleSwitch = ({ label, toggleState, onToggle }: ToggleSwitchProps) => {
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={label} className="text-xs mb-0.5 mr-2">{label}</label>
            <div
                className="w-12 h-6 flex items-center bg-white rounded-full  cursor-pointer border border-gray-300"
                onClick={onToggle}
            >
                <div
                    className={
                        `bg-blue-800 h-6 w-6 rounded-full shadow-md transform duration-300 ease-in-out
                        ${toggleState && " transform translate-x-6"}`
                    }
                ></div>
            </div>
        </div>
    );
};

export default ToggleSwitch;
