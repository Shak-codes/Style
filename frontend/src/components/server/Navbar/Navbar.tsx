import styles from "./styles.module.scss";
import NavItem, { type NavItemData } from "./NavItem";

type NavbarProps = {
  data: NavItemData[];
};

const Navbar = ({ data }: NavbarProps) => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.routeContainer}>
        {data.map((item) => (
          <NavItem key={item.route} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
