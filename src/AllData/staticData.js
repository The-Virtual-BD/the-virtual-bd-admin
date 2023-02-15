import { AiFillHome, AiOutlineLogout, AiFillProject, AiFillDelete, AiFillNotification } from 'react-icons/ai';
import { FaQuestion, FaUser, FaUserAlt, FaUserCheck, FaUserEdit, FaUserLock } from 'react-icons/fa';
import { RiEditBoxFill, RiUserFollowFill } from 'react-icons/ri';
import { HiViewGridAdd } from 'react-icons/hi';
import { CgPlayListCheck } from 'react-icons/cg';
import { BsChatRightTextFill, BsEyeFill, BsFileTextFill, BsFillFilterSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


export const sidebarMenu = [
    {
        id: 1,
        name: "Dashboard",
        icon: <AiFillHome />,
        path: "/admin-dashboard/dashboard"
    },
    {
        id: 2,
        name: "Category",
        icon: <HiViewGridAdd />,
        path: "/admin-dashboard/category"
    },
    {
        id: 3,
        name: "Blog",
        icon: <BsFileTextFill />,
        path: "/admin-dashboard/blogs"
    },
    {
        id: 4,
        name: "Project",
        subItem1:"Add Project",
        subItem2:"View Project",
        icon: <AiFillProject />,
        path: "/admin-dashboard/project"
    },
    {
        id: 5,
        name: "Comments",
        icon: <BsChatRightTextFill />,
        path: "/admin-dashboard/comments"
    },
    {
        id: 6,
        name: "Sub Request",
        icon: <CgPlayListCheck />,
        path: "/admin-dashboard/sub-request"
    },
    {
        id: 7,
        name: "Blogger Request",
        icon: <FaUserCheck />,
        path: "/admin-dashboard/blogger-request"
    },
    {
        id: 8,
        name: "Services",
        icon: <BsFileTextFill />,
        path: "/admin-dashboard/services"
    },
    {
        id: 9,
        name: "Notice",
        icon: <AiFillNotification />,
        path: "/admin-dashboard/notice"
        
    },
    {
        id: 10,
        name: "Users",
        icon: <FaUser />,
        path: "/admin-dashboard/user-managment"
        
    },
    {
        id: 11,
        name: "Role",
        icon: <FaUserEdit />,
        path: "/admin-dashboard/role"
    },
    {
        id: 12,
        name: "Permission",
        icon: <FaUserLock />,
        path: "/admin-dashboard/permission"
    },
];



