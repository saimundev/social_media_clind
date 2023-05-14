import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reguster from "./pages/auth/Reguster";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import Redirect from "./pages/auth/Redirect";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import PrivateRoute from "./pages/auth/PrivateRoute";
import FdProfile from "./pages/friendPrifile/FdProfile";
import Setting from "./setting/Setting";
import SettingPage from "./setting/SettingPage";
import ResetPassword from "./setting/ResetPassword";
import Theme from "./setting/Theme";
import DeleteAccount from "./setting/DeleteAccount";
import Password from "./setting/Password";
import Forgaten from "./pages/auth/Forgaten";
import UPdatePassword from "./pages/auth/UPdatePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/reguster" element={<Reguster />} />
          <Route path="/email-varifacation" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forgaten />} />
          <Route path="/email-varefay" element={<UPdatePassword />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/friend-profile/:id"
            element={
              <PrivateRoute>
                <FdProfile />
              </PrivateRoute>
            }
          />

          <Route path="/setting/*" element={<Setting />}>
            <Route path="setting-page" element={<SettingPage />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="password" element={<Password />} />
            <Route path="theme" element={<Theme />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
