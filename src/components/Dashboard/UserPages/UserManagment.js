import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import Table from '../../SharedPage/Table';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditBoxFill } from 'react-icons/ri';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import Modal from '../../utilities/Modal';
import { toast } from 'react-toastify';

const UserManagment = () => {
    const [token] = useToken();
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();


    //Get Users
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/users`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAllUsers(data.user))
    }, [token]);



    //Handle View User
    const handleUserView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/user-managment/${id}`);
    };

    //Handle Edit User
    const handleUserEdit = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/user-managment/update/${id}`);
    };

    const handleDeleteUser = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/user/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = allUsers.filter(card => card.id !== id);
                    setAllUsers(remaining);
                    toast.success(data.message)

                })
        };
    };



    const USER_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Name",
                accessor: "first_name",
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
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handleUserView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>

                        <button onClick={()=>handleUserEdit(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                <RiEditBoxFill className='text-lg  text-white' />
                            </div>
                        </button>

                        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleDeleteUser(id)}>
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
        <>
            <div className='text-primary p-3 '>
                {allUsers.length && (
                    <Table columns={USER_COLUMNS()} data={allUsers} headline={"All User list"} />
                )}
            </div>

        </>
    );
};

export default UserManagment;

