import { createContext, useEffect, useState } from "react";

export const authConext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("socialloop_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setloading] = useState(false);
  const [authError, setauthError] = useState("");

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("socialloop_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("socialloop_user");
      }
    } catch {
      // Ignore localStorage errors to avoid breaking auth flow.
    }
  }, [user]);

  return (
    <authConext.Provider
      value={{ user, setuser, loading, setloading, authError, setauthError }}
    >
      {children}
    </authConext.Provider>
  );
};
