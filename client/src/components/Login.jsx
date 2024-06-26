import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // Add this line to enable cookie sharing
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        formData
      );
      const { userId } = response.data;
      if (response.status === 200) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate(`/${userId}`);
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90%]">
      <div className="flex flex-col shadow-2xl absolute pt-10 p-8 w-1/2 md:w-1/3 lg:p-20 rounded-lg">
        <h1 className="text-black text-3xl mb-5 text-center">Login</h1>
        <form
          className="flex flex-col gap-4 w-full text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            className="h-10 focus:outline-none bg-slate-100 px-4 rounded-xl"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            className="h-10 focus:outline-none bg-slate-100 px-4 rounded-xl"
          />

          <button className="bg-blue-500 py-2 text-lg rounded-xl text-white">
            Login
          </button>
        </form>
        <Link
          to="/forgotPassword"
          className="text-red-600 mt-1 text-right text-xs"
        >
          Forgot Password?
        </Link>

        <div className="flex justify-center text-sm mt-1">
          <span className="text-black">New User? </span>
          <span>&nbsp;</span>
          <Link to="/register" className="text-red-600">
            Register
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
