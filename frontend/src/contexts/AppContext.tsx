import React, { useContext, useState, useEffect } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
  isHost: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [isHost, setIsHost] = useState(() => {
    // Get the initial value from localStorage
    const savedIsHost = localStorage.getItem("isHost");
    return savedIsHost ? JSON.parse(savedIsHost) : false;
  });

  const { isError, isSuccess } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
    }
  );

  const isLoggedIn = isSuccess;

  useEffect(() => {
    apiClient
      .fetchCurrentUser()
      .then((data) => {
        console.log(data);
        const hostStatus = data.role === "Host";
        setIsHost(hostStatus);
        // Save to localStorage whenever isHost changes
        localStorage.setItem("isHost", JSON.stringify(hostStatus));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
        isHost,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
