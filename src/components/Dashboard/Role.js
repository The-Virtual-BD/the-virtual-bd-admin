import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APPContext, useCollection } from "../../actions/reducers";
import Table from "../SharedPage/Table";
import Loading from "../utilities/Loading";
import { baseURL } from "../utilities/url";
import useToken from "../utilities/useToken";

const Role = () => {
	const { addRole } = useContext(APPContext);
	return <div>{addRole ? <AddRole /> : <ViewAllRole />}</div>;
};

export default Role;

const ViewAllRole = () => {
	const [token] = useToken();
	const navigate = useNavigate();

	const { roles, rolesLoading } = useCollection();

	if (rolesLoading) {
		return <Loading />;
	}

	if (!rolesLoading && roles?.length === 0) {
		return <p>No Role is Avaiable</p>;
	}

	const allRoles = roles?.reverse();

	const handleDeleteRole = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			const userUrl = `${baseURL}/api/admin/role/destroy/${id}`;
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

	const handleViewRole = (id) => {
		navigate(`/admin-dashboard/role/${id}`);
	};

	const ROLE_COLUMNS = () => {
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
							<button onClick={() => handleViewRole(id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg  " />
								</div>
							</button>

							<button onClick={() => handleDeleteRole(id)}>
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
		<div className="text-blue p-3">
			{roles?.length && (
				<Table
					columns={ROLE_COLUMNS()}
					data={allRoles}
					headline={"All Roles"}
				/>
			)}
		</div>
	);
};

const AddRole = () => {
	const [token] = useToken();
	const { permits, permissionsLoading } = useCollection();
	const [isSending, setIsSending] = useState(false);

	const [name, setName] = useState("");
	const [role_permissions, setRole_Permissions] = useState({
		permissions: [],
	});

	if (permissionsLoading) {
		return <Loading />;
	}

	//Handle Add Role
	const handleAddRole = async (e) => {
		e.preventDefault();
		setIsSending(true);

		const roleForm = new FormData();
		roleForm.append("name", name);
		roleForm.append("permissions", role_permissions.permissions);

		const noUrl = `${baseURL}/api/admin/role/create`;

		const response = await fetch(noUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: roleForm,
		});

		const result = await response.json();

		if (result.error) {
			console.log(result.error);
			toast.error("Role Add Failed");
			setIsSending(false);
		} else {
			console.log(result);
			e.target.reset();
			toast.success(result.message);
			setIsSending(false);
		}
	};

	//Handle Checkbox
	const handleChange = (e) => {
		const { value, checked } = e.target;
		const { permissions } = role_permissions;

		if (checked) {
			setRole_Permissions({
				permissions: [...permissions, value],
			});
		} else {
			setRole_Permissions({
				permissions: permissions.filter((e) => e !== value),
				response: permissions.filter((e) => e !== value),
			});
		}
	};

	// console.log(role_permissions.permissions);

	return (
		<div className="text-primary p-3 m-3 bg-white rounded-md ">
			<h3 className="px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary">
				Add Role
			</h3>
			<form className="p-3" onSubmit={handleAddRole}>
				<div className="mb-3 flex flex-col items-start w-full">
					<label for="projectTitle" className="font-bold mb-1">
						Role Name
					</label>
					<input
						type="text"
						className="w-full bg-bgclr rounded py-2 px-3 outline-none"
						id="projectTitle"
						onChange={(e) => setName(e.target.value)}
						placeholder="Role Name"
					/>
				</div>

				<div>
					<h1 className="font-bold text-start mb-2">Add Permissions</h1>
					<div className="mb-3 flex flex-col items-start w-full">
						{permits?.map((option) => (
							<div key={option?.id}>
								<label>
									<input
										type="checkbox"
										value={option?.id}
										name="languages"
										id="flexCheckDefault"
										onChange={handleChange}
									/>
									<span className="ml-2 font-semibold">{option?.name}</span>
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="flex  justify-center lg:justify-end items-center text-center mt-3">
					<button
						type="submit"
						disabled={isSending}
						className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
					>
						{isSending ? "Submitting..." : "Submit"}{" "}
					</button>
				</div>
			</form>
		</div>
	);
};
