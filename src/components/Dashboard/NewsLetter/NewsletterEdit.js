import { CKEditor } from 'ckeditor4-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const NewsletterEdit = () => {
    const {id}=useParams();
    const [token] = useToken();

    const [link, setLink] = useState('')
    const [image, setImage] = useState(null);
    const [text, setDescription] = useState("");
    const [subject, setSubject] = useState("");


    //Handle Add Services
    const handleAddNewsletterForm = async (e) => {
        e.preventDefault();

        const serviceData = new FormData();
        serviceData.append("link", link);
        serviceData.append("image", image, image.name);
        serviceData.append("text", text);
        // serviceData.append("subject", subject);


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
    return (
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
        <div >
            <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Edit Newsletter</h3>

            <form className='p-3' onSubmit={handleAddNewsletterForm} >

                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Subject</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setSubject(e.target.value)} placeholder="Add Subject" />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Link</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setLink(e.target.value)} placeholder="Add Link" />
                </div>


                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Image</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage(e.target.files[0])} />

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
    );
};

export default NewsletterEdit;