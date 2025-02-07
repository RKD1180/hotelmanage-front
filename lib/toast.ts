import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Default Toast Configuration
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000, // Closes after 3 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light", // You can switch to "dark"
};

// Custom Toast Functions
export const showSuccessToast = (message: string) => {
  toast.success(message, defaultOptions);
};

export const showErrorToast = (message: string) => {
  toast.error(message, defaultOptions);
};

export const showInfoToast = (message: string) => {
  toast.info(message, defaultOptions);
};

export const showWarningToast = (message: string) => {
  toast.warning(message, defaultOptions);
};
