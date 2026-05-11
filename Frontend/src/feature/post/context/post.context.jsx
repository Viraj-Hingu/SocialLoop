import { createContext, useState } from "react";

export const postContext = createContext();

export const PostContextprovider = ({ children }) => {
  const [feed, setfeed] = useState([]);
  const [loading, setloading] = useState(false);
  const [postError, setpostError] = useState("");

  return (
    <postContext.Provider
      value={{ feed, setfeed, loading, setloading, postError, setpostError }}
    >
      {children}
    </postContext.Provider>
  );
};
