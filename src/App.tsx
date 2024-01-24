import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import RegisterDriver from "./pages/RegisterDriver";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterDriver />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
