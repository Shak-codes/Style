"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { Dropdown, Dashboard, Calendar, User, Hair, Settings } from "@/icons";

export type NavItemChild = {
  label: string;
  route: string;
};

export type NavIconName =
  | "dashboard"
  | "calendar"
  | "user"
  | "hair"
  | "settings";

export type NavItemData = {
  label: string;
  route: string;
  icon?: NavIconName;
  children?: NavItemChild[];
};

const ICON_MAP = {
  dashboard: Dashboard,
  calendar: Calendar,
  user: User,
  hair: Hair,
  settings: Settings,
} as const;

type NavItemProps = {
  item: NavItemData;
};

const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const hasChildren = item.children && item.children.length > 0;
  const isParentActive =
    hasChildren &&
    item.children!.some(
      (child) =>
        pathname === child.route || pathname.startsWith(child.route + "/")
    );
  const activeChildRoute = hasChildren
    ? item
        .children!.filter(
          (child) =>
            pathname === child.route || pathname.startsWith(child.route + "/")
        )
        .sort((a, b) => b.route.length - a.route.length)[0]?.route
    : null;
  const isChildActive = (childRoute: string) =>
    activeChildRoute === childRoute;
  const isRouteActive = !hasChildren && (pathname === item.route || pathname.startsWith(item.route + "/"));

  useEffect(() => {
    if (isParentActive) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isParentActive]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !isParentActive
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isParentActive]);

  const IconComponent = item.icon ? ICON_MAP[item.icon] : null;

  if (hasChildren) {
    return (
      <li ref={ref} className={styles.navItemWrapper}>
        <button
          type="button"
          className={`${styles.route} ${isParentActive ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className={styles.navRow}>
            {IconComponent && (
              <IconComponent height={16} width={16} strokeWidth={2} />
            )}
            <span>{item.label}</span>
            <Dropdown
              height={14}
              width={14}
              className={styles.chevron}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </span>
        </button>
        <div
          className={`${styles.dropdownWrapper} ${isOpen ? styles.dropdownOpen : ""}`}
        >
          <ul className={styles.dropdown}>
            {item.children!.map((child) => (
              <li key={child.route}>
                <Link
                  href={child.route}
                  className={`${styles.dropdownItem} ${isChildActive(child.route) ? styles.active : ""}`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.route}
        className={`${styles.route} ${isRouteActive ? styles.active : ""}`}
      >
        <span className={styles.navRow}>
          {IconComponent && (
            <IconComponent height={16} width={16} strokeWidth={2} />
          )}
          <span>{item.label}</span>
        </span>
      </Link>
    </li>
  );
};

export default NavItem;
