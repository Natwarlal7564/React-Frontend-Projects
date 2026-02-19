import React, { useState } from "react";
import { User, Send, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentsApp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();

  //  LIVE RULES (needed for JSX feedback)
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasLength = password.length >= 8 && password.length <= 16;

  // ================= LOGIN =================
  const Login = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/payment");
      } else {
        alert(data.message || "Invalid Credentials");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ================= VALIDATE PASSWORD =================
  const validatePassword = () => {
    if (hasUpper && hasLower && hasDigit && hasLength) {
      console.log("Correct Password");
      return true;
    } else {
      console.log("Wrong Password");
      return false;
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    if (!validatePassword()) {
      console.log("Password invalid — stopping code");
      return;
    }

    console.log("Password valid, continuing...");
    navigate("/surya");
  };

  // ================= JSX =================
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="login-section">
          <h2 className="login-title">Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input username-input"
          />

         <HidePasswordInput
  password={password}
  setPassword={setPassword}
  placeholder="Password"
  className="login-input password-input"
/>
        </div>

        <nav className="bottom-nav">
          <div className="nav-inner">

            <button
              onClick={() => setActiveTab("home")}
              className={`nav-btn send-btn ${
                activeTab === "home" ? "active-tab" : ""
              }`}
            >
              <Send className="nav-icon" />
              <span className="nav-label">Send</span>
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`nav-btn history-btn ${
                activeTab === "history" ? "active-tab" : ""
              }`}
            >
              <History className="nav-icon" />
              <span className="nav-label">History</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                Login();
              }}
              className={`nav-btn profile-btn ${
                activeTab === "profile" ? "active-tab" : ""
              }`}
            >
              <User className="nav-icon" />
              <span className="nav-label">Profile</span>
            </button>

            {/* ================= SIGNUP SECTION ================= */}
            <div>
              <h2>Signup</h2>

              <HidePasswordInput
  password={password}
  setPassword={setPassword}
  placeholder="Password"
  className="login-input password-input"
/>
              {!hasUpper && <div>Include Uppercase</div>}
              {!hasLower && <div>Include Lowercase</div>}
              {!hasDigit && <div>Include Number</div>}
              {!hasLength && <div>Password must be 8–16 characters</div>}

              <button onClick={handleSignup}>Signup</button>
            </div>

            {/* ================= CENTER LOGIN CARD ================= */}
            <div className="center-login-wrapper">
              <div className="center-login-card">

                <h2 className="center-login-title">Login</h2>

                <input
                  type="text"
                  placeholder="User"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="center-input user-input"
                />

               <HidePasswordInput
  password={password}
  setPassword={setPassword}
  placeholder="Password"
  className="login-input password-input"
/>

                <button
                  onClick={Login}
                  className="signup-btn"
                >
                  Signup
                </button>

              </div>
            </div>

          </div>
        </nav>

      </div>
    </div>
  );
}

