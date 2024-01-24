import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import RegisterDriver from "./pages/RegisterDriver";
import { auth, onAuthStateChanged } from './config/firebase';

export default function App() {

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user signed in", auth.currentUser);
      } else {
        console.log("no user signed in");
      }
    });

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterDriver />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
