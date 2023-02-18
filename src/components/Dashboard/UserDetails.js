import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import blankUser from '../../images/blank_user.png';

const UserDetails = () => {
    const { id } = useParams();
    const[token]=useToken();
    const [user, setUser] = useState([]);

  

    useEffect(() => {
        const perUrl=`${baseURL}/api/admin/user/${id}`;
        fetch(perUrl,{
          method:"GET",
          headers: {
              'content-type': 'application/json',
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data => setUser(data.user))
      }, [id,token]);

      console.log(user)

    return (
        <div className='mx-2 lg:mx-8  text-primary '>
            <div className='bg-white p-4  my-5 rounded-md  flex items-center justify-start gap-3'>

               {
                (user.img)? 
                <img src={user?.img} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
                :
                <img src={blankUser} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
               }

                <div className='text-start'>
                    <h2 className='text-2xl font-bold'>{`${user?.first_name} ${user?.last_name}`}</h2>
                    <p><span className='font-bold'> </span> {user?.profession}</p>
                </div>
            </div>


            <div  className='bg-white p-4  my-5 rounded-md text-start'>
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

export default UserDetails;