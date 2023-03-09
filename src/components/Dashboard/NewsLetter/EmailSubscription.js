import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete, AiOutlinePoweroff } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPContext } from '../../../actions/reducers';
import Table from '../../SharedPage/Table';
import Loading from '../../utilities/Loading';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const EmailSubscription = () => {
  const { addEmailSubs } = useContext(APPContext);
  return (
    <div>
      {addEmailSubs ? <AddEmailSubs /> : <ViewEmailSubs />}
    </div>
  );
};

export default EmailSubscription;



const ViewEmailSubs = () => {
  const [token] = useToken();
  const [emailSubs, setEmailSubs] = useState([]);
  const allEmailSubs = [...emailSubs].reverse();
  const [isLoading, setIsLoading] = useState(false);
  const [isOn, setIson] = useState(allEmailSubs?.status);

  console.log(isOn);


  //Get Subscription
  useEffect(() => {
    const cUrl = `${baseURL}/api/admin/newsSubscriber`;
    setIsLoading(true);
    fetch(cUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setEmailSubs(data?.data)
      })
  }, [token]);


  //Handle Delete Subscription
  const handleDeleteSubs = id => {
    const procced = window.confirm("You Want To Delete?");

    if (procced) {
      const userUrl = `${baseURL}/api/admin/newsSubscriber/destroy/${id}`;
      fetch(userUrl, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const remaining = emailSubs.filter(card => card.id !== id);
          setEmailSubs(remaining);
          toast.success(data.message)
        })
    };
  };

  //Handle User Activity
  const handleActivity = id => {
    const userUrl = `${baseURL}/api/admin/newsSubscriber/toggle/${id}`;

    fetch(userUrl, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIson(!isOn)
        toast.success(data.message);
        // navigate("/admin-dashboard/blogs")
      })
  };




  const EMAIL_SUBS_COLUMNS = () => {
    return [
      {
        Header: "SL",
        id: 'index',
        accessor: (_row, i) => i + 1
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: 'basic',

      },
      {
        Header: "Status",
        accessor: "status",
        sortType: 'basic',
        Cell: ({ row }) => {
          const { status } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>
            {
              status === "1" ? 
              <p className='bg-white px-2 py-[2px] rounded-full border border-green-500 text-xs text-green-500'>On</p> : 
              <p className='bg-white  px-2 py-[2px] rounded-full border text-xs  border-red-500  text-red-500'>Off</p>
            }


          </div>);
        },

      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>

            <button onClick={() => handleActivity(id)}>
              <div className='w-8 h-8 rounded-md  bg-[#0068A3] text-white grid items-center justify-center'>
                <AiOutlinePoweroff className='text-lg  text-white' />
              </div>
            </button>

            <button onClick={() => handleDeleteSubs(id)}>
              <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                <AiFillDelete className='text-lg  text-white' />
              </div>
            </button>

          </div>);
        },
      },


    ];
  };

  if (isLoading) {
    return (<Loading />)
  };


  return (
    <div className='text-primary p-3'>

      {emailSubs.length && (
        <Table columns={EMAIL_SUBS_COLUMNS()} data={allEmailSubs} headline={"Email Subscriptions List"} />
      )}

    </div>
  )
};


const AddEmailSubs = () => {

  const [token] = useToken();
  const [email, setEmail] = useState('');

  const handleEmailSubscriptionsForm = async (e) => {
    e.preventDefault();

    const catagoryData = new FormData();
    catagoryData.append("email", email);

    const url = `${baseURL}/api/admin/newsSubscriber/store`;
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
      toast.error("Permission Add Failed");
    } else {
      console.log(result);
      e.target.reset();
      toast.success(result.message);
    }

  };



  return (
    <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
      <div>
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-1.5'>Add Email</h3>
        <form className='p-3 ' onSubmit={handleEmailSubscriptionsForm} >

          <div className="mb-3 flex flex-col items-start w-full">
            <label for="projectTitle" className="font-bold mb-1">Email</label>
            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setEmail(e.target.value)} placeholder="Add Email" />
          </div>

          <div className='flex items-end justify-end'>
            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg mt-3 ">Add</button>
          </div>

        </form>
      </div>
    </div>
  )
};