import { useRef } from "react";
import {
  IoNotificationsOutline,
} from "react-icons/io5";
import DropdownMenu from "../DropdownMenu";
import IconWrapper from "../IconWrapper";
import UserIcon from "../UserIcon";
import styles from "./Header.module.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Link from "next/link";
import { headerLoginMenuList, menuList } from "../../data";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "src/actions/auth.action";
import { useRouter } from "next/router";
import Image from "next/image";

/*

Dropdown Menu Guideline and Instructions
Dropdown Menu props are
    label: string
    CustomMenu: React Component
    dropdownContainerStyle: style object
    children: React Component

    Note: label or CustomMenu only one can be used at a time
    CustomMenu has higher priority if CustomMenu has passed as
    props then label wont work but if CustomMenu has not given
    then label will be visible


*/

const MenuList = ({ href = "", Icon = null, text = "" }) => {
  return (
    <li>
      <Link href={href} className={styles["link"]}>
        {Icon && <Icon />}
        <span>{text}</span>
      </Link>
    </li>
  );
};

const NotificationsIcon = ({ onClick = () => {} }) => (
  <IconWrapper
    onClick={onClick}
    style={{
      top: "2px",
      fontSize: "20px",
    }}
  >
    <IoNotificationsOutline />
  </IconWrapper>
);

const NotificationList = ({ img = null, desc = "", datetime = "" }) => {
  return (
    <li>
      {img && <Image src={img} alt="" />}
      <div className={styles["single-notification"]}>
        <p>{desc}</p>
        <p>{datetime}</p>
      </div>
    </li>
  );
};

const Header = ({ toggleSidebarMenu }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  
const submitLogout = async (e) => {
  try {
    await dispatch(logout());
    router.push('/');
  } catch (error) {
    console.error('Error during login:', error);
  }
};

  return (
    <section className={styles.container}>
      <div className={styles["left-items"]}>
        <ul>
          <li>
            <button
              className={styles["close-sidemenu"]}
              onClick={toggleSidebarMenu}
            >
              <HiOutlineMenuAlt1 />
            </button>
          </li>
        </ul>
      </div>
      <div className={styles["right-items"]}>
        <ul className={styles["header-navigations"]}>

          <li>
            {/* User Dropdown Menu */}
            <DropdownMenu
              CustomMenu={UserIcon}
            >
              <div>
              <ul className={styles["dropdown-menu"]}>
                <li>
                  <Link href={'/profile'} className={styles["link"]}>
                    <FiUser/>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <div onClick={submitLogout} className={styles["link"]}>
                    <FiLogOut/>
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
              </div>
            </DropdownMenu>
            <DropdownMenu/>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Header;
