import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APPContext, useCollection } from "../../actions/reducers";
import Table from "../SharedPage/Table";
import Loading from "../utilities/Loading";
import { baseURL } from "../utilities/url";
import useToken from "../utilities/useToken";

const Permission = () => {
	const { isAddPermission } = useContext(APPContext);
	return (
		<div>{isAddPermission ? <AddPermission /> : <ViewAllPermissions />}</div>
	);
};

export default Permission;

const ViewAllPermissions = () => {
	const [token] = useToken();
	const navigate = useNavigate();

	const { permits, permissionsLoading } = useCollection();

	if (permissionsLoading) {
		return <Loading />;
	}

	if (!permissionsLoading && permits?.length === 0) {
		return <p>No Permissions is Avaiable</p>;
	}

	const allPermissions = permits?.reverse();

	//Handle Delete Permission
	const handleDeletePermission = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			const userUrl = `${baseURL}/api/admin/permission/destroy/${id}`;
			fetch(userUrl, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					toast.success(data.message);
				});
		}
	};

	const PERMISSION_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Name",
				accessor: "name",
				sortType: "basic",
			},
			{
				Header: "Gurd Name",
				accessor: "guard_name",
				sortType: "basic",
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleDeletePermission(id)}>
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
			{permits?.length && (
				<Table
					columns={PERMISSION_COLUMNS()}
					data={allPermissions}
					headline={"All Permissions"}
				/>
			)}
		</div>
	);
};

const AddPermission = () => {
	const [token] = useToken();
	const [name, setName] = useState("");
	const [isSending, setIsSending] = useState(false);

	const handlePermissionForm = async (e) => {
		e.preventDefault();
		setIsSending(true);

		const catagoryData = new FormData();
		catagoryData.append("name", name);

		const url = `${baseURL}/api/admin/permission/create`;
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
			toast.error("Permission Add Failed");
			setIsSending(false);
		} else {
			console.log(result);
			e.target.reset();
			toast.success(result.message);
			setIsSending(false);
		}
	};

	return (
		<div className="text-labelclr p-3 m-3 bg-white rounded-md ">
			<div cclassName="bg-white w-full px-10   rounded-lg mt-2 py-6 shadow-md">
				<h3 className="px-3 text-2xl font-bold text-center  lg:text-start my-2">
					Add Permission
				</h3>
				<form className="p-3 " onSubmit={handlePermissionForm}>
					<div className="mb-3 flex flex-col items-start w-full">
						<label for="projectTitle" className="font-bold mb-1">
							Permission Name
						</label>
						<input
							type="text"
							className="w-full bg-bgclr rounded py-2 px-3 outline-none"
							id="projectTitle"
							onChange={(e) => setName(e.target.value)}
							placeholder="permission create"
						/>
					</div>

					<div className="flex items-end justify-end">
						<button
							type="submit"
							disabled={isSending}
							className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg mt-3 "
						>
							{isSending ? "Adding..." : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
