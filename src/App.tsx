import DriverSignUp from "./components/DriverSignUp";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar userName="Operator Name" />
      <div className="px-5">
        <DriverSignUp />
      </div>
    </>
  );
}

export default App;
