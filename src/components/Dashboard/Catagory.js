import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { APPContext } from '../../actions/reducers';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Catagory = () => {
  const { addCategory } = useContext(APPContext);

  return (
    <div>
      {
        addCategory ? <AddCatagory /> : <ViewCatagory />
      }

    </div>
  );
};
export default Catagory;


const ViewCatagory = () => {
  const [catagory, setCatagory] = useState([]);
  const [token] = useToken();


  //Get Catagory
  useEffect(() => {
    const cUrl = `${baseURL}/api/categories/catlist`;
    fetch(cUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCatagory(data?.data))
  }, [token]);



  console.log(catagory);

  //Handle Catagory Delete*
  const handleCatagoryDelete = id => {

    const procced = window.confirm("You Want To Delete?");

    if (procced) {
      const userUrl = `${baseURL}/api/admin/categories/${id}`;
      fetch(userUrl, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const remaining = catagory.filter(card => card.id !== id);
          setCatagory(remaining);
          toast.success(data.message)
        })
    };
  }

  const CATAGORY_COLUMNS = () => {
    return [
      {
        Header: "SL",
        accessor: "id",
        sortType: 'basic',

      },
      {
        Header: "Category Name",
        accessor: "name",
        sortType: 'basic',

      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>

            <button onClick={() => handleCatagoryDelete(id)}>
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
      {catagory.length && (
        <Table columns={CATAGORY_COLUMNS()} data={catagory} headline={"All Categories"} />
      )}

    </div>
  )
};


const AddCatagory = () => {
  const [token] = useToken();
  const [catagoryName, setCatagoryName] = useState('');


  //Handle Add Catagory
  const handleAddCatagory = async (e) => {
    e.preventDefault();

    const catagoryData = new FormData();
    catagoryData.append("name", catagoryName);

    const url = `${baseURL}/api/admin/categories`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: catagoryData
    });

    const result = await response.json();

    if (result.error) {
      console.log(result.error);
      toast.error("Category Add Failed");
    } else {
      console.log(result);
      e.target.reset();
      toast.success(result.message);
    }
  };


  return (
    <div className='text-primary p-3 m-3 bg-white rounded-md '>
      <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>Add Category</h3>
      <form className='p-3 ' onSubmit={handleAddCatagory} >


        <div className="mb-3 flex flex-col items-start w-full">
          <label for="projectTitle" className="font-bold mb-1">Category Name</label>
          <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={e => setCatagoryName(e.target.value)} placeholder="Category Name" />
        </div>

        <div className="flex  justify-center lg:justify-end items-center text-center mt-3">
          <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Add</button>
        </div>
      </form>
    </div>
  )
};