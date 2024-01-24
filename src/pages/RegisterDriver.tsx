import DriverSignUp from "../components/DriverSignUp";
import Navbar from "../components/Navbar";

function RegisterDriver({ email }: { email: string }) {

  return (
    <>
      <Navbar userName={email} />
      <div className="px-5">
        <DriverSignUp />
      </div>
    </>
  );
}

export default RegisterDriver;
