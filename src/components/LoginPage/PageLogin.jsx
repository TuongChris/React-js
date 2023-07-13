import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ButtonSignIn from "@mui/material/Button";
import "./scss/PageLogin.scss";

const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    if (username && password) {
      if (!validateEmail(username)) {
        return;
      }
      if (password.length < 7) {
        toast.error("Password must be at least 7 characters long.");
        return;
      }
      const newUser = { username, password };
      axios
        .post("http://localhost:3000/users", newUser)
        .then(() => {
          console.log("Đăng nhập với:", username, password);
          setUsername("");
          setPassword("");
          setIsChecked(false);
          setIsSuccess(true);
          showSuccessToast();
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const showSuccessToast = () => {
    toast.success("Sign in successful!");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="sm:max-w-[400px] m-auto">
      <div className="flex flex-col items-center justify-center mt-16 cursor-pointer">
        <LockOutlinedIcon className="text-white bg-purple-800 rounded-full p-1" />
        <h2 className="font-bold mt-1 mb-5">Sign in</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center px-5"
      >
        <div className="w-full">
          <input
            type="email"
            id="username"
            placeholder="Email Address*"
            className="border-solid border-2 rounded-md px-3 py-2 w-full focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="w-full mt-5">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password*"
            className="border-solid border-2 rounded-md px-3 py-2 w-full focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-row justify-between mt-5 mb-7">
          <div className="flex flex-row cursor-pointer">
            <input
              type="checkbox"
              name="checkbox"
              className="mr-[5px] cursor-pointer"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span className="font-medium text-[14px]">Remember me</span>
          </div>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-[14px] font-medium"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
        <ButtonSignIn
          variant="contained"
          type="submit"
          className="w-full cursor-pointer"
        >
          Sign In
        </ButtonSignIn>
        {isSuccess && <p className="hidden">Sign in successful!</p>}
        <div className="w-full flex flex-row mt-5 justify-between">
          <p className="font-normal text-sm text-blue-600 underline cursor-pointer">
            Forgot password?
          </p>
          <p className="flex font-normal text-sm text-blue-600 underline cursor-pointer">
            Don`t have an account?<span>Sign up</span>
          </p>
        </div>
      </form>
      <p className="text-center mt-10 opacity-[0.8]">
        Copyright ©
        <span className="underline cursor-pointer">Your Website</span> 2023
      </p>
    </div>
  );
};

export default PageLogin;
