import { AiFillHome, AiOutlineLogout, AiFillProject, AiFillDelete } from 'react-icons/ai';
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
            Header: "SL",
            accessor: "_id",
            sortType: 'basic',

        },
        {
            Header: "Name",
            accessor: "name",
            sortType: 'basic',

        },
        {
            Header: "Email",
            accessor: "email",
            sortType: 'basic',

        },
        {
            Header: "Phone",
            accessor: "phone",
            sortType: 'basic',

        },

        {
            Header: 'Action',
            accessor: 'action',
            Cell: () => {
                return (<div className='flex items-center justify-center  gap-2 '>
                    <button >
                        <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                            <BsEyeFill className='text-lg  ' />
                        </div>
                    </button>
                    <button>
                        <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                            <RiEditBoxFill className='text-lg  text-white' />
                        </div>
                    </button>

                    <button>
                        <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                            <AiFillDelete className='text-lg  text-white' />
                        </div>
                    </button>
                </div>);
            },
        },


    ];
};
