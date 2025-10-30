import Link from "next/link";
import styles from "./styles.module.scss";

type NavData = {
  label: string;
  route: string;
  Icon?: any;
};

type NavbarProps = {
  data: NavData[];
};

const Navbar = ({ data }: NavbarProps) => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.routeContainer}>
        {data.map(({ label, route, Icon }) => (
          <Link key={route} href={route} className={styles.route}>
            <li className={styles.navRow}>
              {Icon && <Icon height={16} width={16} strokeWidth={2} />}
              <span>{label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
