import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Toaster = () => (
  <ToastContainer
    position="top-right"
    autoClose={1000}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    draggable
    theme="dark"
  />
);

export default Toaster;
