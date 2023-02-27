import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExplorePage from "./pages/ExplorePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OffersPage from "./pages/OffersPage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SingInPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import CreateListingsPage from "./pages/CreateListingsPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-listing" element={<CreateListingsPage />} />
      </Routes>
      <NavBar />
      <ToastContainer />
    </div>
  );
}

export default App;
