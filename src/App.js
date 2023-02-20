import { Route, Routes } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OffersPage from "./pages/OffersPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SingInPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/profile" element={<SignInPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
