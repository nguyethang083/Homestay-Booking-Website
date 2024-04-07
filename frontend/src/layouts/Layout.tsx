import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isLoggedIn } = useAppContext();
  const [showHero, setShowHero] = useState(true);

  const handleButtonClick = () => {
    setShowHero(false);
  };

  const handleHomeClick = () => {
    setShowHero(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setShowHero(true);
    }
  }, [isLoggedIn]);

  const location = useLocation();
  const showHeroAndSearchBar = location.pathname !== "/add-hotel";

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onLoginClick={handleButtonClick}
        onSignupClick={handleButtonClick}
        onHomeClick={handleHomeClick}
      />
      <div className="relative">
        {showHero && <Hero />}
        <div className="absolute top-[calc(100%-100px)] w-full md:w-5/6 left-1/2 transform translate-x-[-50%]">
          {showHero && showHeroAndSearchBar && <SearchBar />}
        </div>
      </div>
      <div
        className={`container mx-auto z-10 w-full px-0 ${
          showHero && showHeroAndSearchBar ? "mt-32" : ""
        }`}
      ></div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
