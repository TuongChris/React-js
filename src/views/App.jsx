import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLogin from "../components/LoginPage/PageLogin";
import PageSignup from "../components/LoginPage/PageSignup";
import PageForget from "../components/LoginPage/PageForget";

function App() {
  return (
    <>
      <PageLogin />
      {/* <PageSignup /> */}
      {/* <PageForget /> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
