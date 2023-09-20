import Logo from "../Logo";
import styles from "./SidebarNavigation.module.css";
import Link from "next/link";
import routes from "../../routes";
import { useRouter } from "next/router";
import { TbDeviceIpadMinus, TbLogout } from "react-icons/tb";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";

const SidebarNavigation = ({
  sidebarMenuActive,
  toggleSidebarMenu
}) => {
  const router = useRouter();
  const role = useSelector(state => state.auth.user.role);
  
  return (
    <section className={`${styles.container} ${sidebarMenuActive ? styles['active'] : ''}`}>
      <button className={styles["sidebar-close-btn"]} onClick={toggleSidebarMenu}>
        x
      </button>
      <div className={styles['logo-container']}>
        <Logo />
        <div className={styles['logo-explain']}>Airly Studio Dashboard</div>
      </div>
      <ul className={styles["sidebar-container"]}>
        {routes.map((page, index) => (
            <li key={index} className={`${styles["sidebar-menu-item"]} ${router.route === page.to ? styles['active'] : ''}`}>
              <Link href={page.to}>
                <page.Icon />
                <span>{page.name}</span>
              </Link>
            </li>
          ))} 
      </ul>

      <ul className={styles["sidebar-footer"]}>
          <li className={styles["footer-item"]}> 
            <TbDeviceIpadMinus/>
            <span>Role:</span>
            <span style={{textTransform:'capitalize'}}>{role}</span>
          </li>
          
      </ul>
    </section>
  );
};

export default SidebarNavigation;
