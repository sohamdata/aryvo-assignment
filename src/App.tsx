import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/auth/Register";
import RegisterDriver from "./pages/RegisterDriver";
import { auth, onAuthStateChanged, User } from './config/firebase';

export default function App() {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        // console.log("user signed in", auth.currentUser);
      } else {
        setActiveUser(null);
        // console.log("no user signed in");
      }

      setAuthCheckComplete(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authCheckComplete) {
    return <div className='flex justify-center items-center h-screen animate-pulse text-2xl font-bold text-blue-500'>
      <img src="/aryvologo.png" alt="Company Logo" className="mt-1 w-32" />
    </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<RegisterDriver email={activeUser.email || ''} />}></Route>
        <Route path="/signup" element={<Register />} /> */}
        <Route
          path="/"
          element={activeUser ? <RegisterDriver email={activeUser.email || ''} /> : <Navigate to="/signup" replace />}
        />
        <Route
          path="/signup"
          element={activeUser ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}
