# ARYVO Assignment

live demo: https://aryvo-assignment.vercel.app/

## Technologies used:

- React.js (vite as the build tool)
- TypeScript
- react-hook-form
- yup (for validation)
- firebase (for authentication)
- Tailwind CSS
- Vercel (for deployment)

## How to run the project locally:
```bash
git clone "this repo"
npm install
npm run dev
```

## Notes:
- I have made a guest user account for the purpose of this assignment. You can login with the following credentials, or you can create your own account.
    - email: demo@aryvo.com
    - password: demo123
- For convenience, I have added a `fill with mock details` button to fill the form with mock data.
- DVLA License Number, Registration have mock APIS to fetch data (see `src/mockAPIS/index.ts`)
- You can see the payload sent to the server in the console, as well as the file objects separately.


Sample payload sent to the server:

```json
{
    "fullName": "Soham Datta",
    "contactNumber": "+918860571693",
    "email": "sohamdatta34@gmail.com",
    "accountingRef": "1234",
    "nominalCode": "5678",
    "callSign": "soham",
    "commission": "20",
    "weeklyCharge": "50",
    "driverGroup": "Group A",
    "homeAddress": "somewhere, in, wales",
    "dvlaLicenseNumber": "1234",
    "driverType": "Driver",
    "issuedBy": "DVLA",
    "badgeNumber": "1234",
    "vehicleRegNumber": "1234",
    "model": "Jaguar",
    "passengerCapacity": "4",
    "rideType": "Taxi",
    "bodyType": "Sedan",
    "plateNumber": "1234",
    "insuranceCertNumber": "1234",
    "doc-dvlaLicense": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-05"
    },
    "doc-complianceCert": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-19"
    },
    "doc-insuranceCert": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-04"
    },
    "doc-proofOfAddress": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-25"
    },
    "doc-vehiclePlate": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-12"
    },
    "doc-hackneyBadge": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-05"
    },
    "doc-phBadge": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-18"
    },
    "doc-operatorLicense": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-02-02"
    },
    "doc-publicLiability": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-25"
    },
    "doc-employersLiability": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-03"
    },
    "doc-formB": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-02-10"
    },
    "doc-enchancedDBS": {
        "file": {"--fileObj_here"},
        "expiryDate": "2024-01-19"
    },
    "toggle_ppe": false,
    "toggle_dis": true,
    "toggle_prem": true,
    "toggle_HC": false,
    "toggle_pet": false,
    "toggle_wide": true
}
```
