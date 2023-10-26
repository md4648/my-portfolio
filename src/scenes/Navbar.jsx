import { useState, useEffect, useRef } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";

const Link = ({ page, selectedPage, setSelectPage }) => {
  const lowerCasePage = page.toLowerCase();
  return (
    <AnchorLink
      className={`${
        selectedPage === lowerCasePage ? "text-yellow" : ""
      } hover:text-yellow transition duration-500`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
  );
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery("(min-width:1000px)");
  const navbarBackground = isTopOfPage ? "" : "bg-light-blue";

  const menuRef = useRef(null);

  const closeMenu = () => {
    setIsMenuToggled(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleDocumentClick = (event) => {
    if (isMenuToggled && menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  let xDown = null;
  let yDown = null;

  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  const handleTouchMove = (event) => {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
      // Swipe left, do nothing
    } else if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) {
      // Swipe right, close the menu
      closeMenu();
    }

    // Reset values
    xDown = null;
    yDown = null;
  }

  return (
    <nav className={`${navbarBackground} z-40 w-full fixed top-0 py-6`}>
      <div className="flex items-center justify-between mx-auto w-5/6">
        <h4 className="font-playfair text-5xl md:text-3xl font-bold">
          <a href="#home">MD</a>
        </h4>

        {/* DESKTOP NAV */}
        {isAboveSmallScreens ? (
          <div className="flex justify-between gap-16 font-opensans text-sm font-semibold">
            <Link
              page="Home"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
            <Link
              page="Skills"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
            <Link
              page="Projects"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />

            <Link
              page="Design"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
            <Link
              page="Testemonial"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />

            <Link
              page="Contact"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
          </div>
        ) : (
          <button
            className="rounded-full bg-light-green p-2  "
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <img src="assets/menu-icon.svg" alt="Menu" className="w-16" />
          </button>
        )}
        {/* Mobile menu POPUP */}
        <div
          ref={menuRef}
          className={`fixed right-0 bottom-0 h-full w-[600px] bg-light-blue transition transform ease-in-out duration-300 ${
            isMenuToggled ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* CLOSE Icon */}
          <div className="flex justify-end p-12">
            <button onClick={closeMenu}>
              <img src="assets/close-icon.svg" alt="Menu" className="w-20" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="flex flex-col gap-16 ml-[33%] text-white text-4xl">
            <Link
              page="Home"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
            <Link
              page="Skills"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
            <Link
              page="Projects"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />

            <Link
              page="Design"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />

            <Link
              page="Testemonial"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />

            <Link
              page="Contact"
              selectedPage={selectedPage}
              setSelectPage={setSelectPage}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;