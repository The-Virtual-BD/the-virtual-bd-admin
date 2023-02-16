import { CKEditor } from 'ckeditor4-react';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { APPContext } from '../../actions/reducers';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Services = () => {
    const {isAddService, setIsAddService } = useContext(APPContext);
    return (
        <div>
             {
                isAddService? <AddService /> : <ViewServices />
             }
        </div>
    );
};

export default Services;


const AddService=()=>{
    const[serviceName,setServiceName]=useState('')
    const[serviceImg,setServiceImg]=useState(null);
    const[serviceDesc,setServiceDesc]=useState("");

    const handleAddServiceForm=e=>{
        e.preventDefault();
        const newService={serviceName,serviceDesc,serviceImg};
        console.log(newService);

        // setServiceDesc('');
        e.target.reset();
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

    return(
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
      <div cclassName='bg-white w-full px-10   rounded-lg mt-2 py-6 shadow-md'>
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Project</h3>

        <form className='p-3' onSubmit={handleAddServiceForm} >
            
            <div class="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" class="font-bold mb-1">Service Title</label>
              <input type="text" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setServiceName(e.target.value)} placeholder="Service Title" />
            </div>

          
            <div class="mb-3 flex flex-col items-start w-full">
                    <label for="img" class="font-bold mb-1">Imgage</label>
                    <input class="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                  outline-none focus:outline-none" type="file" id="img" onChange={(e) => setServiceImg(e.target.value)} />
              </div>


                <div class="mb-3 flex flex-col  w-full">
                     <label for="serviceDesc" class="mb-1 font-bold text-start">Description</label>
                        <CKEditor
                            data={serviceDesc}
                            onChange={e => setServiceDesc(e.editor.getData())}
                            // config={{toolbar: editorToolbar}}
                            class="w-full bg-bgclr rounded py-2 px-3 outline-none"
                        />
                </div>                 

           
                <div class="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
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



const ViewServices=()=>{
    const[token]=useToken();
    const [services, setServices] = useState([]);

    const navigate = useNavigate();
   

    useEffect(() => {
        const perUrl=`${baseURL}/api/admin/services`;
        fetch(perUrl,{
          method:"GET",
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

    const USER_COLUMNS = () => {
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
                Cell: ({row}) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handleUserView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>
                        <button>
                            <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                <RiEditBoxFill className='text-lg  text-white' />
                            </div>
                        </button>

                        <button>
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
                <Table columns={USER_COLUMNS()} data={services} headline={"All Services"} />
            )}

        </div>
    );
}