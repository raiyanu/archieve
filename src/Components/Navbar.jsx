import React from "react";
import styles from "./Navbar.module.css";
import {
  MoonIcon,
  SunIcon,
  Bars3CenterLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
function Navbar() {
  const [Menu, setMenu] = React.useState(false);

  const toggleMenu = () => {
    setMenu(!Menu);
    console.log("Menu clicked");
  };

  return (
    <>
      <header className={styles.header}>
        <a href="/" className={styles.websiteName}>
          <img src="/icon.svg" alt="favicon" />
          Ray-dev
        </a>

        <nav className={styles.nav}>
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#others">Others</a>
          <a href="#about">About</a>
          <XMarkIcon
            className={Menu ? "h-8 cursor-pointer md:hidden" : "hidden"}
            onClick={toggleMenu}
          />
        </nav>

        <div className={styles.themeActionContainer}>
          <MoonIcon className="h-6 cursor-pointer" />
          <SunIcon className="h-6 cursor-pointer" />
        </div>
        <div className={styles.Menu}>
          <Bars3CenterLeftIcon
            className={Menu ? "hidden" : "h-8 cursor-pointer rotate-180 "}
            onClick={toggleMenu}
          />
          <XMarkIcon
            className={Menu ? "h-8 cursor-pointer" : "hidden"}
            onClick={toggleMenu}
          />
        </div>

        {/* <div className={styles.action}>
          <button>Click me</button>
          <button>Click me</button>
        </div> */}
      </header>
    </>
  );
}

export default Navbar;
