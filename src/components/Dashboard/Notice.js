import React, { useContext, useEffect, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import Table from '../SharedPage/Table';
import { saveAs } from "file-saver";
import { useForm } from 'react-hook-form';
import { APPContext } from '../../actions/reducers';


const Notice = () => {
    const { addNotice } = useContext(APPContext);
    return (
        <div>
             {
         addNotice ? <AddNotice /> : <ViewNotice />
      }
          
           
        </div>
    );
};

export default Notice;


const ViewNotice=()=>{
    const [notices, setNotices] = useState([]);
    useEffect(() => {
      fetch('/notice.json')
        .then(res => res.json())
        .then(data => setNotices(data))
    }, []);

     //Download Documents
     const downloadFile = (id) => {
        const getDoc=notices.find(notice=>notice.id===id);

        fetch(`${getDoc.doc}`)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${getDoc.title}`);
          });
      };

  const NOTICE_COLUMNS = () => {
        return [
          {
            Header: "SL",
            accessor: "id",
            sortType: 'basic',
    
          },
          {
            Header: "Title",
            accessor: "title",
            sortType: 'basic',
    
          },
          {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }) => {
                const { id } = row.original;
                return ( <div className='flex items-center justify-center'><button className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center' onClick={()=>downloadFile(id)}>
                <FiDownload className=' ' />
            </button></div>);
            },
        },
        ];
      }; 



    return(
        <div className='text-primary p-3'>
            {notices.length && (
                    <Table columns={NOTICE_COLUMNS()} data={notices} headline={"Notice List"} />
                )}
        </div>
    )
};


const AddNotice=()=>{
    const[title,setTitle]=useState('');
    const[doc,setDoc]=useState(null);


    //Handle Add Notice
    const handleAddNotice=(e) => {
        e.preventDefault();
        const newNotice={title,doc};

        console.log(newNotice);
        e.target.reset()
    };

    return(
        <div className='text-primary p-3 m-3 bg-white rounded-md '>
            <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>Add Notice</h3>
            <form className='p-3 ' onSubmit={handleAddNotice} >


                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Notice Title</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={e=>setTitle(e.target.value)} placeholder="Notice Title" />
                </div>

                 <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Upload Notice</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr outline-none focus:outline-none active:outline-none"
                        type="file" id="img" onChange={e=>setDoc(e.target.files[0])} />
                 </div>

                <div className="flex  justify-center lg:justify-end items-center text-center mt-3">
                    <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Submit</button>
                </div>
           </form>
        </div>
    )
};