import { Link, NavLink } from "react-router-dom";
import { OpenMenuSvg } from "./Svgs/Svgs";
import { useDispatch } from "react-redux";
import { openMenu } from "../redux/redux-features/menuSlice";
function PageHeader() {
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between p-2 items-center z-40">
      <Link to="dashboard">
        <h3 className="px-5 font-medium">
          <span className="before:block before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
            <span className="relative text-white">Benevo</span>
          </span>
        </h3>
      </Link>
      <nav className="hidden md:block">
        <Link className="mx-7 pb-1 relative after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[.2rem] after:bg-tempColor after:transition-all after:duration-300 hover:after:w-full">
          Home
        </Link>
        <Link
          to="explore"
          className="mx-7 pb-1 relative after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[.2rem] after:bg-tempColor after:transition-all after:duration-300 hover:after:w-full"
        >
          Explore
        </Link>
        <Link
          to="about"
          className="mx-7 pb-1 relative after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[.2rem] after:bg-tempColor after:transition-all after:duration-300 hover:after:w-full"
        >
          About Us
        </Link>
        <Link
          to="contact"
          className="mx-7 pb-1 relative after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[.2rem] after:bg-tempColor after:transition-all after:duration-300 hover:after:w-full"
        >
          Contact Us
        </Link>
      </nav>
      <Link to="register">
        <button className="hidden md:block w-[100px] h-8 bg-tempColor mr-2 rounded-md text-white font-medium text-sm">
          Register
        </button>
      </Link>
      <OpenMenuSvg
        width="35px"
        fill="black"
        controlMenu={() => {
          dispatch(openMenu());
        }}
      />
    </header>
  );
}

export default PageHeader;
