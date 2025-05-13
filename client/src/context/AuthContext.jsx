import { createContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser(); // Check if Clerk is loaded
  const { signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("Clerk Loaded:", isLoaded);
    console.log("User Signed In:", isSignedIn);
    console.log("User Data:", user);

    if (isLoaded) {
      if (isSignedIn && user) {
        setCurrentUser({
          username: user.username || user.firstName || "User",
          email: user.primaryEmailAddress?.emailAddress || "No Email",
          avatar: user.profileImageUrl || "/noavatar.jpg",
        });
      } else {
        setCurrentUser(null);
      }
    }
  }, [user, isSignedIn, isLoaded]);

  const handleLogout = async () => {
    await signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUser: setCurrentUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
