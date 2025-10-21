import Link from "next/link";
import styles from "./styles.module.scss";

type NavData = {
  label: string;
  route: string;
};

type NavbarProps = {
  data: NavData[];
};

const Navbar = ({ data }: NavbarProps) => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.routeContainer}>
        {data.map(({ label, route }) => {
          return (
            <li key={route} className={styles.route}>
              <Link href={route}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
