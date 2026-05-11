import { useContext } from "react";
import { authConext } from "../context/auth.context";
import { loginApi, RegisterApi } from "../service/auth.api";

export function useAuth() {
  const context = useContext(authConext);
  const { setuser, loading, setloading, user, authError, setauthError } =
    context;

  const extractErrorMessage = (error, fallbackMessage) =>
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.Messge ||
    error?.message ||
    fallbackMessage;

  const clearAuthError = () => setauthError("");

  const handleLogin = async (username, password) => {
    try {
      setloading(true);
      clearAuthError();
      const data = await loginApi(username, password);
      setuser(data.user);
      return true;
    } catch (error) {
      setauthError(extractErrorMessage(error, "Unable to login"));
      return false;
    } finally {
      setloading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      setloading(true);
      clearAuthError();
      await RegisterApi(username, email, password);
      return true;
    } catch (error) {
      setauthError(extractErrorMessage(error, "Unable to register"));
      return false;
    } finally {
      setloading(false);
    }
  };

  return { handleLogin, loading, user, handleRegister, authError, clearAuthError };
}
