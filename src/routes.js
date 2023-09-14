import { IoAlbumsOutline, IoGridOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
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
        Icon: IoAlbumsOutline
    },
    {
        to: '/profile',
        name: 'Profile',
        Icon: BiUserCircle
    },
    {
        to: '/statistics',
        name: 'Statistics',
        Icon: AiOutlineBarChart
    }
];