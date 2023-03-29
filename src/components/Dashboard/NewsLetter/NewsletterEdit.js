import { CKEditor } from 'ckeditor4-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const NewsletterEdit = () => {
    const {id}=useParams();
    const [token] = useToken();
    const [newsLetter, setNewsLetter] = useState({});

    const [linK, setLink] = useState('')
    const [imagE, setImage] = useState(null);
    const [texT, setDescription] = useState("");
    const [subjecT, setSubject] = useState("");




     //Update Value
     useEffect(() => {
        if (newsLetter) { 
            setSubject(newsLetter?.subject);
            setLink(newsLetter?.link);
            setImage(newsLetter?.image);
            setDescription(newsLetter?.text);
        }
      }, [newsLetter]);

     //Handle Get service
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
                console.log(data)
                setNewsLetter(data.data)
            })
    }, [token, id]);


    console.log(newsLetter)


    //Handle Update newsLetter
    const handleUpdateNewsletterForm = async (e) => {
        e.preventDefault();

        const serviceData = new FormData();
        serviceData.append("link", linK);
        serviceData.append("image", imagE);
        serviceData.append("text", texT); 
        serviceData.append("subject", subjecT);


        const url = `${baseURL}/api/admin/newsletters/update/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: serviceData
        });

        const result = await response.json();

        if (result.error) {
            console.log(result.error);
            toast.error("Newsletter Update Failed");
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

            <form className='p-3' onSubmit={handleUpdateNewsletterForm} >

                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Subject</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setSubject(e.target.value)} value={subjecT} />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Link</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setLink(e.target.value)} value={linK} />
                </div>


                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Image</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage(e.target.files[0])} />

                </div>


                <div className="mb-3 flex flex-col  w-full">
                    <label for="serviceDesc" className="mb-1 font-bold text-start">Description</label>
                    <CKEditor
                        data={texT}
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