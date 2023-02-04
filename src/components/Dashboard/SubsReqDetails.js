import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from "file-saver";


const SubsReqDetails = () => {
    const [subReq, setSubReq] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch('/subscription.json')
            .then(res => res.json())
            .then(data => setSubReq(data))
    }, []);

    const getSingleSubsReq = subReq?.find(blog => blog.id == id);
    console.log(getSingleSubsReq);


    //Download Documents
    const downloadFile = () => {
        fetch(`${getSingleSubsReq.doc}`)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${getSingleSubsReq?.doc}`);
          });
      };
      
    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Subscription Request</h2>
                <hr className=' text-bgclr' />
            </div>

            <div className='mt-5'>
               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>  {getSingleSubsReq?.userName}</h3>
               </div>

               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Service Name: </span> {getSingleSubsReq?.service}</h3>
               </div>
              
               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Meeting Time: </span>{getSingleSubsReq?.meeting_date}</h3>
               </div>
              
               <div className='text-start mb-2'>
                    <h3 ><span className='font-bold'>Subject: </span> {getSingleSubsReq?.subject}</h3>
               </div>
               <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{getSingleSubsReq?.desc}</h3>
               </div>

               <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold mr-1'>Documents: </span>
                    <span className='text-blue hover:underline cursor-pointer' onClick={downloadFile}> {getSingleSubsReq?.doc}</span>
                       
                   </h3>
               </div>

            


               <div className='mt-7 flex items-start '>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue '>Accept</button>

                            <button className='text-primary font-bold px-5 py-1.5 rounded-md border-[1px] border-primary mx-3'>Reject</button>

                            <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
             </div>
              
              
               

              
           

            </div>
        </div>
    );
};

export default SubsReqDetails;