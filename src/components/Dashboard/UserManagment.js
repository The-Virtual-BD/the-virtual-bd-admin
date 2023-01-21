import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Table from '../SharedPage/Table';
import { USER_COLUMNS } from '../../AllData/staticData';

const UserManagment = () => {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        fetch('/users.json')
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, []);

    return (
        <div className='text-primary p-3 '>

            {allUsers.length && (
                <Table columns={USER_COLUMNS()} data={allUsers} headline={"All User list"} />
            )}

        </div>
    );
};

export default UserManagment;