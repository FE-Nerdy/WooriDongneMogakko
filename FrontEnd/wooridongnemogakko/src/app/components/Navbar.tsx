//추후 use client를 제거하고 state기술 지도 어플 만들고 활용할것
"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/nav.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftMenu}>
        <Link href="/" className={styles.logo}>
          Logo
        </Link>
        <Link href="/" className={styles.title}>Mogakko</Link>
      </div>

      <ul className={styles.rightMenu}>
        {isLoggedIn ? (
          <li>
            <Link href="/profile">img, nickname</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;