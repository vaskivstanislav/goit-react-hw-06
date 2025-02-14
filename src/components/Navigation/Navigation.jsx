import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => (
  <header className={styles.container}>
    <nav className={styles.headerNav}>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.navLinkActive)
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.navLinkActive)
        }
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  </header>
);

export default Navigation;