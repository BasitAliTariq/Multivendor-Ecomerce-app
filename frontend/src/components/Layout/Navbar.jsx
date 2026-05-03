import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data.jsx";
import { Link } from "react-router-dom";

function Navbar({ active }) {
  return (
    <div className={`block md:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd17]"
                  : "text-black md:text-white"
              } font-medium px-6 cursor-pointer md:pb-0 pb-[30px]`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Navbar;
