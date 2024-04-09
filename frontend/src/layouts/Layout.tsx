import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation();

  const showHero =
    location.pathname !== "/sign-in" && location.pathname !== "/register";
  const showSearchBar =
    location.pathname !== "/sign-in" &&
    location.pathname !== "/register" &&
    location.pathname !== "/add-hotel" &&
    location.pathname !== "/my-hotels" &&
    !location.pathname.startsWith("/edit-hotel");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="relative">
        {showHero && <Hero />}
        <div className="absolute top-[calc(100%-100px)] w-full md:w-5/6 left-1/2 transform translate-x-[-50%]">
          {showSearchBar && <SearchBar />}
        </div>
      </div>
      <div
        className={`container mx-auto z-10 w-full px-0 ${
          showHero && showSearchBar ? "mt-32" : ""
        }`}
      ></div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
