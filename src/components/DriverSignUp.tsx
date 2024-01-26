import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from './hook-form/FormProvider';
import RHFInput from './hook-form/RHFInput';
import RHFDocUpload from './hook-form/RHFDocUpload';
import RHFPhone from './hook-form/RHFPhone';
import { DOCUMENT_TYPES, DRIVER_DETAILS_SCHEMA, MOCK_DRIVER_DETAILS } from '../config';
import { checkAccountExists, validateLicense, validateRegNumber, CAR_DETAILS, LICENSES } from '../mockAPIS';
import ToggleSwitch from './ui/ToggleSwitch';
import Button from './ui/Button';
import toast from 'react-hot-toast';
import CustomTooltip from './ui/CustomToolTip';


type SelectedFiles = {
    [key: string]: {
        file: File | null;
        expiryDate: string;
    };
};

export default function DriverSignUp() {

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(DRIVER_DETAILS_SCHEMA),
    });

    const { handleSubmit, formState: { errors }, clearErrors } = methods;

    const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({});
    const [accountExists, setAccountExists] = useState(false);
    const [licenseDetails, setLicenseDetails] = useState<typeof LICENSES[number] | null>(null);
    const [carDetails, setCarDetails] = useState<typeof CAR_DETAILS[number] | null>(null);

    const [toggle_ppe, setPpeBarrierToggle] = useState(false);
    const [toggle_dis, setDisabledAccessToggle] = useState(false);
    const [toggle_prem, setPremiumVehicleToggle] = useState(false);
    const [toggle_HC, setHackneyCarriageToggle] = useState(false);
    const [toggle_pet, setPetsToggle] = useState(false);
    const [toggle_wide, setWideVehicleToggle] = useState(false);


    const handleFileChange = (name: string, file: File | null, expiryDate: string | null) => {
        const newSelectedFiles: SelectedFiles = { ...selectedFiles };

        if (file) {
            newSelectedFiles[name] = { file, expiryDate: expiryDate || '' };
        } else {
            delete newSelectedFiles[name];
        }
        setSelectedFiles(newSelectedFiles);
    };

    const onSubmit = (data: any) => {
        // Remove the document fields from the original form values

        const formValuesWithoutDocs = Object.fromEntries(
            Object.entries(data).filter(([key]) => !key.startsWith('doc-'))
        );

        const toggles = { toggle_ppe, toggle_dis, toggle_prem, toggle_HC, toggle_pet, toggle_wide };

        console.log("-----selectedFiles-----", selectedFiles);

        const hasNullFiles = !DOCUMENT_TYPES.every((doc) => doc.name in selectedFiles);
        if (hasNullFiles) {
            alert('Please upload all required documents ');
            methods.setError('root', {
                type: 'manual',
                message: 'Please upload all required documents',
            });
            return;
        }

        const formDataWithFiles = { ...formValuesWithoutDocs, ...selectedFiles, ...toggles };

        console.log("-----payload-----", formDataWithFiles);
    }

    const onContinue = async () => {
        const { email } = methods.getValues();
        const toastId = toast.loading('Checking account...');
        const accountExists = await checkAccountExists({ email });
        if (accountExists) {
            console.log('Account exists');
            setAccountExists(true);
            toast.error("Account exists");
            // methods.setError('email', {
            //     type: 'manual',
            //     message: 'An account with this email already exists',
            // });
        } else {
            setAccountExists(false);
            console.log('No account exists');
            methods.clearErrors('email');
        }
        toast.dismiss(toastId);
    }

    const onValidateLicense = async () => {
        const { dvlaLicenseNumber } = methods.getValues();

        const toastId = toast.loading('Validating license...');

        const response = await validateLicense({ license: dvlaLicenseNumber });

        if (response) {
            setLicenseDetails(response as typeof LICENSES[number]);
            console.log('License details', response);
            toast.success("License validated successfully");
        } else {
            setLicenseDetails(null);
            console.log('License not found');
            toast.error("License not found");
        }
        toast.dismiss(toastId);
    }

    const onCheckCarReg = async () => {
        const { vehicleRegNumber } = methods.getValues();

        const toastId = toast.loading('Validating car...');
        const response = await validateRegNumber({ vehicleRegNumber: vehicleRegNumber });

        if (response) {
            setCarDetails(response as typeof CAR_DETAILS[number]);
            console.log('License details', response);
            toast.success("Car validated successfully");
        } else {
            setCarDetails(null);
            console.log('License not found');
            toast.error("Car not found");
        }
        toast.dismiss(toastId);
    }

    const fillMockDetails = () => {
        console.log("\u{26A1} ez");
        methods.reset(MOCK_DRIVER_DETAILS);
    }

    useEffect(() => {
        if (errors.root) {
            setTimeout(() => {
                clearErrors('root');
            }, 3000);
        }
    }, [errors.root]);


    return (
        <div className="divide-y divide-gray-200">
            <div className='px-4 py-2 flex justify-between text-sm'>
                <div className='text-blue-700'>Register Driver</div>
                <button className='text-amber-600 font-bold' onClick={fillMockDetails}>Fill with mock details</button>
            </div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="sm:flex sm:flex-col md:grid md:grid-cols-12 gap-4 md:divide-x md:divide-gray-200">
                {/* Left col */}
                <div className="col-span-7 px-4 py-1 divide-y divide-gray-200">
                    {/* Section 1 */}
                    <div className="mb-4 flex flex-col">
                        <h3 className="text-2xl mb-4">Signup a driver</h3>
                        <div className="mb-4 flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col">
                                <RHFInput name="fullName" type="text" label='Enter Full Name' />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.fullName.message}
                                    </p>
                                )}

                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="contactNumber" className="text-xs mb-0.5">Enter Contact Number</label>
                                <RHFPhone name="contactNumber" type="text" />
                                {errors.contactNumber && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.contactNumber.message}
                                    </p>
                                )}

                            </div>
                            <div className="flex flex-col">
                                <RHFInput name="email" type="email" label='Enter Email Address' />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.email.message}
                                    </p>
                                )}

                            </div>
                        </div>

                        <div className='mb-4 flex justify-between'>
                            {accountExists && (
                                <p className='mt-2 text-xs text-blue-700 font-semibold w-2/3'>An account already exists with these contact details, you need to merge the accounts, or use different details</p>
                            )}
                            <button
                                className={`px-4 py-2 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 transition duration-300`}
                                onClick={onContinue}
                                type="button"
                            >
                                Check
                            </button>
                        </div>
                    </div>
                    {/* Section 1.2 */}
                    <div className="py-4">
                        <div className="flex flex-col md:flex-row gap-1">
                            <RHFInput name="accountingRef" type="text" className='w-3/5' label='Accounting Ref' />
                            <RHFInput name="nominalCode" type="text" className='w-3/5' label='Nominal Code' />
                            <CustomTooltip
                                id="tooltip-callSign"
                                place='top'
                                content="Unique identifier for the driver"
                                child={
                                    <RHFInput name="callSign" type="text" className='w-3/5' label='Call Sign' />}
                            />
                            <CustomTooltip
                                id="tooltip-commission"
                                place='top'
                                content="Percentage of the fare that the driver pays to the company"
                                child={
                                    <RHFInput name="commission" type="text" className='w-3/5' label='Commission %' />}
                            />
                            <CustomTooltip
                                id="tooltip-weeklyCharge"
                                place='top'
                                content="Base weekly charge for the driver"
                                child={
                                    <RHFInput name="weeklyCharge" type="text" className='w-3/5' label='Weekly Charge' />}
                            />
                            <RHFInput name="driverGroup" type="text" className='w-3/5' label='Driver Group' />
                        </div>
                    </div>

                    {/* Section 1.3 */}
                    <div className="py-4">
                        <RHFInput name="homeAddress" type="text" label='Home Address' />
                    </div>

                    {/* Section 2 */}
                    <div className="py-4">
                        <h3 className="text-lg font-semibold mb-2">License Information</h3>
                        <div className="flex flex-col md:flex-row justify-start gap-4">
                            <div className="flex flex-col mb-2 gap-1">
                                <RHFInput name="dvlaLicenseNumber" type="text" label='DVLA License Number' />
                                <button
                                    className={`px-4 py-2 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 transition duration-300 w-1/2 md:w-auto`}
                                    onClick={onValidateLicense}
                                    type="button"
                                >
                                    Validate License
                                </button>
                            </div>
                            {licenseDetails && (
                                <>
                                    {Object.entries(licenseDetails).slice(1).map(([key, value]) => (
                                        <div key={key} className='flex md:flex-col gap-1 md:gap-0'>
                                            <div className='text-blue-700'>{key}: {value}</div>
                                            {/* <div>{value}</div> */}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="py-4">
                        <h3 className="text-lg font-semibold mb-2">Taxi or PH badge Information</h3>
                        <div className="mb-4 flex flex-col justify-start gap-1">
                            <div className="flex flex-col md:flex-row justify-start gap-4">
                                <RHFInput name="driverType" type="text" label='Driver Type' />
                                <RHFInput name="issuedBy" type="text" label='Issued by' />
                                <RHFInput name="badgeNumber" type="text" label='Badge number' />
                            </div>
                            <div className="flex justify-start gap-4">
                                <button type="button" className="px-4 py-2 border border-gray-300 text-sm rounded-md shadow-md bg-white hover:bg-gray-200 transition duration-300">
                                    Safeguarding Certificate
                                </button>
                                <button type="button" className="px-4 py-2 border border-gray-300 text-sm rounded-md shadow-md bg-white hover:bg-gray-200 transition duration-300">
                                    B-Tech
                                </button>
                                <button type="button" className="px-4 py-2 border border-gray-300 text-sm rounded-md shadow-md bg-white hover:bg-gray-200 transition duration-300">
                                    Wheelchair Certificate
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-2">Vehicle Information</h3>
                        <div className="flex flex-col md:flex-row justify-start gap-4">
                            <div className="flex flex-col mb-2">
                                <RHFInput name="vehicleRegNumber" type="text" label='Registration' />
                                <button
                                    className={`px-4 py-2 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 transition duration-300 w-1/2 md:w-auto`}
                                    onClick={onCheckCarReg}
                                    type="button"
                                >
                                    Validate Car
                                </button>
                            </div>
                            {carDetails && (
                                <>
                                    {Object.entries(carDetails).slice(1).map(([key, value]) => (
                                        <div key={key} className='flex md:flex-col gap-1 md:gap-0'>
                                            <div className='text-blue-700'>{key}: {value}</div>
                                            {/* <div>{value}</div> */}
                                        </div>
                                    ))}
                                </>
                            )}

                        </div>

                        <div className="my-4 flex flex-col md:flex-row justify-start">
                            <RHFInput name="model" type="text" className='w-2/3' label='Model' />
                            <RHFInput name="passengerCapacity" type="text" className='w-2/3' label='Passenger Capacity' />
                            <RHFInput name="rideType" type="text" className='w-2/3' label='Ride Type' />
                            <RHFInput name="bodyType" type="text" className='w-2/3' label='Body Type' />
                        </div>

                        <div className="mb-4 flex flex-col md:flex-row justify-start gap-5">
                            <RHFInput name="plateNumber" type="text" label='Plate Number' />
                            <RHFInput name="issuedBy" type="text" label='Issued by' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-col mb-2 gap-2 w-auto md:w-1/4">
                                <ToggleSwitch
                                    label="PPE Barrier"
                                    toggleState={toggle_ppe}
                                    onToggle={() => setPpeBarrierToggle(!toggle_ppe)}
                                />

                                <ToggleSwitch
                                    label="Disabled Access"
                                    toggleState={toggle_dis}
                                    onToggle={() => setDisabledAccessToggle(!toggle_dis)}
                                />

                                <ToggleSwitch
                                    label="Premium Vehicle"
                                    toggleState={toggle_prem}
                                    onToggle={() => setPremiumVehicleToggle(!toggle_prem)}
                                />

                                <ToggleSwitch
                                    label="Hackney Carriage"
                                    toggleState={toggle_HC}
                                    onToggle={() => setHackneyCarriageToggle(!toggle_HC)}
                                />

                                <ToggleSwitch
                                    label="Pets"
                                    toggleState={toggle_pet}
                                    onToggle={() => setPetsToggle(!toggle_pet)}
                                />

                                <ToggleSwitch
                                    label="Wide Vehicle"
                                    toggleState={toggle_wide}
                                    onToggle={() => setWideVehicleToggle(!toggle_wide)}
                                />

                            </div>
                            <div className='mt-5'>
                                <RHFInput name="insuranceCertNumber" type="text" className='w-1/4' label='Insurance Certificate Number' />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right col */}
                <div className="col-span-5 px-4 py-1">
                    {errors.root && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.root.message}
                        </p>
                    )}
                    <h3 className="text-2xl mb-4">Documents and expiry dates</h3>
                    <div className="mb-4 flex flex-col gap-2">
                        {DOCUMENT_TYPES.map((doc) => (
                            <RHFDocUpload
                                key={doc.name}
                                name={doc.name}
                                label={doc.label}
                                onFileChange={handleFileChange}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <Button label='Submit' type="submit" />
                    </div>
                </div>
            </FormProvider>
        </div>
    );
};
