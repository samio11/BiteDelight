import axios from "axios";
import { useContext, useEffect } from "react";
import { ContextProvider } from "../Auths/User_Managemrnt_Context";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create(
    {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true,
    }
)

const useAxiosSecure = () => {
    const { logout } = useContext(ContextProvider);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res;
            },
            async error => {
                if (error.response.status === 401 | error.response.status === 403) {
                    await logout();
                    navigate('/login', { replace: true });
                }
                return Promise.reject(error)
            }
        )
    }, [])
};

export default useAxiosSecure;