import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Table from '../SharedPage/Table';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditBoxFill } from 'react-icons/ri';
import { BsEyeFill } from 'react-icons/bs';

const UserManagment = () => {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        fetch('/users.json')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, []);

    const USER_COLUMNS = () => {
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
                    return (<div className='flex  items-center justify-center  gap-2 '>
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

    return (
        <div className='text-primary p-3 '>

            {allUsers.length && (
                <Table columns={USER_COLUMNS()} data={allUsers} headline={"All User list"} />
            )}

        </div>
    );
};

export default UserManagment;