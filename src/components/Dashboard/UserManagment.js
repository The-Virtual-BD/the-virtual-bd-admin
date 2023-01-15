import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import {BsEyeFill} from 'react-icons/bs';
import { RiEditBoxFill} from 'react-icons/ri';
import { AiFillDelete} from 'react-icons/ai';
import UsersPagenation from './UsersPagenation';
import Button from '../utilities/Button';

const UserManagment = () => {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        fetch('/users.json')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, []);

    return (
        <div className='text-primary p-3'>
           

            <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
                <div className="flex items-center justify-between pb-3">
                    <h2 className='text-2xl text-start font-semibold'>All User List</h2>
                   <Button>Search</Button>
                </div>
                <table className=' w-full '>
                    <thead className='bg-white rounded-lg'>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </thead>
                    <tbody >
                        {allUsers.map((user,index) => <tr key={user._id} className="even:bg-white odd:bg-bgclr rounded-md">
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <div className='flex items-center justify-center gap-2 '>
                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                         <BsEyeFill className='text-lg  text-white'/>
                                        </div>
                                    </button>
                                
                                    
                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                            <RiEditBoxFill className='text-lg  text-white'/>
                                        </div>
                                    </button>
                                    
                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                            <AiFillDelete className='text-lg  text-white'/>
                                        </div>
                                    </button>
                                
                                </div>
                            </td> 
                        </tr>)}
                    </tbody>
                </table>

            </div>

            {/* <UsersPagenation /> */}
        </div>
    );
};

export default UserManagment;