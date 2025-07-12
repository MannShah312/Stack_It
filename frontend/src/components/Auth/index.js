import React, { useState, useContext } from "react";
import "./index.css";
import { API } from "../../service/api.js";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider.js";

const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  email: "",
  username: "",
  password: "",
};

export default function Index({ isUserAuthenticated }) {
  const [register, setRegister] = useState(false);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response;
    try {
      response = await API.userLogin(login);
      if (!response.isError) {
        setError("");

        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );

        setAccount({
          username: response.data.username,
          name: response.data.name,
        });
        isUserAuthenticated(true);
        setLogin(loginInitialValues);
        navigate("/");
      } else {
        setError(response.msg || "Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const signupUser = async () => {
    let response;
    try {
      response = await API.userSignup(signup);
      console.log("Response from signup:", response);

      if (response.isSuccess) {
        setError("");

        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );

        setAccount({
          username: response.data.username,
          name: response.data.name,
        });

        isUserAuthenticated(true);
        setSignup(signupInitialValues);
        navigate("/");
      } else {
        setError("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-login">
          <div className="auth-login-container">
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {register ? "REGISTER" : "LOGIN"}
            </h2>

            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input type="text" name="username" onChange={onInputChange} />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text" name="email" onChange={onInputChange} />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    onChange={onInputChange}
                  />
                </div>
                {error && (
                  <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>
                )}
                <button onClick={signupUser}>REGISTER</button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text" name="email" onChange={onValueChange} />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    onChange={onValueChange}
                  />
                </div>
                {error && (
                  <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>
                )}
                <button onClick={loginUser}>LOG IN</button>
              </>
            )}
            <div className="toggle-text">
              <p
                style={{
                  cursor: "pointer",
                  marginTop: "15px",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#ccc",
                }}
                onClick={() => setRegister(!register)}
              >
                {register
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}