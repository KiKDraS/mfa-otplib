/* eslint-disable react/prop-types */
import { createContext, useMemo, useCallback, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../pages/route";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  const getQRCode = useCallback(
    async (credential) => {
      sessionStorage.removeItem("cloaked");
      try {
        const decoded = jwtDecode(credential);
        const res = await fetch(`${import.meta.env.VITE_URL}/mfa-setup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: decoded.email }),
        });

        if (!res.ok) throw new Error("No se pudo crear el qr");

        const data = await res.json();
        setQrCode(data.qrCode);
        setUserEmail(decoded.email);
        sessionStorage.setItem("cloaked", data.secret);

        navigate(PRIVATE_ROUTES.MFA);
      } catch (error) {
        console.log(error);
      }
    },
    [navigate]
  );

  const verifyOTP = useCallback(
    async (token) => {
      try {
        const secret = sessionStorage.getItem("cloaked");
        const res = await fetch(`${import.meta.env.VITE_URL}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret, token }),
        });

        if (!res.ok) throw new Error("No se pudo autenticar");

        const data = await res.json();

        sessionStorage.removeItem("cloaked");
        if (data.isValid) navigate(PRIVATE_ROUTES.HOME);
      } catch (error) {
        console.log(error);
      }
    },
    [navigate]
  );

  const checkAuth = useCallback(() => {
    return Boolean(userEmail);
  }, [userEmail]);

  const data = useMemo(
    () => ({
      qrCode,
      getQRCode,
      checkAuth,
      verifyOTP,
      userEmail,
    }),
    [checkAuth, getQRCode, qrCode, userEmail, verifyOTP]
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
