import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import UXForm from "../components/form/UXForm";
import UXInput from "../components/form/UXInput";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const sucess = await registerUser(
        data.name,
        data.email,
        data.password,
        data.photoUrl
      );
      if (sucess) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during registration"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-indigo-600 text-white py-4 px-6">
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>
          <p className="text-center mt-2 text-indigo-100">
            Join our Japanese learning community
          </p>
        </div>
        <UXForm onSubmit={onSubmit}>
          <div>
            <UXInput
              type="text"
              name="name"
              placeholder="Enter your full name"
              label="Name"
            />
          </div>
          <div>
            <UXInput
              type="email"
              name="email"
              placeholder="you@example.com"
              label="Email"
            />
          </div>
          <div>
            <UXInput
              type="password"
              name="password"
              placeholder="Create a strong password"
              label="Password"
            />
          </div>
          <div>
            <UXInput
              type="url"
              name="photoUrl"
              placeholder="https://example.com/your-photo.jpg"
              label="Photo URL (optional)"
              required={false}
            />
          </div>
          <div>
            <Button>Register</Button>
          </div>
        </UXForm>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
