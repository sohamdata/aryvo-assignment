import { FaCog, FaChevronDown } from 'react-icons/fa';
import { MdOutlineLogout } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { useAuth } from '../context/FirebaseContext';
import CustomTooltip from './ui/CustomToolTip';
import { auth, onAuthStateChanged, User } from '../config/firebase';
import { useEffect, useState } from 'react';

interface NavbarProps {
    userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [authCheckComplete, setAuthCheckComplete] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setActiveUser(user);
                // console.log("user signed in", auth.currentUser);
            } else {
                setActiveUser(null);
                // console.log("no user signed in");
            }

            setAuthCheckComplete(true);
        });

        return () => unsubscribe();
    }, []);

    const firebase = useAuth();

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

    const handleLogout = async () => {
        try {
            await firebase?.signOutUser();
            console.log('User signed out');
        } catch (error) {
            console.log("cannot sign out");
            console.log(error);
        }
    };

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
                <span className="px-2 flex items-center space-x-2 rounded-full bg-blue-200 border border-blue-700">
                    <span>Create</span>
                    <FaChevronDown size={15} className='mt-0.5' />
                </span>
                <span>{userName}</span>

                <CustomTooltip
                    id="tooltip-inbox"
                    content="Inbox"
                    child={<GoInbox size={18} />}
                />
                <CustomTooltip
                    id="tooltip-settings"
                    content="Settings"
                    child={<FaCog size={18} />}
                />

                {activeUser && authCheckComplete &&
                    <CustomTooltip
                        id="tooltip-logout"
                        content="Logout"
                        child={
                            <MdOutlineLogout size={18} className='cursor-pointer hover:text-red-500' onClick={handleLogout} />
                        }
                    />}

            </div>
        </div>
    );
};
