import { IoAlbumsOutline, IoGridOutline, IoNewspaperOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { BiGroup, BiUser, BiUserCircle } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";

export default [
        {
        to: '/dashboard',
        name: 'Dashboard',
        Icon: BsSpeedometer2
    },
    {
        to: '/portfolio',
        name: 'Portfolio',
        Icon: IoGridOutline
    },
    {
        to: '/blog',
        name: 'Blog',
        Icon: IoNewspaperOutline
    },
    {
        to: '/user',
        name: 'User',
        Icon: BiGroup
    },
    {
        to: '/profile',
        name: 'Profile',
        Icon: BiUser
    },
    {
        to: '/statistics',
        name: 'Statistics',
        Icon: AiOutlineBarChart
    }
];