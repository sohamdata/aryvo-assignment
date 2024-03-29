import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/FirebaseContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFInput from '../../components/hook-form/RHFInput';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import MoreInfo from '../../components/MoreInfo';


export default function Login() {
    const firebase = useAuth();
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6),
    });

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleSignIn = async () => {
        const toastId = toast.loading('Signing in...');

        const { email, password } = methods.getValues();
        try {
            await firebase?.signIn({ email, password });
            console.log('User logged in');
            toast.success("Signed in successfully");
        } catch (error) {
            toast.error('Invalid email or password');
            console.log(error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-300 gap-2">
            <Navbar userName="Operator Name" />
            <div className="flex flex-col justify-center items-center h-screen gap-10">
                <FormProvider methods={methods} onSubmit={handleSubmit(handleSignIn)} className="p-8 w-full max-w-sm bg-white shadow-md rounded-lg">
                    <div className="mb-6 text-center items-center flex flex-col">
                        <img src="/aryvologo.png" alt="Company Logo" className="mb-5 w-32" />
                        <h1 className="text-2xl font-bold">Sign In</h1>
                    </div>

                    <div className="mb-4">
                        <RHFInput name="email" type="text" placeholder="example@mail.com" label="Email" />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <RHFInput name="password" type="password" placeholder="muchSecure" label="Password" />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <Button label='Sign In' type="submit" />

                        <div className="flex items-center justify-center text-sm">
                            <span className="text-gray-600">Don&apos;t have an account?</span>
                            <span
                                className="ml-2 cursor-pointer text-blue-500 underline"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </span>
                        </div>
                    </div>
                </FormProvider>
                <MoreInfo />
            </div>
        </div>
    );
}
