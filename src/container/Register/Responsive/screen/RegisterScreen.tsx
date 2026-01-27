import { RegisterHeader } from "../components/RegisterHeader";
import { RegisterForm } from "../components/RegisterForm";
import { RegisterFooter } from "../components/RegisterFooter";

const RegisterScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-10 px-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 space-y-8">
        <RegisterHeader />
        <RegisterForm />
        <RegisterFooter />
      </div>
    </div>
  );
};

export default RegisterScreen;
