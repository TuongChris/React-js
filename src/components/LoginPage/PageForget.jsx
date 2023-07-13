import ButtonSignIn from "@mui/material/Button";

const PageForget = () => {
  return (
    <div className="sm:max-w-[400px] m-auto mt-20">
      <form className="flex flex-col items-center px-5">
        <h2 className="font-bold text-[22px] mb-3">Forgot Password</h2>
        <p className="font-bold text-[16px] mb-5">Please enter email</p>
        <input
          type="email"
          placeholder="Your email"
          className="border-solid border-2 rounded-md px-3 py-2 w-full focus:border-blue-500 mb-5"
        />
        <ButtonSignIn
          variant="contained"
          type="submit"
          className="w-full cursor-pointer"
        >
          Forget password
        </ButtonSignIn>
        <p className="text-center mt-10 opacity-[0.8]">
          Copyright ©
          <span className="underline cursor-pointer">Your Website</span> 2023
        </p>
      </form>
    </div>
  );
};

export default PageForget;
