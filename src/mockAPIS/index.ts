const EXISTING_EMAILS = ['test@gmail.com', 'test2@gmail.com', 'jc@gmail.com'];

export const LICENSES = [
    {
        license: '1234' as const,
        sex: 'Male',
        dob: '1990-01-01',
        addressmatch: 'true',
        type: 'Full',
        status: 'Active'
    },
    {
        license: '5678' as const,
        sex: 'Female',
        dob: '1995-05-15',
        addressmatch: 'false',
        type: 'Provisional',
        status: 'Expired'
    },
    {
        license: '9012' as const,
        sex: 'Male',
        dob: '1985-12-10',
        addressmatch: 'true',
        type: 'Full',
        status: 'Suspended'
    }
];

export const CAR_DETAILS = [
    {
        vehicleRegNumber: '1234' as const,
        make: 'Ford',
        color: 'Red',
        year: '2015',
        euroStatus: 'Euro 6',
        fuel: 'Petrol'
    },
    {
        vehicleRegNumber: '5678' as const,
        make: 'Rover',
        color: 'Blue',
        year: '2020',
        euroStatus: 'Euro 6',
        fuel: 'Petrol'
    },
    {
        vehicleRegNumber: '9012' as const,
        make: 'Toyota',
        color: 'Black',
        year: '2016',
        euroStatus: 'Euro 6',
        fuel: 'Hybrid'
    }
];


export async function checkAccountExists({ email }: { email: string }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (EXISTING_EMAILS.includes(email)) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000);
    });
}

export async function validateLicense({ license }: { license: string }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = LICENSES.find((l) => l.license === license);
            if (result) {
                resolve(result);
            } else {
                resolve(false);
            }
        }, 1000);
    });
}


export async function validateRegNumber({ vehicleRegNumber }: { vehicleRegNumber: string }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = CAR_DETAILS.find((l) => l.vehicleRegNumber === vehicleRegNumber);
            if (result) {
                resolve(result);
            } else {
                resolve(false);
            }
        }, 1000);
    });
}
