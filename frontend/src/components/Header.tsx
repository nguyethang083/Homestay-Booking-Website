import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  return (
    <div className="bg-white py-6">
      <div className="max-w-[1232px] mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <NavLink to="/">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51584b15010d539d82d7118ecdac770f106b1979353ef27ec096e14ac3665656?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              className="self-center aspect-[3.03] w-[111px] h-[36px]"
            />
          </NavLink>
        </span>
        <span className="flex space-x-2">
          <NavLink
            className={
              location.pathname === "/"
                ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                : "flex items-center text-black px-2 font-semibold"
            }
            to="/"
          >
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                className={
                  location.pathname === "/my-bookings"
                    ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                    : "flex items-center text-black px-2 font-semibold"
                }
                to="/my-bookings"
              >
                My Bookings
              </NavLink>
              <NavLink
                className={
                  location.pathname === "/my-hotels"
                    ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                    : "flex items-center text-black px-2 font-semibold"
                }
                to="/my-hotels"
              >
                My Hotels
              </NavLink>
              <SignOutButton />
            </>
          ) : (
            <>
              <div className="flex space-x-2">
                <NavLink
                  to="/sign-in"
                  className="flex items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-transparent rounded-xl transition-all duration-200 ease-in-out"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex bg-white items-center text-black px-6 font-semibold hover:border-orange-500 hover:bg-orange-500 hover:text-white border-2 border-mint rounded-xl transition-all duration-200 ease-in-out"
                >
                  Sign Up
                </NavLink>
              </div>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
