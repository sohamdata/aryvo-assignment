import { createContext, useContext } from "react";
import { signUp, signIn, signOutUser, SignInData, SignUpData } from "../utils/authFunctions";
import { UserCredential } from "firebase/auth";

interface AuthFunctions {
    signUp: (data: SignUpData) => Promise<UserCredential>,
    signIn: (data: SignInData) => Promise<UserCredential | undefined>,
    signOutUser: () => Promise<void>,
}

const FirebaseContext = createContext<AuthFunctions | null>(null);

export const useAuth = () => {
    return useContext(FirebaseContext);
};

interface IFirebaseProvider {
    children: React.ReactNode
}

export default function FirebaseProvider({ children }: IFirebaseProvider) {

    return (
        <FirebaseContext.Provider value={{ signUp, signIn, signOutUser }}>
            {children}
        </FirebaseContext.Provider>
    );
}
