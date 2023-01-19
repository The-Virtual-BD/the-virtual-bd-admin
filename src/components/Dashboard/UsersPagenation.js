import React from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { RiSearchLine } from "react-icons/ri";



export function GlobalFilter({ filter, setFilter }) {
	return (
		<>
			<div className="flex flex-between items-center justify-end bg-bgclr   py-2 px-3 rounded-lg shadow-md">
				<RiSearchLine className="text-2xl mr-2  text-gray-700" />
				<input
					type="text"
					placeholder="Search using name, email.."
					value={filter || ""} onChange={(e) => setFilter(e.target.value)}
					className="border-none pr-10 rounded-md outline-none bg-bgclr" />
			</div>
		</>
	);
}


function Table({ columns, data }) {
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

	return (
		<div className="bg-white p-5">
			<div className="flex  justify-end ">
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				{/* <span className="rounded-md ">
					Go to page:{' '}
					<input className="rounded-md dark:bg-[#46464F]"
						type="number"
						defaultValue={pageIndex + 1}
						onChange={e => {
							setPageSize(Number(e.target.value))
						}}
						style={{ width: '100px' }}
					/>
				</span> */}

			</div>
			<div className="p-3 bg-white rounded-md mt-3 font-sans dark:bg-[#282831]">
				<table {...getTableProps()} className=" w-full pt-5  h-auto rounded-md">
					<thead className="rounded-lg">
						{headerGroups.map((headerGroup, ind) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={ind} >
								{headerGroup.headers.map((column, i) => (
									<th key={i} {...column.getHeaderProps(column.getSortByToggleProps())} className="bg-[#ECECEC] text-justify dark:bg-[#46464F] dark:text-[#C7C5D0] text-gray-700 p-4 ">{column.render('Header')}
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
								(i % 2 == 1) ? <tr {...row.getRowProps()} key={i} className="m-2 p-4 text-justify ">
									{row.cells.map((cell, i) => {
										return <td key={i} {...cell.getCellProps()} className="m-2 p-4 text-justify capitalize  bg-white dark:bg-[#23232A]">{cell.render('Cell')}</td>
									})}
								</tr> :
									<tr {...row.getRowProps()} key={i} className="m-2 p-4 text-justify">
										{row.cells.map((cell, i) => {
											return <td key={i} {...cell.getCellProps()} className="m-2 p-4 text-justify capitalize bg-[#F9F9F9] dark:bg-[#282831]">{cell.render('Cell')}</td>
										})}
									</tr>
							)
						})}
					</tbody>
				</table>
			</div>


			<div className="flex items-center justify-between w-full">
				<div className="border-2 border-labelclr">
					&nbsp;
					<select className="rounded-md  "
						value={pageSize}
						onChange={e => {
							setPageSize(Number(e.target.value))
						}}
					>
						{[10, 20, 30, 40, 50, 100].map(pageSize => (
							<option key={pageSize} value={pageSize} className="bg-gray-200 p-6 text-labelclr outline-none">
								Show {pageSize} entries
							</option>
						))}
					</select>&nbsp;
				</div>

				<div className="pagination p-2 py-3  float-right ">
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="p-2 bg-gray-200 rounded-md px-4 text-gray-700 font-extrabold dark:text-[#FEFEFF] dark:bg-[#282831]" >
						{'<<'}
					</button>{' '}
					<button onClick={() => previousPage()} disabled={!canPreviousPage} className="p-2 bg-gray-200 rounded-md px-4  text-gray-700 font-extrabold dark:text-[#FEFEFF] dark:bg-[#282831]">
						{'<'}
					</button>{' '}
					<span className='bg-gray-200 rounded-md px-4 text-gray-500 p-3 dark:text-[#FEFEFF] dark:bg-[#282831]'>
						Page{' '}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{' '}
					</span>&nbsp;
					<button onClick={() => nextPage()} disabled={!canNextPage} className="p-2 bg-gray-200 rounded-md px-4 text-gray-700 font-extrabold dark:text-[#FEFEFF] dark:bg-[#282831]">
						{'>'}
					</button>{' '}
					<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="p-2 bg-gray-200 rounded-md px-4  text-gray-700 font-extrabold dark:text-[#FEFEFF] dark:bg-[#282831]">
						{'>>'}
					</button>{' '}

				</div>
			</div>



		</div>
	);
}

export default Table;
