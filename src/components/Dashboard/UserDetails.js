import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import blankUser from '../../images/blank_user.png';

const UserDetails = () => {
    const { id } = useParams();
    const [token] = useToken();
    const [user, setUser] = useState([]);



    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/user/${id}`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [id, token]);

    console.log(user)

    return (
        <div className='mx-2 lg:mx-8  text-primary '>
            <div className='bg-white p-4  my-5 rounded-md  flex items-center justify-start gap-3'>

                {
                    (user.img) ?
                        <img src={user?.img} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
                        :
                        <img src={blankUser} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
                }

                <div className='text-start'>
                    <h2 className='text-2xl font-bold'>{`${user?.first_name} ${user?.last_name}`}</h2>
                    <p><span className='font-bold'> </span> {user?.profession}</p>
                </div>
            </div>


            <div className='bg-white p-4  my-5 rounded-md text-start'>
                <h2 className='text-2xl font-bold'>Contact Information : </h2>

               
                   

                <div className='flex items-start gap-8'>
                    <div className='mt-5'>
                        <h3 className='font-bold'>Email:</h3>
                        <h3 className='font-bold'>Phone:</h3>
                        <h3 className='font-bold'>Date of Birth:</h3>
                        <h3 className='font-bold'>Nationality:</h3>
                        <h3 className='font-bold'>Bio:</h3>
                    </div>

                    <div className='mt-5'>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                        <p>{user?.birth_date}</p>
                        <p>{user?.nationality}</p>
                        <p>{user?.bio}</p>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default UserDetails;