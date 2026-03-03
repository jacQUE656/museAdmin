import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../App";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must used wiithin an AuthProvider");

  }
  return context;
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);




  const login = async (email, password ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password, portal:"admin" });
      if (response.status === 200) {
        setToken(response.data.token);
        setUser(response.data.user);
        setUserRole(response.data.user_role)
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", response.data.user);
        localStorage.setItem("userRole", response.data.user_role);

        return {
          success: true,
          message: 'Login successful'
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Login failed'
        };
      }

    } catch (error) {

      return {
        success: false,
        message: error.response.data || 'Network Failed'
      };
    }
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem("adminUser");
    localStorage.removeItem("userRole");


  }

  const isAuthenticated = () => {
    return !!token && !!user;
  }

  const isAdmin = () => {
    return user & userRole === "ADMIN";
  }
  

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser");
    const storedUserRole = localStorage.getItem("userRole");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setUserRole(storedUserRole);
    }
    setLoading(false);

  }, [])



  const contextValue = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    userRole
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}