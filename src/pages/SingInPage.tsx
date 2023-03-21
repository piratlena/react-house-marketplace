import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      <div className="pageContainer">
        <main>
          <div className="auth">
            <div>
              <p className="pageTitle">Welcome Back!</p>
            </div>
            <form onSubmit={onSubmit}>
              <input
                className="emailInput"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <div className="passwordInputDiv">
                <input
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <img
                  src={visibilityIcon}
                  alt="show password"
                  className="showPassword"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password
              </Link>

              <div className="signInBar">
                <button className="signInButton">
                  Sign In
                  <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
                </button>
              </div>
            </form>
            <OAuth />
            <Link to="/sign-up" className="registerLink">
              Sign Up Instead
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignInPage;
