const EXISTING_EMAILS = ['test@gmail.com', 'test2@gmail.com', 'jc@gmail.com'];

const LICENSES = [
    {
        license: '1234',
        sex: 'Male',
        dob: '1990-01-01',
        addressmatch: true,
        type: 'Full',
        status: 'Active'
    },
    {
        license: '5678',
        sex: 'Female',
        dob: '1995-05-15',
        addressmatch: false,
        type: 'Provisional',
        status: 'Expired'
    },
    {
        license: '9012',
        sex: 'Male',
        dob: '1985-12-10',
        addressmatch: true,
        type: 'Full',
        status: 'Suspended'
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
