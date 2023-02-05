import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch('/users.json')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, []);

    const getUserDeatils = allUsers?.find(blog => blog._id == id);
    // console.log(getUserDeatils);

    return (
        <div className='mx-2 lg:mx-8  text-primary '>
            <div className='bg-white p-4  my-5 rounded-md  flex items-center justify-start gap-3'>
                <img src={getUserDeatils?.img} alt={getUserDeatils?.name} srcset="" className='h-[100px] w-[100px] rounded-full' />
                <div className='text-start'>
                    <h2 className='text-2xl font-bold'>{getUserDeatils?.name}</h2>
                    <p><span className='font-bold'>Email: </span>{getUserDeatils?.email}</p>
                </div>
            </div>


            <div  className='bg-white p-4  my-5 rounded-md text-start'>
                <h2 className='text-2xl font-bold'>Contact Information : </h2>

                <div className='mt-5'>
                   {/*  <div className='text-start mb-1'>
                            <h3 ><span className='font-bold'>Name: </span>  {getUserDeatils?.name}</h3>
                    </div> */}

                    <div className='text-start mb-1'>
                        <h3 ><span className='font-bold mr-2'>Blogger Name: </span> {getUserDeatils?.bloggerName}</h3>
                    </div>
                    
                    <div className='text-start mb-1'>
                            <h3 ><span className='font-bold mr-2'>Profession: </span>{getUserDeatils?.profession}</h3>
                    </div>
                    
                    <div className='text-start mb-2'>
                        <h3 ><span className='font-bold mr-2'>Phone: </span> {getUserDeatils?.phone}</h3>
                    </div>
                    <div className='text-start mb-2'>
                        <h3 ><span className='font-bold mr-2'>Date of Birth: </span> {getUserDeatils?.birth_date}</h3>
                    </div>
                    <div className='text-start mb-2'>
                        <h3 ><span className='font-bold mr-2'>Nationality: </span> {getUserDeatils?.nationality}</h3>
                    </div>

                    <div className='text-start  mb-1'>
                        <h3 ><span className='font-bold mr-2'>Bio: </span>{getUserDeatils?.bio}</h3>
                    </div>
               </div>

            </div>

        </div>
    );
};

export default UserDetails;