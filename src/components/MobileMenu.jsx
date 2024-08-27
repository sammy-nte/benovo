import React from "react";
import { CloseMenuSvg } from "./Svgs/Svgs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMenu } from "../redux/redux-features/menuSlice";

function MobileMenu() {
  const dispatch = useDispatch();
  return (
    <section //   ? "open-menu" // className={`${menuControl
    //   : !menuControl ? "close-menu" : ""} mobile-menu md:!hidden`}
    className="mobile-menu z-50">
      <nav className="w-72 h-72 rounded-3xl flex flex-col justify-evenly items-center nav_shadows   ">
        <CloseMenuSvg
          fill="white"
          controlMenu={() => {
            dispatch(closeMenu());
          }}
        />
        <Link
          onClick={() => {
            dispatch(closeMenu());
          }}
          className="nav-links"
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            dispatch(closeMenu());
          }}
          className="nav-links"
          to="explore"
        >
          Explore
        </Link>
        <Link
          onClick={() => {
            dispatch(closeMenu());
          }}
          className="nav-links"
          to="about"
        >
          About Us
        </Link>
        <Link
          onClick={() => {
            dispatch(closeMenu());
          }}
          className="nav-links"
          to="contact"
        >
          Contact Us
        </Link>
        <Link
          onClick={() => {
            dispatch(closeMenu());
          }}
          className="nav-links"
          to="register"
        >
          <button className="mobile-apply-btn">Register</button>
        </Link>
      </nav>
    </section>
  );
}

export default MobileMenu;
