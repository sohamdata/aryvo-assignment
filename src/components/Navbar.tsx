import { FaCog, FaChevronDown } from 'react-icons/fa';
import { GoInbox } from "react-icons/go";


interface NavbarProps {
    userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    const formattedTime = currentDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="px-10 py-2 flex justify-between items-center text-gray-600 bg-gray-200">
            <div className="flex items-center space-x-4">
                <img src="/aryvologo.png" alt="Company Logo" className="mt-1 w-14" />

                <div className="hidden md:flex items-center space-x-3">
                    <span>Home</span>
                    <span>Trips</span>
                    <span>Drivers</span>
                    <span>Customers</span>
                    <span>Finance</span>
                    <span>Reports</span>
                </div>
            </div>

            <div className="md:flex-1 flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-1/2 px-4 rounded-full border border-gray-300 bg-white"
                />
            </div>

            <div className="hidden md:flex items-center space-x-5">
                <span>{formattedDate}</span>
                <span>{formattedTime}</span>
                <button className="px-2 flex items-center space-x-2 rounded-full bg-blue-200 border border-blue-700">
                    <span>Create</span>
                    <FaChevronDown size={15} className='mt-0.5' />
                </button>
                <span>{userName}</span>
                <GoInbox size={18} />
                <FaCog size={18} />
            </div>
        </div>
    );
};
