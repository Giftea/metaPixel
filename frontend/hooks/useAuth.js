import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};

export default useAuth;
