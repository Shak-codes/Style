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
        {data.map(({ label, route }) => (
          <Link key={route} href={route} className={styles.route}>
            <li>{label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
