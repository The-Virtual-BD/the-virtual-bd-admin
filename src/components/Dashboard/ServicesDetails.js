import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const ServicesDetails = () => {
    const [service, setService] = useState([]);
    const { id } = useParams();
    const [token] = useToken();



    //Handle Get service
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/service/${id}`;
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
                console.log(data.service)
                setService(data.service)
            })
    }, [token, id]);

    // console.log(service)

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Service</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='flex flex-col lg:flex-row items-start justify-center gap-5 p-4'>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col items-start gap-3'>
                        <h3><span className='font-bold'>Service Name: </span>{service?.name}</h3>

                        <div className='text-start'>
                            <h3 className='font-bold'>Description:</h3>
                            <p className='text-labelclr'>{service?.description}</p>
                        </div>
                    </div>

                </div>


                <div className='w-full lg:w-1/2'>
                    <img src={`${baseURL}/${service?.cover}`} alt="" srcSet="" className='h-full lg:h-[500px]' />
                </div>
            </div>
        </div>
    );
};

export default ServicesDetails;