import React from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { RiSearchLine } from "react-icons/ri";



export function GlobalFilter({ filter, setFilter }) {
    return (
        <>
            <div className="flex  items-center   py-1 px-2 rounded-lg  shadow-sm border-[1px] border-bgclr">
                <RiSearchLine className="text-2xl mr-2  text-primary bg-white" />
                <input
                    type="text"
                    placeholder="Search"
                    value={filter || ""} onChange={(e) => setFilter(e.target.value)}
                    className=" rounded-md outline-none py-2 p-1 bg-cardBg text-primary " />
            </div>
        </>
    );
}


function Table({ columns, data, headline }) {
    const memoisedColumns = React.useMemo(() => {
        return columns;
    }, [columns]);

    const memoisedData = React.useMemo(() => {
        return data;
    }, [data]);

    const tableInstance = useTable({
        columns: memoisedColumns,
        data: memoisedData,
    });

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,

    )

    console.log(pageOptions.length)
    console.log(page)

    return (
        <div className="bg-white py-3 px-2 rounded-md   w-auto">
            <div className="flex flex-col lg:flex-row items-center gap-3 justify-between bg-white w-full px-3 rounded-md">
                <h2 className="text-2xl font-bold text-primary">{headline}</h2>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>


            <div className="p-2 bg-white rounded-md mt-3  w-auto overflow-hidden overflow-x-auto">
                <table {...getTableProps()} className="w-auto lg:w-full pt-3  h-auto rounded-md ">
                    <thead className="rounded-lg">
                        {headerGroups.map((headerGroup, ind) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={ind} >
                                {headerGroup.headers.map((column, i) => (
                                    <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())} className="bg-white text-primary  text-center    p-3 ">{column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>


                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row, i)
                            return (
                                (i % 2 == 1) ? <tr {...row.getRowProps()} key={i} className="m-2 p-2 text-center  ">
                                    {row.cells.map((cell, i) => {
                                        return <td key={i} {...cell.getCellProps()} className="m-2 p-2 text-center capitalize text-primary  ">{cell.render('Cell')}</td>
                                    })}
                                </tr> :
                                    <tr {...row.getRowProps()} key={i} className="m-2 p-2 text-center ">
                                        {row.cells.map((cell, i) => {
                                            return <td key={i} {...cell.getCellProps()} className="m-2 p-2 text-center bg-bgclr text-primary   capitalize ">{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between px-3">
                <div>
                    <span>Show
                        <select className="rounded-md bg-cardBg p-1.5 mx-1  text-primary border-[1px] border-bgclr cursor-pointer"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize} className="bg-bgclr text-primary p-1.5  ">
                                    {pageSize}
                                </option>
                            ))}
                        </select>&nbsp;
                        entries
                    </span>
                </div>


                <div className="pagination p-2 py-3  float-right ">

                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="p-2 text-primary  hover:bg-blue hover:text-white rounded-md px-4  border-[1px] border-bgclr  font-bold cursor-pointer ">
                        {'Previous'}
                    </button>

                    <span className='bg-cardBg text-primary rounded-md px-4 py-3'>
                        Page
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>&nbsp;

                    <button onClick={() => nextPage()} disabled={!canNextPage} className="p-2  text-primary rounded-md px-4 font-bold hover:bg-blue hover:text-white  border-[1px] border-bgclr cursor-pointer">
                        {'Next'}
                    </button>




                </div>

            </div>

        </div>
    );
}

export default Table;


const PaginationBtn = () => {
    return (
        <>
        </>
    )
}
