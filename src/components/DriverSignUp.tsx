import { useForm } from 'react-hook-form';
import FormProvider from './hook-form/FormProvider';
import RHFInput from './hook-form/RHFInput';

const DriverSignUp = () => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8">
            {/* Left col */}
            <div className="col-span-1 p-4">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Signup a driver</h2>
                    <div className="mb-4">
                        <div className="flex flex-col mb-2">
                            <label htmlFor="fullName" className="text-sm mb-1">Enter Full Name</label>
                            <RHFInput name="fullName" type="text" />
                            {/* <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => <input {...field} type="text" className=" py-2 px-3 border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none focus:border-indigo-500" />}
                            /> */}
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="contactNumber" className="text-sm mb-1">Contact Number</label>
                            {/* <Controller
                                name="contactNumber"
                                control={control}
                                render={({ field }) => <input {...field} type="text" className="p-2 border rounded" />}
                            /> */}
                            <RHFInput name="contactNumber" type="text" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="email" className="text-sm mb-1">Email</label>
                            {/* <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <input {...field} type="email" className="p-2 border rounded" />}
                            /> */}
                            <RHFInput name="email" type="email" />
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">License Information</h3>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="dvlaLicenseNumber" className="text-sm mb-1">DVLA License Number</label>
                            {/* <Controller
                                name="dvlaLicenseNumber"
                                control={control}
                                render={({ field }) => <input {...field} type="text" className="p-2 border rounded" />}
                            /> */}
                            <RHFInput name="dvlaLicenseNumber" type="text" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Right col */}
            <div className="col-span-1 p-4">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Documents and expiry dates</h2>
                    <div className="flex flex-col">
                    </div>
                </div>
            </div>

            <div className="col-span-2 p-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </div>
        </FormProvider>
    );
};

export default DriverSignUp;
