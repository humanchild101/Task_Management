import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const handleClick = (link: any) => {
    setActive(link);
    navigate(`/${link}`);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img
            src="/logo.png"
            alt="Logo"
            width="70"
            height="71"
            style={{ marginRight: "0px", fontFamily: "'Ubuntu', sans-serif" }}
          />
        </div>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              onClick={() => handleClick("home")}
              style={{
                fontWeight: active === "home" ? 800 : 400,
                fontSize: 30,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              Home
            </a>
            <a
              className="nav-link"
              href="#"
              onClick={() => handleClick("projects")}
              style={{
                fontWeight: active === "projects" ? 800 : 400,
                fontSize: 30,
                marginRight: 20,
              }}
            >
              Projects
            </a>
            <a
              className="nav-link"
              href="#"
              onClick={() => handleClick("user-management")}
              style={{
                fontWeight: active === "user-management" ? 800 : 400,
                fontSize: 30,
                marginRight: 20,
              }}
            >
              Manage Users
            </a>
            <a
              className="nav-link"
              href="#"
              onClick={() => handleClick("settings")}
              style={{
                fontWeight: active === "settings" ? 800 : 400,
                fontSize: 30,
                marginRight: 20,
              }}
            >
              Settings
            </a>
            {/* <a className="nav-link disabled" aria-disabled="true">
              Disabled
            </a> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
