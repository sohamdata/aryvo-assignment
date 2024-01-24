// TODO: implement react-hook-form, register 


import { useState, ChangeEvent, FormEvent } from 'react';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        className='w-full'
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        className='w-full'
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};
