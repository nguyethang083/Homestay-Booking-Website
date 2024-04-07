import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onHomeClick: () => void;
}

const Header = ({ onLoginClick, onSignupClick, onHomeClick }: HeaderProps) => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-white py-6">
      <div className="max-w-[1232px] mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" onClick={onHomeClick}>
            {" "}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51584b15010d539d82d7118ecdac770f106b1979353ef27ec096e14ac3665656?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              alt="Company Logo"
              className="self-center aspect-[3.03] w-[111px] h-[36px]"
            />
          </Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-black px-3 font-semibold hover:bg-orange-500 hover:text-white rounded-xl"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-black px-3 font-semibold hover:bg-orange-500 hover:text-white rounded-xl"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <div className="flex space-x-2">
                <Link
                  to="/sign-in"
                  className="flex items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-transparent rounded-xl"
                >
                  <button onClick={onLoginClick}>Login</button>
                </Link>
                <Link
                  to="/register"
                  className="flex bg-white items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-2 border-mint rounded-xl"
                >
                  <button onClick={onSignupClick}>Sign Up</button>
                </Link>
              </div>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
