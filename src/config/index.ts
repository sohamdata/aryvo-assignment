import * as Yup from 'yup';

export const DOCUMENT_TYPES = [
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
];

export const DRIVER_DETAILS_SCHEMA = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    accountingRef: Yup.string().required('Accounting ref is required'),
    nominalCode: Yup.string().required('Nominal code is required'),
    callSign: Yup.string().required('Call sign is required'),
    commission: Yup.string().required('Commission is required'),
    weeklyCharge: Yup.string().required('Weekly charge is required'),
    driverGroup: Yup.string().required('Driver group is required'),
    homeAddress: Yup.string().required('Home address is required'),
    dvlaLicenseNumber: Yup.string().required('DVLA license number is required'),
    driverType: Yup.string().required('Driver type is required'),
    issuedBy: Yup.string().required('Issued by is required'),
    badgeNumber: Yup.string().required('Badge number is required'),
    vehicleRegNumber: Yup.string().required('Vehicle registration number is required'),
    model: Yup.string().required('Model is required'),
    passengerCapacity: Yup.string().required('Passenger capacity is required'),
    rideType: Yup.string().required('Ride type is required'),
    bodyType: Yup.string().required('Body type is required'),
    plateNumber: Yup.string().required('Plate number is required'),
    insuranceCertNumber: Yup.string().required('Insurance certificate number is required'),
});

export const MOCK_DRIVER_DETAILS = {
    fullName: 'Soham Datta',
    contactNumber: '+918860571693',
    email: 'sohamdatta34@gmail.com',
    accountingRef: '1234',
    nominalCode: '5678',
    callSign: 'soham',
    commission: '20',
    weeklyCharge: '50',
    driverGroup: 'Group A',
    homeAddress: 'somewhere, in, wales',
    dvlaLicenseNumber: '1234',
    driverType: 'Driver',
    issuedBy: 'DVLA',
    badgeNumber: '1234',
    vehicleRegNumber: '1234',
    model: 'Jaguar',
    passengerCapacity: '4',
    rideType: 'Taxi',
    bodyType: 'Sedan',
    plateNumber: '1234',
    insuranceCertNumber: '1234',
};
