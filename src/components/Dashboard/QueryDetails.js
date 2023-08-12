import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const QueryDetails = () => {
    const {id} = useParams();
    const [token] = useToken();
    const[singleQuery,setSingleQuery]=useState({});
    const[reply,setreply]=useState('')

     //Get Queries
     useEffect(() => {
        const perUrl = `${baseURL}/api/admin/queries/${id}`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setSingleQuery(data.data)
            })
    }, [token,id]);

    //Handle Reply Form
    const handleReplyForm=e=>{
        e.preventDefault();
        const data={reply};

        //Send to Backend
            const formUrl=`${baseURL}/api/admin/queries/replay/${id}`;
            fetch(formUrl,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(data)
            } )
            .then(res=>res.json())
            .then(result=>{
            // console.log(result);
            toast.success(result.message);
            e.target.reset();
            });
    };



    return (
        <div className=' text-primary bg-bgclr p-3 h-auto lg:h-[100vh]'>
            
             <div className='bg-white p-4   rounded-md text-start'>
                <div className='mb-5'>
                    <h2 className='text-2xl font-bold text-start my-3 '>{singleQuery.name}</h2>
                    <hr className=' text-bgclr' />
                </div>
                <p><span className='font-bold'>Email: </span> {singleQuery.email}</p>
                <p> <span className='font-bold'>Phone:</span>  {singleQuery.phone}</p>
                <p> <span className='font-bold '>Message:</span> {singleQuery.message}</p>

                <form className='mt-5' onSubmit={handleReplyForm} >
                     <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectShortDesc" className="font-bold mb-1">Reply</label>
                        <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setreply(e.target.value)} placeholder="Description" required></textarea>
                    </div>

                    <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
                        <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg">Sent</button>
                    </div>
                </form>
            </div>

           
          
        </div>
    );
};

export default QueryDetails;