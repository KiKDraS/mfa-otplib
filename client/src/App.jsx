import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./pages/route";
import Signin from "./pages/Signin";
import Mfa from "./pages/Mfa";
import CheckAuth from "./pages/CheckAuth";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path={PUBLIC_ROUTES.SIGNIN} element={<Signin />} />

          {/* Private Routes */}
          <Route path="" element={<CheckAuth />}>
            <Route path={PRIVATE_ROUTES.MFA} element={<Mfa />} />
            <Route path={PRIVATE_ROUTES.HOME} element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
