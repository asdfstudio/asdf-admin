import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FiUser, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { AiOutlineFileText, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

export const menuList = [
  {
    text: "Profile",
    Icon: FiUser,
    href: "/profile",
  },
  {
    text: "Logout",
    Icon: FiLogOut,
    href: "/logout",
  },
];

export const headerLoginMenuList = [
    {
      text: 'Login',
      Icon: AiOutlineLogin,
      href:'/login'
    },
    {
      text: 'Signup',
      Icon: AiOutlineLogout,
      href: '/signup'
    }
  ]

  export const portfolioTags = [
    {
      text: 'Branding',
    },
    {
      text: 'Website',
    },
    {
      text: 'Graphics design',
    },
    {
      text: 'Social media',
    },
    {
      text: 'Mobile applications',
    },
    {
      text: 'Presentation',
    },
    {
      text: 'Web applications',
    },
    {
      text: 'Product design',
    },
  ]


