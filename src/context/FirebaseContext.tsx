import { createContext } from "react";

const FirebaseContext = createContext(null);

interface IFirebaseProvider {
    children: React.ReactNode
}

export default function FirebaseProvider({ children }: IFirebaseProvider) {
    return (
        <FirebaseContext.Provider value={null}>
            {children}
        </FirebaseContext.Provider>
    );
}
