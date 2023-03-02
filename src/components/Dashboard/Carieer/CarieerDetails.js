import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const CarieerDetails = () => {
    const [carrier, setCarrier] = useState({});
    const { id } = useParams();
    const [token] = useToken();



    //Handle Get Carieer
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/vaccancies/${id}`;
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
                setCarrier(data.data)
            })
    }, [token, id]);

    console.log(carrier)


    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
             <div>
                <h2 className='text-2xl font-bold text-start my-3 '>View Job</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Designation: </span>{carrier?.designation}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Job Type: </span> {carrier?.type}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Salary Range: </span>{carrier?.salary_range}</h3>
                </div>

                
                <div className='text-start mb-2'>
                    <h3 ><span className='font-bold'>Skills: </span> {carrier?.skills}</h3>
                </div>

                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{carrier?.description}</h3>
                </div>

            </div>

        </div>
    );
};

export default CarieerDetails;