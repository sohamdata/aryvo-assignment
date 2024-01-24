import { useAuth } from '../context/FirebaseContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from '../components/hook-form/FormProvider';
import RHFInput from '../components/hook-form/RHFInput';

export default function Register() {

    const firebase = useAuth();

    const schema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6),
    });

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const {
        // reset,
        handleSubmit,
        formState: { errors },
    } = methods;


    const handleSignUp = async () => {
        const { email, password } = methods.getValues();
        try {
            await firebase?.signUp({ email, password });
            console.log('User registered');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = async () => {
        const { email, password } = methods.getValues();
        try {
            await firebase?.signIn({ email, password });
            // console.log('User signed in');
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
            <FormProvider methods={methods} onSubmit={handleSubmit(handleSignUp)} className="p-5 bg-slate-300 shadow-md rounded-lg">
                <div className="mb-4">
                    <RHFInput name="email" type="text" placeholder='example@mail.com' label='Email' />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <RHFInput name="password" type="password" placeholder='muchSecure' label='Password' />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.password.message}
                        </p>
                    )}

                </div>
                <div className="flex items-center justify-between">
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                        type="submit"
                    >
                        {'Sign up'}
                    </button>
                </div>
                <div className="mt-5 flex items-center justify-between">
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                        type="button"
                        onClick={handleSignIn}
                    >
                        {'Sign in'}
                    </button>
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                        type="button"
                        onClick={handleSignOut}
                    >
                        {'Sign out'}
                    </button>
                </div>
            </FormProvider>
        </div>
    );
};
