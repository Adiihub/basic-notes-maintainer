import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : ""}`}>
      <div className="navbar-container">
        <h1>Notes</h1>
        <button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkMode ? "Light-Mode" : "Dark-Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
