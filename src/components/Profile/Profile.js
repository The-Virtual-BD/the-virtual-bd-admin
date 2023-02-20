import React from 'react';
import useUser from '../utilities/useUser';
import blankUser from '../../images/blank_user.png';

const Profile = () => {
    const [user] = useUser();
    console.log(user)
    return (
        <div className='px-5 lg:px-20  text-primary bg-bgclr p-5 h-auto lg:h-[100vh]'>
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

                <div className='mt-5'>
                    {/*  <div className='text-start mb-1'>
                            <h3 ><span className='font-bold'>Name: </span>  {user?.name}</h3>
                    </div> */}

                    {/*  <div className='text-start mb-1'>
                        <h3 ><span className='font-bold mr-2'>Blogger Name: </span> {user?.bloggerName}</h3>
                    </div> */}

                    <div className='text-start mb-1'>
                        <h3 ><span className='font-bold mr-2'>Email: </span>{user?.email}</h3>
                    </div>

                    <div className='text-start mb-2'>
                        <h3 ><span className='font-bold mr-2'>Phone: </span> {user?.phone}</h3>
                    </div>
                    <div className='text-start mb-2'>
                        <h3 ><span className='font-bold mr-2'>Date of Birth: </span> {user?.birth_date}</h3>
                    </div>
                    <div className='text-start mb-2'>
                        <h3 ><span className='font-bold mr-2'>Nationality: </span> {user?.nationality}</h3>
                    </div>

                    <div className='text-start  mb-1'>
                        <h3 ><span className='font-bold mr-2'>Bio: </span>{user?.bio}</h3>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Profile;