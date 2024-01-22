import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from './hook-form/FormProvider';
import RHFInput from './hook-form/RHFInput';
import DocUpload from './DocUpload';

const Documents = [
    {
        name: 'doc-dvlaLicense',
        label: 'DVLA License',
    },
    {
        name: 'doc-complianceCert',
        label: 'Compliance Certificate',
    },
    {
        name: 'doc-insuranceCert',
        label: 'Insurance Certificate',
    },
    {
        name: 'doc-proofOfAddress',
        label: 'Proof of address',
    },
    {
        name: 'doc-vehiclePlate',
        label: 'Vehicle Plate',
    },
    {
        name: 'doc-hackneyBadge',
        label: 'Hackney Badge (if applicable)',
    },
    {
        name: 'doc-phBadge',
        label: 'PH Badge (if applicable)',
    },
    {
        name: 'doc-operatorLicense',
        label: 'Operator License (if applicable)',
    },
    {
        name: 'doc-publicLiability',
        label: 'Public Liability',
    },
    {
        name: 'doc-employersLiability',
        label: 'Employers Liability',
    },
    {
        name: 'doc-formB',
        label: 'Form B',
    },
    {
        name: 'doc-enchancedDBS',
        label: 'Enchanced DBS',
    },
]

type SelectedFiles = {
    [key: string]: File | null;
};

const DriverSignUp = () => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({});

    const handleFileChange = (name: string, file: File | null) => {
        const newSelectedFiles: SelectedFiles = { ...selectedFiles };

        if (file) {
            newSelectedFiles[name] = file;
        } else {
            delete newSelectedFiles[name];
        }
        setSelectedFiles(newSelectedFiles);
    };


    const onSubmit = useCallback((data: any) => {
        const formDataWithFiles = { ...data, ...selectedFiles };
        console.log(formDataWithFiles);
    }, [selectedFiles]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8">
            {/* Left col */}
            <div className="col-span-1 p-4">
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
                            <RHFInput name="contactNumber" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-xs mb-0.5">Enter Email Address</label>
                            <RHFInput name="email" type="email" />
                        </div>
                    </div>

                    {/* Section 1.2 */}
                    <div className="mb-4 flex justify-start gap-3">
                        <div className="flex flex-col">
                            <label htmlFor="accountingRef" className="text-xs mb-0.5">Accounting Ref</label>
                            <RHFInput name="accountingRef" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="nominalCode" className="text-xs mb-0.5">Nominal Code</label>
                            <RHFInput name="nominalCode" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="callSign" className="text-xs mb-0.5">Call Sign</label>
                            <RHFInput name="callSign" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="commission" className="text-xs mb-0.5">Commission %</label>
                            <RHFInput name="commission" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="weeklyCharge" className="text-xs mb-0.5">Weekly Charge</label>
                            <RHFInput name="weeklyCharge" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="driverGroup" className="text-xs mb-0.5">Driver Group</label>
                            <RHFInput name="driverGroup" type="text" />
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
                        <div className="flex flex-col mb-2">
                            <label htmlFor="dvlaLicenseNumber" className="text-xs mb-0.5">DVLA License Number</label>
                            <RHFInput name="dvlaLicenseNumber" type="text" />
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

                    <div className="mb-4 flex justify-between">
                        <div className="flex flex-col mb-2">
                            <label htmlFor="model" className="text-xs mb-0.5">Model</label>
                            <RHFInput name="model" type="text" className='w-2/3' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="passengerCapacity" className="text-xs mb-0.5">Passenger Capacity</label>
                            <RHFInput name="passengerCapacity" type="text" className='w-2/3' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="rideType" className="text-xs mb-0.5">Ride Type</label>
                            <RHFInput name="rideType" type="text" className='w-2/3' />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="bodyType" className="text-xs mb-0.5">Body Type</label>
                            <RHFInput name="bodyType" type="text" className='w-2/3' />
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
                        <label htmlFor="insuranceCertNumber" className="text-xs mb-0.5">Insurance Certificate Number</label>
                        <RHFInput name="insuranceCertNumber" type="text" className='w-1/4' />
                    </div>

                </div>
            </div>

            {/* Right col */}
            <div className="col-span-1 p-4">
                <h2 className="text-2xl font-bold mb-4">Documents and expiry dates</h2>

                <div className=" mb-4 flex flex-col gap-2">

                    {/* <input
                        type="file"
                        id="dvlaLicense"
                        name="dvlaLicense"
                        onChange={(event) => handleFileChange('dvlaLicense', event)}
                    /> */}

                    {Documents.map((doc) => (
                        <DocUpload key={doc.name} name={doc.name} label={doc.label} onFileChange={handleFileChange} />
                    ))}

                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </div>
        </FormProvider>
    );
};

export default DriverSignUp;
