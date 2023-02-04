import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Table from '../SharedPage/Table';

const Role = () => {
    return (
        <div>
           <ViewAllRole />
        </div>
    );
};

export default Role;


const ViewAllRole=()=>{
    const navigate = useNavigate();
  const [permit, setPermit] = useState([]);

  useEffect(() => {
    fetch('/permit.json')
      .then(res => res.json())
      .then(data => setPermit(data))
  }, []);

  /* const handlePermitView = (id) => {
    console.log("clicked", id);
    navigate(`/admin-dashboard/project/${id}`);
  }; */


  const PROJECT_COLUMNS = () => {
    return [
      {
        Header: "SL",
        accessor: "id",
        sortType: 'basic',

      },
      {
        Header: "Name",
        accessor: "name",
        sortType: 'basic',

      },
      {
        Header: "Gurd Name",
        accessor: "guardName",
        sortType: 'basic',

      },
     

      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { _id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>
            <button >
              <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                <BsEyeFill className='text-lg  ' />
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
    <div className='text-primary p-3'>

      {permit.length && (
        <Table columns={PROJECT_COLUMNS()} data={permit} headline={"All Role"} />
      )}

    </div>
  )
};




