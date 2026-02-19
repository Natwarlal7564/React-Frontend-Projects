import React, { useState } from "react";

export default function HidePasswordInput({
  password,
  setPassword,
  placeholder = "Password",
  className = ""
}) {
 
  const [hidepassword, setHidepassword] = useState("Hidden");

  
  const hideit = () => {
    if (hidepassword === "Visible") {
      setHidepassword("Hidden");
    } else {
      setHidepassword("Visible");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type={hidepassword === "Visible" ? "text" : "password"}
        placeholder={placeholder}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={className}
      />

      <button
        type="button"
        onClick={hideit}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
      >
        {hidepassword === "Visible" ? "Hide" : "Show"}
      </button>
    </div>
  );
}

