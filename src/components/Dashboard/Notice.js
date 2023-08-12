import React, { useContext, useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import Table from '../SharedPage/Table';
import { APPContext, useCollection } from '../../actions/reducers';
import { AiFillDelete } from 'react-icons/ai';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { toast } from 'react-toastify';
import Loading from '../utilities/Loading';
import moment from 'moment';
import Sending from '../utilities/Sending';


const Notice = () => {
    const { addNotice } = useContext(APPContext);
    return (
        <div>
             { addNotice ? <AddNotice /> : <ViewNotice />}

        </div>
    );
};

export default Notice;


const ViewNotice=()=>{
    const[token]=useToken();
    
    const { notices,noticesLoading} = useCollection();

    if (noticesLoading) {
        return (<Loading />)
    };

    if (!noticesLoading && notices?.length === 0) {
        return <p>No Notice is Avaiable</p>
    };

    const allNotices = [...notices].reverse();

  

       //Handle Delete Notice
       const handleDeleteNotice=id=>{
        const procced=window.confirm("You Want To Delete?");
    
        if (procced) {
            const userUrl=`${baseURL}/api/admin/notices/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                        if(data.message){
                            toast.success(data.message)
                        }else{
                            console.log(data.message)
                            toast.error("Notice Delete Failed")
                        }
                })
        };
      };

  const NOTICE_COLUMNS = () => {
        return [
          
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Name",
                accessor: "title",
                sortType: 'basic',

            },
            {
                Header: "Published Date",
                accessor: "created_at",
                sortType: 'basic',
                Cell: ({ row }) => {
                  const { created_at } = row.original;
                  return (
                     <div>
                       { moment(created_at).format('DD MMMM, YYYY')}
                     </div>
                  );
              },
              },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id,document } = row.original;
                    return (<div className='flex items-center justify-center gap-2'><a href={`${baseURL}/${document}`} className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center' download>
                        <FiDownload className=' ' />
                    </a>

                    <button onClick={()=>handleDeleteNotice(id)}>
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
        <div className='text-primary p-3'>
            {notices.length && (
                <Table columns={NOTICE_COLUMNS()} data={allNotices} headline={"All Notices"} />
            )}
        </div>
    )
};


const AddNotice = () => {
    const [token] = useToken();
    const [title, setTitle] = useState('');
    const [document, setDoc] = useState(null);
    const [isSending,setIsSending]=useState(false);

    //Handle Add Notice
    const handleAddNotice = async (e) => {
        e.preventDefault();
        setIsSending(true);

        // const newNotice={title,document};
        const noticeForm=new FormData();
        noticeForm.append("title",title);
        noticeForm.append("document",document);



        const noUrl = `${baseURL}/api/admin/notices`;

        const response = await fetch(noUrl, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: noticeForm
        });

        const result = await response.json();

        if (result.error) {
            console.log(result.error);
            toast.error("Notice Add Failed");
        } else {
            console.log(result);
            e.target.reset();
            toast.success(result.message);
        };
        setIsSending(false);
    };

   /*  if(isSending){
        return <Sending />
    }; */

    return(
        <div className='text-primary p-3 m-3 bg-white rounded-md '>
            <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>Add Notice</h3>
            <form className='p-3 ' onSubmit={handleAddNotice} >


                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Notice Title</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={e => setTitle(e.target.value)} placeholder="Notice Title" />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Upload Notice</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr outline-none focus:outline-none active:outline-none"
                        type="file" id="img" onChange={e => setDoc(e.target.files[0])} />
                </div>

                <div className="flex  justify-center lg:justify-end items-center text-center mt-3">
                    <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg" disabled={isSending}>Submit</button>
                </div>
            </form>
        </div>
    )
};