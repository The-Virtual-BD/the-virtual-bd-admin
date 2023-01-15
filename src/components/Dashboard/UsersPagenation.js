import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';


const columns = [
    {
        name: 'SL',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.body.slice(0,15),
        sortable: true,
    },
   
];




const UsersPagenation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	

   /*  const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        fetch('/users.json')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, []); */


    

	const fetchUsers = async page => {
		setLoading(true);

		const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data);
		setTotalRows((response.data).length);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []);


    return (
        <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
          <DataTable
			title="Users"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
		/>
        </div>
    );
};

export default UsersPagenation;