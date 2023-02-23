import React, {  useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { CKEditor } from 'ckeditor4-react';
import { useParams } from 'react-router-dom';

const ServiceEdit = () => {
    const [service, setService] = useState();
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
                // console.log(data.service)
                setService(data.service)
            })
    }, [token, id]);


    console.log(service)
   


  

    const [namE, setName] = useState(service ? service.name : '')
    const [coveR, setCover] = useState(null);
    const [descriptioN, setDescription] = useState(service ? service.description : '');


   


    //Handle Add Services
    const handleAddServiceForm = async (e) => {
        e.preventDefault();

        /* const serviceData = new FormData();
        serviceData.append("name", name);
        serviceData.append("cover", cover, cover.name);
        serviceData.append("description", description);


        const url = `${baseURL}/api/admin/service/create`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: serviceData
        });

        const result = await response.json();

        if (result.error) {
            console.log(result.error);
            toast.error("Service Add Failed");
        } else {
            console.log(result);
            e.target.reset();
            toast.success(result.message);
        } */
    };


    
    return (
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
            <div >
                <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Update Service</h3>

                <form className='p-3' onSubmit={handleAddServiceForm} >

                    <div className="mb-3 flex flex-col items-start w-full">
                        <label htmlFor="projectTitle" className="font-bold mb-1">Service Title</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setName(e.target.value)} value={namE} />
                    </div>


                    <div className="mb-3 flex flex-col items-start w-full">
                        <label htmlFor="img" className="font-bold mb-1">Imgage</label>
                        <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr outline-none focus:outline-none" type="file" id="img" onChange={(e) => setCover(e.target.files[0])} />
                    </div>


                    <div className="mb-3 flex flex-col  w-full">
                        <label htmlFor="serviceDesc" className="mb-1 font-bold text-start">Description</label>
                        <CKEditor
                            data={descriptioN}
                            onChange={e => setDescription(e.editor.getData())}
                            // config={{toolbar: editorToolbar}}
                            className="w-full bg-bgclr rounded py-2 px-3 outline-none"
                        />
                    </div>


                    <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
                        <button
                            type="reset"
                            className="px-10 font-bold py-2 bg-white border border-blue hover:bg-blue hover:border-blue hover:text-white text-blue rounded-lg ">Reset</button>

                        <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Add</button>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default ServiceEdit;