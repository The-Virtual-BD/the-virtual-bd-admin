import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { APPContext, useCollection } from "../../actions/reducers";
import Table from "../SharedPage/Table";
import Loading from "../utilities/Loading";
import { baseURL } from "../utilities/url";
import useToken from "../utilities/useToken";

const Catagory = () => {
	const { addCategory } = useContext(APPContext);
	return <div>{addCategory ? <AddCatagory /> : <ViewCatagory />}</div>;
};
export default Catagory;

const ViewCatagory = () => {
	const [token] = useToken();

	const { categories, categoriesLoading } = useCollection();
	if (categoriesLoading) {
		return <Loading />;
	}

	if (!categoriesLoading && categories?.length === 0) {
		return <p>No Category is Avaiable</p>;
	}

	//Handle Catagory Delete
	const handleCatagoryDelete = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			const userUrl = `${baseURL}/api/admin/categories/${id}`;
			fetch(userUrl, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					toast.success(data.message);
					window.location.reload();
				});
		}
	};

	const CATAGORY_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Category Name",
				accessor: "name",
				sortType: "basic",
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleCatagoryDelete(id)}>
								<div className="w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
									<AiFillDelete className="text-lg  text-white" />
								</div>
							</button>
						</div>
					);
				},
			},
		];
	};

	return (
		<div className="text-primary p-3">
			{categories?.length && (
				<Table
					columns={CATAGORY_COLUMNS()}
					data={categories}
					headline={"Blog Categories"}
				/>
			)}
		</div>
	);
};

const AddCatagory = () => {
	const [token] = useToken();
	const [catagoryName, setCatagoryName] = useState("");

	const [submitting, setSubmitting] = useState(false);

	//Handle Add Catagory
	const handleAddCatagory = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const catagoryData = new FormData();
		catagoryData.append("name", catagoryName);

		const url = `${baseURL}/api/admin/categories`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: catagoryData,
		});

		const result = await response.json();

		if (result.error) {
			console.log(result.error);
			toast.error("Category Add Failed");
			setSubmitting(false);
		} else {
			console.log(result);
			e.target.reset();
			toast.success(result.message);
			setSubmitting(false);
			// window.location.reload()
		}
	};

	return (
		<div>
			<div className="text-primary p-3 m-3 bg-white rounded-md ">
				<h3 className="px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary">
					Add Category
				</h3>
				<form className="p-3 " onSubmit={handleAddCatagory}>
					<div className="mb-3 flex flex-col items-start w-full">
						<label for="projectTitle" className="font-bold mb-1">
							Category Name
						</label>
						<input
							type="text"
							className="w-full bg-bgclr rounded py-2 px-3 outline-none"
							id="projectTitle"
							onChange={(e) => setCatagoryName(e.target.value)}
							placeholder="Category Name"
						/>
					</div>

					<div className="flex  justify-center lg:justify-end items-center text-center mt-3">
						<button
							disabled={submitting}
							type="submit"
							className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							{submitting ? "Adding" : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
