import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import HamburgerMenu from "./HamburgerMenu";
import { BsPersonCircle } from "react-icons/bs";
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  const location = useLocation();

  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink
          className="font-semibold h-12 flex items-center text-base"
          to="/user-profile"
        >
          <UserOutlined className="mr-2" /> My Account
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <button className="h-12 flex items-center text-base">
          <LogoutOutlined className="mr-2" /> <SignOutButton />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white py-6">
      <div className="max-w-[1232px] mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight md:mx-auto">
          <NavLink to="/">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51584b15010d539d82d7118ecdac770f106b1979353ef27ec096e14ac3665656?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              className="self-center aspect-[3.03] w-[111px] h-[36px]"
            />
          </NavLink>
        </span>
        <div className="md:flex hidden justify-center space-x-2 flex-grow">
          <NavLink
            className={
              location.pathname === "/"
                ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                : "flex items-center text-black px-2 font-semibold border-b-2 border-transparent"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={
              location.pathname === "/search"
                ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                : "flex items-center text-black px-2 font-semibold border-b-2 border-transparent"
            }
            to="/search"
          >
            Hotels
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink
                className={
                  location.pathname === "/my-bookings"
                    ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                    : "flex items-center text-black px-2 font-semibold border-b-2 border-transparent"
                }
                to="/my-bookings"
              >
                My Bookings
              </NavLink>
              <NavLink
                className={
                  location.pathname === "/my-hotels"
                    ? "flex items-center text-black px-2 font-semibold border-b-2 border-orange-500"
                    : "flex items-center text-black px-2 font-semibold border-b-2 border-transparent"
                }
                to="/my-hotels"
              >
                My Hotels
              </NavLink>
            </>
          )}
        </div>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <Dropdown menu={{ items: menuItems }}>
              <div className="flex items-center">
                <BsPersonCircle className="text-2xl cursor-pointer" />
              </div>
            </Dropdown>
          ) : (
            <NavLink to="/sign-in" className="flex items-center text-2xl">
              <BsPersonCircle />
            </NavLink>
          )}
          <div className="flex mt-1 items-center">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
