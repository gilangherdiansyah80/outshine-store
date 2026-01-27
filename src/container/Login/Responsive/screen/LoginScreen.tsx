import { LoginHeader } from "../components/LoginHeader";
import { LoginForm } from "../components/LoginForm";
import { LoginFooter } from "../components/LoginFooter";

const LoginScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 px-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 space-y-8">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginScreen;
