import {AiFillHome, AiOutlineLogout} from 'react-icons/ai';
import {FaQuestion, FaUserAlt} from 'react-icons/fa';
import {CgNotes} from 'react-icons/cg';
import { RiPriceTag3Fill} from 'react-icons/ri';
import {GrGallery } from 'react-icons/gr';

export const sidebarMenu = [
    {
        id: 1,
        name: "Dashboard",
        icon: <AiFillHome />,
        path:"/admin-dashboard/dashboard"
    },
    {
        id: 2,
        name: "Users",
        icon: <FaUserAlt />,
        path:"/admin-dashboard/user-managment"
    },
    {
        id: 3,
        name: "Blogs",
        icon: <CgNotes />,
        path:"/admin-dashboard/blogs"
    },
    {
        id: 5,
        name: "Portfolio",
        icon: <AiFillHome />,
        path:"/admin-dashboard/portfolio"
    },
    {
        id: 6,
        name: "Gallery",
        icon: <GrGallery />,
        path:"/admin-dashboard/gallery"
    },
    {
        id: 7,
        name: "Subscription",
        icon: <AiFillHome />,
        path:"/admin-dashboard/subscription"
    },
    {
        id: 8,
        name: "Pricing",
        icon: <RiPriceTag3Fill />,
        path:"/admin-dashboard/pricing"
    },
    {
        id: 4,
        name: "FAQs",
        icon: <FaQuestion />,
        path:"/admin-dashboard/faqs"
    },
    {
        id: 9,
        name: "Logout",
        icon: <AiOutlineLogout />,
        path:null
    }
]