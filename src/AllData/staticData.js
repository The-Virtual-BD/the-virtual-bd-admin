import { AiFillHome, AiOutlineLogout ,AiFillProject} from 'react-icons/ai';
import { FaQuestion, FaUser, FaUserAlt, FaUserCheck, FaUserEdit, FaUserLock } from 'react-icons/fa';
import { RiUserFollowFill } from 'react-icons/ri';
import { HiViewGridAdd } from 'react-icons/hi';
import { CgPlayListCheck } from 'react-icons/cg';
import { BsChatRightTextFill, BsFileTextFill, BsFillFilterSquareFill} from 'react-icons/bs';

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
        name: "Users",
        icon: <FaUser />,
        path: "/admin-dashboard/user-managment"
    },
    {
        id: 10,
        name: "Role",
        icon: <FaUserEdit />,
        path: "/admin-dashboard/role"
    },
    {
        id: 11,
        name: "Permission",
        icon: <FaUserLock />,
        path: "/admin-dashboard/permission"
    },
];



export const USER_COLUMNS = () => {
    return [
      {
        Header: "Name",
        accessor: "bloggerName",
        sortType: 'basic',
  
      },
      {
        Header: "Email",
        accessor: "blogTitle",
        sortType: 'basic',
  
      },
      
      {
        Header: "Date",
        accessor: "blogDate",
  
      },
      
      
    ];
  };