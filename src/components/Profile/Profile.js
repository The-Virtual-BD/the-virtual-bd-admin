import React from 'react';
import useUser from '../utilities/useUser';
import blankUser from '../../images/blank_user.png';
import Header from '../SharedPage/Header';
import { baseURL } from '../utilities/url';

const Profile = () => {
    const [user] = useUser();
    console.log(user)
    return (
       <>
       <Header />
        <div className='px-5 lg:px-20  text-primary bg-bgclr p-5 h-auto lg:h-[100vh]'>
            <div className='bg-white p-4  my-5 rounded-md  flex items-center justify-start gap-3'>

                {
                    (user?.photo) ?
                        <img src={`${baseURL}/${user?.photo}`} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
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

                <div className='mt-5 flex items-center  gap-5'>
                    <div>
                        <p  className='font-bold'>Email: </p>
                        <p  className='font-bold'>Phone: </p>
                        <p  className='font-bold'>Date of Birth: </p>
                        <p  className='font-bold'>Nationality: </p>
                        <p  className='font-bold'>Bio: </p>
                    </div>
                    <div>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                        <p>{user?.birth_date}</p>
                        <p>{user?.nationality}</p>
                        <p>{user?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
       </>
    );
};

export default Profile;