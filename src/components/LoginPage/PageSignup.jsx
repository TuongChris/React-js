import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSignIn from "@mui/material/Button";

const PageSignup = () => {
  const labels = [
    "First Name:",
    "Last Name:",
    "Phone Number:",
    "Email:",
    "Password:",
    "Confirm Password:",
  ];
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(value);
  };

  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(03|05|07|08|09)\d{8}$/;
    return phoneNumberRegex.test(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      passwordRef.current.setCustomValidity("Passwords do not match.");
    } else {
      passwordRef.current.setCustomValidity("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = labels.every((label, index) => {
      const value = e.target.elements[`field_${index}`].value;
      return value.trim() !== "";
    });

    if (isFormValid) {
      if (!validateEmail(email)) {
        setEmailError("Invalid email format!");
        toast.error("Invalid email format!");
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneNumberError("Invalid phone number format!");
        toast.error("Invalid phone number format!");
        return;
      }
      if (password.length < 7) {
        toast.error("Password must be at least 7 characters long!");
        return;
      }
      if (!passwordRef.current.checkValidity()) {
        toast.error("Passwords do not match!");
        return;
      }
      const formData = {};
      labels.forEach((label, index) => {
        formData[`field_${index}`] = e.target.elements[`field_${index}`].value;
      });
      axios
        .post("http://localhost:3000/persons", formData)
        .then((response) => {
          console.log(response.data);
          toast.success("Sign up completed successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      setEmailError("");
      setPhoneNumberError("");
    } else {
      console.log("Vui lòng điền đầy đủ thông tin.");
      toast.error("Please complete all information");
    }
  };

  return (
    <div className="sm:max-w-[400px] m-auto">
      <form className="px-5 mt-5 md:mt-2" onSubmit={handleSubmit}>
        <div className="flex flex-col text-center mb-3">
          <h1 className="font-bold uppercase mt-3 cursor-pointer">Sign Up</h1>
          <p className="font-medium">
            Welcome! Fill out the information to register
          </p>
          <p className="font-medium">
            <span className="font-bold underline text-blue-500 cursor-pointer">
              Sign up
            </span>{" "}
            to join company
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label>{labels[0]}</label>
            <input
              type="text"
              name="field_0"
              id="field_0"
              placeholder="example: Mai"
              className="w-full border-2 border-solid border-gray-700 rounded-md px-3 py-2 lg:py-1 focus:border-blue-500 mb-3 border-opacity-[0.7]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>{labels[1]}</label>
            <input
              type="text"
              name="field_1"
              id="field_1"
              placeholder="example: Chí Tường"
              className="w-full border-2 border-solid border-gray-700 rounded-md px-3 py-2 lg:py-1 focus:border-blue-500 mb-3 border-opacity-[0.7]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>{labels[2]}</label>
            <input
              type="text"
              name="field_2"
              id="field_2"
              placeholder="example: 0399xxx"
              className="w-full border-2 border-solid border-gray-700 rounded-md px-3 py-2 lg:py-1 focus:border-blue-500 mb-3 border-opacity-[0.7]"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
            {phoneNumberError && (
              <p className="text-bold text-red-700 hidden">
                {phoneNumberError}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>{labels[3]}</label>
            <input
              type="email"
              name="field_3"
              id="field_3"
              placeholder="example: mchituong***@gmail.com"
              className="w-full border-2 border-solid border-gray-700 rounded-md px-3 py-2 lg:py-1 focus:border-blue-500 mb-3 border-opacity-[0.7]"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-bold text-red-700 hidden">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>{labels[4]}</label>
            <input
              type={showPassword ? "text" : "password"}
              name="field_4"
              id="field_4"
              placeholder="###"
              className="w-full border-2 border-solid border-gray-700 rounded-md px-3 py-2 lg:py-1 focus:border-blue-500 mb-3 border-opacity-[0.7]"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>{labels[5]}</label>
            <input
              type={showPassword ? "text" : "password"}
              name="field_5"
              id="field_5"
              placeholder="###"
              className="w-full border-2 border-solid border-gray-700 rounded-md px-3 py-2 lg:py-1 focus:border-blue-500 mb-3 border-opacity-[0.7]"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              ref={passwordRef}
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center mb-5">
            <div className="flex items-center ">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-[5px] cursor-pointer "
                checked={showPassword}
                onChange={handleShowPassword}
              />
              <label htmlFor="showPassword" className="text-[12px] ">
                Show Password
              </label>
            </div>
            <div className="flex flex-row">
              <label className="font-normal text-[12px] text-blue-600 underline cursor-pointer ">
                Read and agree to our license/terms?
              </label>
              <input
                type="checkbox"
                name="license"
                id="license"
                className="ml-[5px]"
                required
              />
            </div>
          </div>
          <ButtonSignIn variant="contained" type="submit">
            Sign up
          </ButtonSignIn>
        </div>
      </form>
    </div>
  );
};

export default PageSignup;
