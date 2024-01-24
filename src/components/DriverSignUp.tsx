import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from './hook-form/FormProvider';
import RHFInput from './hook-form/RHFInput';
import RHFDocUpload from './hook-form/RHFDocUpload';
import RHFPhone from './hook-form/RHFPhone';
import { DOCUMENT_TYPES } from '../config';
import { checkAccountExists, validateLicense } from '../mockAPIS';
import ToggleSwitch from './ToggleSwitch';


type SelectedFiles = {
    [key: string]: {
        file: File | null;
        expiryDate: string;
    };
};

export default function DriverSignUp() {
    const methods = useForm();
    const { handleSubmit } = methods;

    const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({});
    const [accountExists, setAccountExists] = useState(false);
    const [licenseDetails, setLicenseDetails] = useState<any>(undefined);

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

        const formDataWithFiles = { ...formValuesWithoutDocs, ...selectedFiles, ...toggles };

        console.log(formDataWithFiles);
    }

    const onContinue = async () => {
        const { email } = methods.getValues();

        const accountExists = await checkAccountExists({ email });
        if (accountExists) {
            console.log('Account exists');
            setAccountExists(true);
            methods.setError('email', {
                type: 'manual',
                message: 'An account with this email already exists',
            });
        } else {
            setAccountExists(false);
            console.log('No account exists');
            methods.clearErrors('email');
        }
    }

    const onValidateLicense = async () => {
        const { dvlaLicenseNumber } = methods.getValues();

        const response = await validateLicense({ license: dvlaLicenseNumber });

        if (response) {
            setLicenseDetails(response);
            console.log('License details', response);
        } else {
            setLicenseDetails(null);
            console.log('License not found');
        }
    }

    const [toggle_ppe, setPpeBarrierToggle] = useState(false);
    const [toggle_dis, setDisabledAccessToggle] = useState(false);
    const [toggle_prem, setPremiumVehicleToggle] = useState(false);
    const [toggle_HC, setHackneyCarriageToggle] = useState(false);
    const [toggle_pet, setPetsToggle] = useState(false);
    const [toggle_wide, setWideVehicleToggle] = useState(false);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
            {/* Left col */}
            <div className="col-span-7 p-4">
                <div>
                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold mb-4">Signup a driver</h2>
                    <div className="mb-4 flex justify-between">
                        <div className="flex flex-col">
                            <label htmlFor="fullName" className="text-xs mb-0.5">Enter Full Name</label>
                            <RHFInput name="fullName" type="text" />

                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="contactNumber" className="text-xs mb-0.5">Enter Contact Number</label>
                            {/* <RHFInput name="contactNumber" type="text" /> */}
                            <RHFPhone name="contactNumber" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-xs mb-0.5">Enter Email Address</label>
                            <RHFInput name="email" type="email" />
                        </div>
                    </div>

                    <div className='my-4 flex justify-between'>
                        {accountExists && (
                            <p className='mt-2 text-xs text-blue-700 font-semibold w-2/3'>An account already exists with these contact details, you need to merge the accounts, or use different details</p>
                        )}
                        <button
                            type="button"
                            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs'
                            onClick={onContinue}
                        >
                            Check
                        </button>
                    </div>

                    {/* Section 1.2 */}
                    <div className="mb-4 flex justify-start gap-3">
                        <div className="flex flex-col">
                            <label htmlFor="accountingRef" className="text-xs mb-0.5">Accounting Ref</label>
                            <RHFInput name="accountingRef" type="text" className='w-4/5' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="nominalCode" className="text-xs mb-0.5">Nominal Code</label>
                            <RHFInput name="nominalCode" type="text" className='w-4/5' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="callSign" className="text-xs mb-0.5">Call Sign</label>
                            <RHFInput name="callSign" type="text" className='w-4/5' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="commission" className="text-xs mb-0.5">Commission %</label>
                            <RHFInput name="commission" type="text" className='w-4/5' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="weeklyCharge" className="text-xs mb-0.5">Weekly Charge</label>
                            <RHFInput name="weeklyCharge" type="text" className='w-4/5' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="driverGroup" className="text-xs mb-0.5">Driver Group</label>
                            <RHFInput name="driverGroup" type="text" className='w-4/5' />
                        </div>
                    </div>

                    {/* Section 1.3 */}
                    <div className="mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="homeAddress" className="text-xs mb-0.5">Home Address</label>
                            <RHFInput name="homeAddress" type="text" />
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">License Information</h3>
                        <div className="flex justify-between">
                            <div className="flex flex-col mb-2">
                                <label htmlFor="dvlaLicenseNumber" className="text-xs mb-0.5">DVLA License Number</label>
                                <RHFInput name="dvlaLicenseNumber" type="text" />
                                <button
                                    type="button"
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    onClick={onValidateLicense}
                                >
                                    Validate License
                                </button>
                            </div>
                            {licenseDetails && (
                                <>
                                    <div>{licenseDetails.sex}</div>
                                    <div>{licenseDetails.dob}</div>
                                    <div>{licenseDetails.addressmatch}</div>
                                    <div>{licenseDetails.type}</div>
                                    <div>{licenseDetails.status}</div>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Section 3 */}
                    <h3 className="text-lg font-semibold mb-2">Taxi or PH badge Information</h3>
                    <div className="mb-4 flex justify-between">
                        <div className="flex flex-col mb-2">
                            <label htmlFor="driverType" className="text-xs mb-0.5">Driver Type</label>
                            <RHFInput name="driverType" type="text" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="issuedBy" className="text-xs mb-0.5">Issued by</label>
                            <RHFInput name="issuedBy" type="text" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="badgeNumber" className="text-xs mb-0.5">Badge number</label>
                            <RHFInput name="badgeNumber" type="text" />
                        </div>
                    </div>

                    {/* Section 4 */}
                    <h3 className="text-lg font-semibold mb-2">Vehicle Information</h3>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="vehicleRegNumber" className="text-xs mb-0.5">Registration</label>
                        <RHFInput name="vehicleRegNumber" type="text" className='w-1/4' />
                    </div>

                    <div className="mb-4 flex justify-start">
                        <div className="flex flex-col mb-2">
                            <label htmlFor="model" className="text-xs mb-0.5">Model</label>
                            <RHFInput name="model" type="text" className='w-1/2' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="passengerCapacity" className="text-xs mb-0.5">Passenger Capacity</label>
                            <RHFInput name="passengerCapacity" type="text" className='w-1/2' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="rideType" className="text-xs mb-0.5">Ride Type</label>
                            <RHFInput name="rideType" type="text" className='w-1/2' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="bodyType" className="text-xs mb-0.5">Body Type</label>
                            <RHFInput name="bodyType" type="text" className='w-1/2' />
                        </div>
                    </div>

                    <div className="mb-4 flex justify-start gap-5">
                        <div className="flex flex-col mb-2">
                            <label htmlFor="plateNumber" className="text-xs mb-0.5">Plate Number</label>
                            <RHFInput name="plateNumber" type="text" />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="issuedBy" className="text-xs mb-0.5">Issued by</label>
                            <RHFInput name="issuedBy" type="text" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        {/* // add toggle for: PPE barrier, disabled access, premium vehicle, Hackney Carriage, Pets, Wide vehicle */}
                        <div className="flex flex-col mb-2 gap-2 w-1/4">
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
                        <label htmlFor="insuranceCertNumber" className="text-xs mb-0.5">Insurance Certificate Number</label>
                        <RHFInput name="insuranceCertNumber" type="text" className='w-1/4' />
                    </div>

                </div>
            </div>

            {/* Right col */}
            <div className="col-span-5 p-4">
                <h2 className="text-2xl font-bold mb-4">Documents and expiry dates</h2>
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Submit
                </button>
            </div>
        </FormProvider>
    );
};
