import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveAs } from "file-saver";
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import { toast } from 'react-toastify';
import moment from 'moment';


const SubsReqDetails = () => {
    const [subRe, setSubRe] = useState([]);
    const { id } = useParams();
    const [token] = useToken();
    const navigate = useNavigate();
    const scheduleDate = moment(subRe?.schedule).format('DD MMM YYYY hh:mm A');

    //Coversation
    const[message,setMessage]=useState('');
    const[attachment,setAttachment]=useState(null);
    


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
                // console.log(data.data)
                setSubRe(data.data)
            })
    }, [token, id]);


    //Handle Delete Sub Req
    const handleDeleteSubReq = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/subscriptions/destroy/${id}`;
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
    const handleSuReqAccept = id => {
        const subReqUrl = `${baseURL}/api/admin/subscriptions/approve/${id}`;

        fetch(subReqUrl, {
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
    };

    //handle Declined Sub Req
    const handleSuReqDeclined = id => {
        const subReqUrl = `${baseURL}/api/admin/subscriptions/decline/${id}`;

        fetch(subReqUrl, {
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
    };

    // console.log(subRe)


    const handleSubReqMsgForm=async(e)=>{
        e.preventDefault();

    
        const msgData = new FormData();
        msgData.append("message", message);
        msgData.append("attachment", attachment);
        msgData.append("subscription_id", id);
        msgData.append("type", 2);

        const url = `${baseURL}/api/subchat/store`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: msgData
        });

        const result = await response.json();

        if (result.error) {
            console.log(result.error);
            toast.error("Message Sent Failed");
        } else {
            console.log(result);
            setSubRe(result.data)
            e.target.reset();
            toast.success("Message Sent");
        }
    };


    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3'>View Subscription Request</h2>
                <hr className=' text-bgclr' />
            </div>

            <div className='mt-5'>
              <div>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>{`${subRe?.applicant?.first_name} ${subRe?.applicant?.last_name}`}</h3>
                </div>

                <div className='text-start mb-3'>
                    <h3 ><span className='font-bold'>Email: </span> {subRe?.applicant?.email}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Status: </span>
                        {
                            subRe?.status == "1" ?
                                (<span className='text-yellow-500'>Pendding</span>) : subRe?.status == "2" ?
                                    (<span className='text-green-500'>Approved</span>) : subRe?.status == "4" ?
                                        (<span className='text-red-500'>Declined</span>) : subRe?.status == "3" ?
                                            (<span className='text-green-500'>Approved</span>) : ""
                        }
                    </h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Service Name: </span> {subRe?.service?.name}</h3>
                </div>

                <div className='text-start mb-2'>
                    <h3 ><span className='font-bold'>Subject: </span> {subRe?.subject}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Meeting Time: </span>{scheduleDate}</h3>
                </div>


                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{subRe?.description}</h3>
                </div>

                <div className='text-start  mb-10 '>
                    <h3 ><span className='font-bold mr-1'>Documents: </span>
                        <a href={`${baseURL}/${subRe?.attachment}`} download className='text-blue hover:underline cursor-pointer'> {subRe?.attachment}</a>
                    </h3>
                </div>
              </div>

              <div className='text-start  mb-1 '>
                    {
                     ( subRe?.status == "2" || subRe?.status == "3" )  && <div className='text-primary bg-white rounded-md '>

                    <div className=' bg-bgclr rounded mb-5 overflow-scroll h-[500px] p-3'>
                         {
                            subRe?.chats?.map(chat=>{
                                        console.log(chat)
                                        const {message,attachment,type,created_at}=chat;
                                        const nowTime=new Date()-created_at;
                                        console.log(nowTime);
                                        
                                 return(
                                    <div className={`${type==1 ? "text-start mr-20": "text-end ml-20"} m-2 p-3 rounded bg-white`}>
                                         <p>{message}</p>
                                          {
                                             attachment && <a href={`${baseURL}/${attachment}`} className="text-blue" download>attachment</a>
                                           }
                                     </div>
                            )})
                         }
                    </div>
                  

                    <form  onSubmit={handleSubReqMsgForm}>
                        <div className="mb-2 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Message</label>
                            <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="3" placeholder="Type Message" onChange={(e)=>setMessage(e.target.value)} required></textarea>
                        </div>
                        <div className="mb-2 flex flex-col items-start w-full">
                            <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                            outline-none focus:outline-none active:outline-none" type="file" id="img" onChange={(e) => setAttachment(e.target.files[0])} />
                        </div>
            
                        <div className="flex  justify-center lg:justify-end items-center text-center mt-3">
                            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Sent</button>
                        </div>
                    </form>
                    
                   </div>
                    }
              </div>




                <div className='mt-7 flex items-start '>

                    {
                        subRe?.status == "1" ? (
                            <div className='mr-3'>
                                <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleSuReqAccept(subRe?.id)}>Accept</button>

                                <button className='text-yellow-500 font-bold px-5 py-1.5 rounded-md border-[1px] border-yellow-500' onClick={() => handleSuReqDeclined(subRe?.id)}>Declined</button>
                            </div>
                        ) :
                            subRe?.status == "4" ? (
                                <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleSuReqAccept(subRe?.id)}>Accept</button>
                            ) : ""

                    }


                  {/*   <button onClick={() => handleDeleteSubReq(subRe?.id)} className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button> */}
                </div>


            </div>
        </div>
    );
};

export default SubsReqDetails;