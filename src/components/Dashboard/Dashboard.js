import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import { RiUser3Fill } from 'react-icons/ri';
import { FaUserCheck } from 'react-icons/fa';
import { CgPlayListCheck } from 'react-icons/cg';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { saveAs } from "file-saver";
import { FiDownload } from 'react-icons/fi';






const Dashboard = () => {
    const[token]=useToken();
    const [totalUser,setTotalUser]=useState([]);
    const [totalBlogReq,setTotalBlogReq]=useState([]);
    const [totalSubReq,setTotalSubReq]=useState([]);
    const [notices,setNotices]=useState([]);
    const [blogs, setBlogs] = useState([]);
    

     //Get Users
     useEffect(() => {
        const perUrl=`${baseURL}/api/admin/users`;
        fetch(perUrl,{
          method:"GET",
          headers: {
              'content-type': 'application/json',
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data => setTotalUser(data.user))
      }, [token]);


       //Get blogger req
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/bloggerApplication`;
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
                console.log(data.blogger)
                setTotalBlogReq(data.blogger)
            })
    }, [token]);

     //Get All Sub Req
     useEffect(() => {
        const perUrl=`${baseURL}/api/admin/subscriptions`;
        fetch(perUrl,{
          method:"GET",
          headers: {
              'content-type': 'application/json',
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data =>setTotalSubReq(data.data))
      }, [token]);

      //Get Notices
     useEffect(() => {
        const perUrl=`${baseURL}/api/admin/notices`;
        fetch(perUrl,{
          method:"GET",
          headers: {
              'content-type': 'application/json',
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data => {
            console.log(data.data);
            setNotices(data.data)
          })
      }, [token]);

      //Download Documents
     const downloadFile = (id) => {
        const getDoc=notices.find(notice=>notice.id===id);

        fetch(`${getDoc.document}`)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${getDoc.title}.doc`);
          });
      };

       //Handle Get posts
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/posts`;
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
                // console.log(data)
                setBlogs(data.data)
            })
    }, [token]);


    return (
        <div className=' text-primary p-3 m-3  rounded-md '>

            <div className=' w-full flex flex-col lg:flex-row items-center justify-between gap-5  mb-5 rounded-md'>
                <div className='flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md'>
                   <div className='text-start'>
                         <h2 className='text-xl font-semibold '>Users</h2>
                         <p>{totalUser.length}</p>
                   </div>
                   <div>
                        <RiUser3Fill className='text-3xl font-bold'/>
                   </div>
                </div>

                <div className='flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md'>
                   <div className='text-start'>
                         <h2 className='text-xl font-semibold '>Blogger Applications</h2>
                         <p>{totalBlogReq.length}</p>
                   </div>
                   <div>
                        <FaUserCheck className='text-3xl font-bold'/>
                   </div>
                </div>

                <div className='flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md'>
                   <div className='text-start'>
                         <h2 className='text-xl font-semibold '>Subscription Request</h2>
                         <p>{totalSubReq.length}</p>
                   </div>
                   <div>
                        <CgPlayListCheck className='text-3xl font-bold'/>
                   </div>
                </div>
            </div>


            <div className='flex flex-col lg:flex-row items-center gap-5 w-full rounded-md'>

                <div className='w-full bg-white p-3 text-start rounded-md' >
                    <h2 className='text-2xl font-semibold mb-4'>Recent Notices</h2>
                    <div>
                        {
                            notices.map((notice,index)=><div className='flex items-center gap-3'>
                                <div>
                                  <p>{index+1}.</p>
                                </div>

                                <div>
                                    <p>{notice.title}</p>
                                </div>

                                <button  onClick={()=>downloadFile(notice.id)}>
                                 <FiDownload  />
                                </button>
                                  
                            </div>).slice(0,5)
                        }
                    </div>
                </div>

                <div className='w-full bg-white p-3 text-start rounded-md' >
                    <h2 className='text-2xl font-semibold mb-4'>Recent Blogs</h2>
                    <div>
                        {
                            blogs.map((blog,index)=><div className='flex items-center gap-3'>
                                <div>
                                  <p>{index+1}.</p>
                                </div>

                                <div>
                                    <p>{blog.title}</p>
                                </div>
                                  
                            </div>).slice(0,5)
                        }
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Dashboard;