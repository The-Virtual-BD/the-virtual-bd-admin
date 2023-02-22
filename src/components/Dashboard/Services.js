import { CKEditor } from 'ckeditor4-react';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPContext } from '../../actions/reducers';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Services = () => {
    const { isAddService } = useContext(APPContext);
    return (
        <div>
            {isAddService ? <AddService /> : <ViewServices />}
        </div>
    );
};

export default Services;


const AddService = () => {
    const [token] = useToken();

    const [name, setName] = useState('')
    const [cover, setCover] = useState(null);
    const [description, setDescription] = useState("");


    //Handle Add Services
    const handleAddServiceForm = async (e) => {
        e.preventDefault();

        const serviceData = new FormData();
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
        }
    };


    /*   const editorToolbar = [
          {
            name: "basicstyles",
            groups: ["basicstyles", "cleanup"],
            items: [
              "Bold",
              "Italic",
              "Underline",
              "Strike",
              "Subscript",
              "Superscript",
              "-",
              "RemoveFormat",
            ],
          },
          {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi"],
            items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent"],
          },
          { name: "links", items: ["Link", "Unlink"] },
          {
            name: "insert",
            items: [ "SpecialChar"],
          },
          
        ];
   */

    return (
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
            <div cclassName='bg-white w-full px-10   rounded-lg mt-2 py-6 shadow-md'>
                <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Service</h3>

                <form className='p-3' onSubmit={handleAddServiceForm} >

                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectTitle" className="font-bold mb-1">Service Title</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setName(e.target.value)} placeholder="Service Title" />
                    </div>


                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="img" className="font-bold mb-1">Imgage</label>
                        <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                  outline-none focus:outline-none" type="file" id="img" onChange={(e) => setCover(e.target.files[0])} />
                    </div>


                    <div className="mb-3 flex flex-col  w-full">
                        <label for="serviceDesc" className="mb-1 font-bold text-start">Description</label>
                        <CKEditor
                            data={description}
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
    )
};



const ViewServices = () => {
    const [token] = useToken();
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    //Get Services
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/services`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setServices(data.data))
    }, [token]);




    const handleUserView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/services/${id}`);
    };

    const handleUserEdit = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/services/update/${id}`);
    };


    //Handle Delete Service
    const handleDeleteService = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/service/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = services.filter(card => card.id !== id);
                    setServices(remaining);
                    toast.success(data.message)

                })
        };
    };



    const SERVICE_COLUMNS = () => {
        return [
            {
                Header: "SL",
                accessor: "id",
                sortType: 'basic',

            },
            {
                Header: "Title",
                accessor: "name",
                sortType: 'basic',

            },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handleUserView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>
                        <button onClick={()=>handleUserEdit(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                <RiEditBoxFill className='text-lg  text-white' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteService(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                <AiFillDelete className='text-lg  text-white' />
                            </div>
                        </button>
                    </div>);
                },
            },


        ];
    };

    return (
        <div className='text-primary p-3 '>
            {services.length && (
                <Table columns={SERVICE_COLUMNS()} data={services} headline={"All Services"} />
            )}
        </div>
    );
}