import { useState } from 'react';

export default function MoreInfo() {
    const [infoExpanded, setInfoExpanded] = useState(false);

    return (
        <div className='mb-2 flex flex-col items-center justify-center gap-4'>
            <button
                onClick={() => setInfoExpanded(!infoExpanded)}
                className='px-4 py-2 text-white bg-slate-900 rounded-md hover:bg-indigo-900 transition duration-300 outline-none'
            > {infoExpanded ? 'collapse' : 'more'}
            </button>
            {infoExpanded && (
                <div className='p-5 flex flex-col justify-between items-center bg-gray-100 rounded-md shadow-lg gap-2 text-xs'>
                    <span>Existing User, DVLA License Number, Registration have mock APIS to simulate API response.</span>
                    <span>You may login through the below demo account:</span>
                    <span className='text-blue-700'>Email: temp@gmail.com</span>
                    <span className='text-blue-700'>Password: password</span>
                    <span className='text-green-700 text-xs'>You can also create your own account, the auth works perfectly fine</span>
                    <a
                        href='https://github.com/sohamdata/aryvo-assignment'
                        target='_blank'
                        rel='noreferrer'
                        className='text-blue-700 underline'
                    >Github Repo</a>
                </div>
            )}
        </div>
    )
}
