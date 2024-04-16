"use client";

import { Query } from "appwrite";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

import { account, appwriteConfig, databases } from "@/lib/appwrite/config";

export const InitialUser = {
  id: "",
  accountId: "",
  stripeId: "",
  name: "",
  email: "",
  image: "",
};

const InitialState = {
  user: InitialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type ContextType = {
  user: User;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => void;
};

// Create a context for the auth state
const AuthContext = createContext<ContextType>(InitialState);

// Context provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(InitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log({ user });
  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      // Check if there's a logged in user
      const currentAccount = await account.get();
      setIsAuthenticated(true);

      // Get current user's details
      const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );

      const currentUser = result.documents[0];

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          accountId: currentUser.accountId,
          stripeId: currentUser.stripeId,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image,
        });
      }
    } catch (error) {
      console.error("An error occurred while setting user context:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === "{}" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      router.push("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
