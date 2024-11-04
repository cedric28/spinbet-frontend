import axios, { AxiosError } from 'axios';
import { apiURL } from '@/config/api';
import Swal from 'sweetalert2';

// Set the base URL for Axios
axios.defaults.baseURL = apiURL;

// Intercept responses for error handling
axios.interceptors.response.use(
  null,
  (error: AxiosError) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    // Handle unexpected errors
    if (!expectedError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred.',
      });
    }

    return Promise.reject(error);
  }
);


// Export an object with the Axios methods and the setJwt function
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
