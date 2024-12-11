import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import Input from "../components/form/UXInput";
import UXForm from "../components/form/UXForm";
import Button from "../components/ui/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const sucess = await login(data.email, data.password);
      if (sucess) {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during login"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-indigo-600 text-white py-4 px-6">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center mt-2 text-indigo-100">
            Log in to your account
          </p>
        </div>
        <UXForm onSubmit={onSubmit}>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              label="Email"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              label="Password"
            />
          </div>

          <div>
            <Button>Login</Button>
          </div>
        </UXForm>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Don&lsquo;t have an account?
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
