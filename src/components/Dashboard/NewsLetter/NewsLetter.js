import { CKEditor } from 'ckeditor4-react';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const NewsLetter = () => {
    return (
        <div>
           {/* <ViewNewsLetter /> */}
           <AddNewsLetter />
        </div>
    );
};

export default NewsLetter;


const ViewNewsLetter=()=>{
    const [token] = useToken();
    const [newsletters, setNewsletters] = useState([]);
    const navigate = useNavigate();

    //Get Services
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/newsletters`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setNewsletters(data.data)
            })
    }, [token]);




    const handleNewslettersView = (id) => {
        console.log("clicked", id);
        // navigate(`/admin-dashboard/services/${id}`);
        navigate(`#`);
    };

    const handleNewslettersEdit = (id) => {
        console.log("clicked", id);
        // navigate(`/admin-dashboard/services/update/${id}`);
        navigate(`#`);
    };


    //Handle Delete NEWSLETTER
    const  handleDeleteNewsletters = id => {
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
                    const remaining = newsletters.filter(card => card.id !== id);
                    setNewsletters(remaining);
                    toast.success(data.message)

                })
        };
    };



    const SERVICE_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Text",
                accessor: "text",
                sortType: 'basic',

            },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handleNewslettersView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>
                        <button onClick={()=>handleNewslettersEdit(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                <RiEditBoxFill className='text-lg  text-white' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteNewsletters(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                <AiFillDelete className='text-lg  text-white' />
                            </div>
                        </button>
                    </div>);
                },
            },


        ];
    };

    return(
        <div className='text-primary p-3 '>
            {newsletters.length && (
                <Table columns={SERVICE_COLUMNS()} data={newsletters} headline={"All Newsletter"} />
            )}
        </div>
    )
};


const AddNewsLetter=()=>{
    const [token] = useToken();

    const [link, setName] = useState('')
    const [image, setCover] = useState(null);
    const [text, setDescription] = useState("");


    //Handle Add Services
    const handleAddNewsletterForm = async (e) => {
        e.preventDefault();

        const serviceData = new FormData();
        serviceData.append("link", link);
        serviceData.append("image", image, image.name);
        serviceData.append("text", text);


        const url = `${baseURL}/api/admin/newsletters/store`;
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
            toast.error("Newsletter Add Failed");
        } else {
            console.log(result);
            e.target.reset();
            setDescription('');
            toast.success(result.message);
        }
    };
    return(
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
            <div >
                <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Newsletter</h3>

                <form className='p-3' onSubmit={handleAddNewsletterForm} >

                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectTitle" className="font-bold mb-1">Add Link</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setName(e.target.value)} placeholder="Newsletter Link" />
                    </div>


                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="img" className="font-bold mb-1">Image</label>
                        <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                  outline-none focus:outline-none" type="file" id="img" onChange={(e) => setCover(e.target.files[0])} />
                    </div>


                    <div className="mb-3 flex flex-col  w-full">
                        <label for="serviceDesc" className="mb-1 font-bold text-start">Description</label>
                        <CKEditor
                            // data={description}
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