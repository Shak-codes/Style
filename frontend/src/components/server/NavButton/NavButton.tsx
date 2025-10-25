import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

type NavButtonProps = {
  text: string;
  href: string;
};

const NavButton = ({ text, href }: NavButtonProps) => {
  return (
    <Link href={href} className={styles.navButton}>
      {text}
    </Link>
  );
};

export default NavButton;
