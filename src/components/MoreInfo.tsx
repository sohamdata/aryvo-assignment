import { useState } from 'react';

export default function MoreInfo() {
    const [infoExpanded, setInfoExpanded] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <button
                onClick={() => setInfoExpanded(!infoExpanded)}
                className='w-[200px] py-2 text-white bg-slate-900 rounded-md hover:bg-indigo-900 transition duration-300 outline-none'
            > {infoExpanded ? 'collapse' : 'more'}
            </button>
            {infoExpanded && (
                <div className='p-5 flex flex-col justify-between items-center bg-gray-100 rounded-md'>
                    <span className='text-sm'>Existing User, DVLA License Number, Registration have mock APIS to simulate API response.</span>
                    <span>For your convinience, I have created a demo account.</span>
                    <span className='text-blue-700'>Email: temp@gmail.com</span>
                    <span className='text-blue-700'>Password: password</span>
                    <span className='text-green-700 text-xs'>You can also create your own account, the auth works perfectly fine</span>
                </div>
            )}
        </div>
    )
}
