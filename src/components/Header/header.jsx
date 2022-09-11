import "./style.scss";
import { NavLink, Link } from "react-router-dom";
import logo from "./images/logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonToggleDropdown } from "../ButtonToggleDropdown";


export const Header = () => {
  const [shadow, setShadow] = useState("nav navbar header");
  const user = useSelector((state) => state.user.data);


  window.addEventListener("scroll", function (e) {
    if (this.scrollY > 40 && this.scrollY < 50) {
      setShadow("nav navbar header top");
    } else if (this.scrollY > 100) {
      setShadow("nav navbar header top shadow");
    } else if (this.scrollY === 0) {
      setShadow("nav navbar header");
    }
  });
  
  return (
    <>
    <nav className={shadow}>
      <div className="container">
        <div className="logo navbar-brand">
          <Link to="/">
            <img src={logo} width="50" alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className="menu">
          <ul className="ul">
            <li className="li">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="li">
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li className="li">
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
          {user.token ? (
            <ul className="user">
              <li className="user-name"><ButtonToggleDropdown title={user.name}/></li>
            </ul>
          ) : (
            <ul className="log-in-ul">
              <li className="log-in-li">
                <Link to="/log-in" className="btn log">
                  Log in
                </Link>
              </li>
              <li className="log-in-li">
                <Link to="/registration" className="btn reg">
                  Registration
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
    </>    
  );
};
