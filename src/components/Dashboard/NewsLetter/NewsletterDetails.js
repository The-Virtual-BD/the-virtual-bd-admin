import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const NewsletterDetails = () => {
    const { id } = useParams();
    const [token] = useToken();
    const [singNewsLetter, setsingNewsLetter] = useState({});
    const navigate = useNavigate();




    //Handle Get Newsletters
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/newsletters/${id}`;
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
                console.log(data)
                setsingNewsLetter(data.data)
            })
    }, [id,token]);

    //Handle Delete NEWSLETTER
    const handleDeleteNewsletters = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/newsletters/destroy/${id}`;
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
                    navigate("/admin-dashboard/comments")

                })
        };
    };

    //Handle Sent NEWSLETTER
    const handleSentNewsletter = id => {
        //Send to Backend
        const formUrl=`${baseURL}/api/admin/newsletters/send/${id}`;
        fetch(formUrl,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`
        },
        } )
        .then(res=>res.json())
        .then(result=>{
        console.log(result);
        toast.success(result.message);
        });
    };


    console.log(singNewsLetter);


    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 '>View Newsletter</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5 flex items-start flex-col lg:flex-row gap-5'>
                <div className='w-full lg:w-1/2'>
                    <div className='text-start mb-1'>
                        <h3 ><span className='font-bold'>Subject: </span>{singNewsLetter?.subject}</h3>
                    </div>

                    <div className='text-start mb-1'>
                        <h3 ><span className='font-bold'>Link: </span><a href={singNewsLetter?.link} target="_blank" rel="noopener noreferrer" className='text-blue'>{singNewsLetter?.link}</a></h3>
                    </div>

                    <div className='text-start  mb-1'>
                        <h3 ><span className='font-bold'>Description: </span></h3>
                        <div className='text-labelclr' dangerouslySetInnerHTML={{ __html: singNewsLetter?.text }} />
                    </div>



                    <div className='mt-7 flex items-startP'>

                        <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={()=>handleSentNewsletter(singNewsLetter?.id)}>Sent</button>

                        <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]' onClick={() => handleDeleteNewsletters(singNewsLetter?.id)}>Delete</button>
                    </div>

                </div>

                <div className='w-full lg:w-1/2'>
                    <img src={`${baseURL}/${singNewsLetter?.image}`} alt="" srcset="" />
                </div>

            </div>

        </div>
    );
};

export default NewsletterDetails;