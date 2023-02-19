import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const BloggerReqDetails = () => {
    const [bloggerApplicen, setBloggerApplicen] = useState([]);
    const { id } = useParams();
    const[token]=useToken();


     //Handle Get service
     useEffect(() => {
          const sUrl = `${baseURL}/api/admin/bloggerApplication/${id}`;
          // setLoading(true);
  
          fetch(sUrl, {
              method: 'GET',
              headers: { 
                  'content-type': 'application/json',
                  "Authorization": `Bearer ${token}`
              }
          })
              .then(res => res.json())
              .then(data => {
                  // setLoading(false);
                  console.log(data.data)
                  setBloggerApplicen(data.data)
              })
      }, [token,id]);


      console.log(bloggerApplicen);

    

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
           <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Blogger Request</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>  {bloggerApplicen?.name}</h3>
               </div>

               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Blog Subject: </span> {bloggerApplicen?.subject}</h3>
               </div>
              
               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Expertise Areas: </span>{bloggerApplicen?.expertise}</h3>
               </div>
               
               <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{bloggerApplicen?.description}</h3>
               </div>

              

                    <div className='mt-7 flex items-start '>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3'>Accept</button>

                            <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
                    </div>
              

            </div>


        </div>
    );
};

export default BloggerReqDetails;