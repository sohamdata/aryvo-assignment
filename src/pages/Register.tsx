import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../context/FirebaseContext';

export default function Register() {

    const firebase = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await firebase?.signUp({ email, password });
            console.log('User registered');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = async () => {
        try {
            await firebase?.signIn({ email, password });
            console.log('User signed in');
        } catch (error) {
            console.log("error signing in");
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await firebase?.signOutUser();
            console.log('User signed out');
        } catch (error) {
            console.log("cannot sign out");
            console.log(error);
        }
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
                <div className="mt-5 flex items-center justify-between">
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                        type="button"
                        onClick={handleSignIn}
                    >
                        signin
                    </button>
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                        type="button"
                        onClick={handleSignOut}
                    >
                        signout
                    </button>
                </div>
            </form>
        </div>
    );
};
