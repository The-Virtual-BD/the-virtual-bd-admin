import React, { useEffect, useMemo, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsCheck2, BsCheckLg, BsEyeFill, BsXLg } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { useTable } from 'react-table';
import { USER_COLUMNS } from '../../AllData/staticData';
import Button from '../utilities/Button';
import Table from './UsersPagenation';
import UsersPagenation from './UsersPagenation';

const Blogs = () => {

    const [data, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, []);

    return (
        <div className='text-primary p-3'>


            {/* <BloggerApplicationsTable /> */}
            {/* <AllBlogsList /> */}
            {/* <UsersPagenation /> */}
            {data.length && (
                <Table columns={USER_COLUMNS()} data={data} />
            )}



        </div>
    );
};

export default Blogs;

const AllBlogsList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, []);
    return (
        <div>
            <div className='bg-white w-full px-10  rounded-lg mt-2 py-6 shadow-md'>
                <div className="flex items-center justify-between pb-3">
                    <h2 className='text-2xl text-start font-semibold'>All Blogs List</h2>
                    <Button>Search</Button>
                </div>
                <table className=' w-full'>
                    <thead className="bg-bgclr">
                        <th>SL</th>
                        <th>Blogger Name</th>
                        <th>Blog title</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => <tr key={blog.id} className="even:bg-bgclr odd:bg-white rounded-md">
                            <td>{index + 1}</td>
                            <td>{blog.bloggerName}</td>
                            <td>{blog.blogTitle}</td>
                            <td>{blog.status}</td>
                            <td>
                                <div className='flex items-center justify-center gap-2 '>

                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                            <BsEyeFill className='text-lg  text-white' />
                                        </div>
                                    </button>

                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                            <AiFillDelete className='text-lg  text-white' />
                                        </div>
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>

            </div>
        </div>

    )
}


const BloggerApplicationsTable = () => {
    const [bloggerApplicent, setBloggerApplicent] = useState([]);

    useEffect(() => {
        fetch('/blogger.json')
            .then(res => res.json())
            .then(data => setBloggerApplicent(data))
    }, []);
    return (
        <div>
            <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
                <div className="flex items-center justify-between pb-3">
                    <h2 className='text-2xl text-start font-semibold'>All Blogger Applications</h2>
                    <Button>Search</Button>
                </div>
                <table className=' w-full'>
                    <thead className='bg-white'>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Expert Area</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {bloggerApplicent.map((blog, index) => <tr key={blog.id} className="even:bg-white odd:bg-bgclr rounded-md">
                            <td>{index + 1}</td>
                            <td>{blog.bloggerName}</td>
                            <td>{blog.blogSub}</td>
                            <td>{blog.blogExArea}</td>
                            <td>
                                <div className='flex items-center justify-center gap-1 '>
                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                            <BsEyeFill className='text-lg  text-white' />
                                        </div>
                                    </button>

                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                            <BsCheck2 className='text-lg  text-white' />
                                        </div>
                                    </button>

                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                            <RxCross2 className='text-lg  text-white' />
                                        </div>
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>

            </div>
        </div>
    )
};


/* const ReactTable = ({ data }) => {
    const columns = useMemo(()=>[{ Header: 'Name', accessor: 'bloggerName' }, { Header: 'Age', accessor: 'blogTitle' }, { Header: 'Address', accessor: 'blogDate' }], [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });
    return (
        <>
            <table className="table-auto border-collapse" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700"
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            className="px-4 py-2 border-b border-gray-300 text-left text-sm"
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
} */