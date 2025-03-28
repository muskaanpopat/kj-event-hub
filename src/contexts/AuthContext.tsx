
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define user roles
export type UserRole = "student" | "committee-head" | "internship-cell" | "exam-cell";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole, department?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login logic - in a real app, this would validate credentials against a backend
      if (email && password) {
        // For demo purposes, determine user role based on email
        let role: UserRole = "student";
        if (email.includes("committee")) {
          role = "committee-head";
        } else if (email.includes("internship")) {
          role = "internship-cell";
        } else if (email.includes("exam")) {
          role = "exam-cell";
        }

        const loggedInUser: User = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          name: email.split("@")[0],
          email,
          role
        };

        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);

        toast({
          title: "Login Successful",
          description: `Welcome back, ${loggedInUser.name}!`,
        });

        // Redirect based on role
        redirectBasedOnRole(role);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole, 
    department?: string
  ) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (name && email && password && role) {
        const newUser: User = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          name,
          email,
          role
        };

        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);

        toast({
          title: "Registration Successful",
          description: `Welcome to KJ CONNECT, ${name}!`,
        });

        // Redirect based on role
        redirectBasedOnRole(role);
      } else {
        throw new Error("Please fill in all required fields");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case "student":
        navigate("/dashboard/student");
        break;
      case "committee-head":
        navigate("/dashboard/committee");
        break;
      case "internship-cell":
        navigate("/dashboard/internship");
        break;
      case "exam-cell":
        navigate("/dashboard/exam-cell");
        break;
      default:
        navigate("/");
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
