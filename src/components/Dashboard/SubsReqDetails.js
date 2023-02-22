import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveAs } from "file-saver";
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { toast } from 'react-toastify';


const SubsReqDetails = () => {
    const [subRe, setSubRe] = useState([]);
    const { id } = useParams();
    const[token]=useToken();
    const navigate=useNavigate();


    //Handle Get Project
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/subscriptions/${id}`;
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
                setSubRe(data.data)
            })
    }, [token, id]);


    //Download Documents
    const downloadFile = () => {
        fetch(`${subRe.attachment}`)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${subRe?.attachment}`);
            
          });
      };


      //Handle Delete Sub Req
    const handleDeleteSubReq=id=>{
        const procced=window.confirm("You Want To Delete?");
    
        if (procced) {
            const userUrl=`${baseURL}/api/admin/subscriptions/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                        console.log(data);
                        toast.success(data.message);
                        navigate("/admin-dashboard/sub-request")
                })
        };
      };

      //handle Accept Sub Req
      const handleSuReqAccept=id=>{
        const userUrl=`${baseURL}/api/admin/subscriptions/approve/${id}`;

        fetch(userUrl, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                    console.log(data);
                    toast.success(data.message);
                    navigate("/admin-dashboard/sub-request")
            })
      }
      
            

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Subscription Request</h2>
                <hr className=' text-bgclr' />
            </div>

            <div className='mt-5'>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>{`${subRe?.applicant?.first_name} ${subRe?.applicant?.last_name}`}</h3>

                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Service Name: </span> {subRe?.service?.name}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Meeting Time: </span>{subRe?.schedule}</h3>
                </div>

                <div className='text-start mb-2'>
                    <h3 ><span className='font-bold'>Subject: </span> {subRe?.subject}</h3>
                </div>

                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{subRe?.description}</h3>
                </div>

                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold mr-1'>Documents: </span>
                        <span className='text-blue hover:underline cursor-pointer' onClick={downloadFile}> {subRe?.attachment}</span>

                    </h3>
                </div>




                <div className='mt-7 flex items-start '>
                    <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3'>Accept</button>

                    {/* <button className='text-primary font-bold px-5 py-1.5 rounded-md border-[1px] border-primary mx-3'>Reject</button> */}

                    <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
                </div>



                 <div className='mt-7 flex items-start '>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={()=>handleSuReqAccept(subRe?.id)}>Accept</button>

                            <button onClick={()=>handleDeleteSubReq(subRe?.id)} className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
                  </div>
              
              
               


            </div>
        </div>
    );
};

export default SubsReqDetails;