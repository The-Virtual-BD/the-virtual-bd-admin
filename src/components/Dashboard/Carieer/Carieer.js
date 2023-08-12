import { CKEditor } from "ckeditor4-react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APPContext, useCollection } from "../../../actions/reducers";
import Table from "../../SharedPage/Table";
import Loading from "../../utilities/Loading";
import Sending from "../../utilities/Sending";
import { baseURL } from "../../utilities/url";
import useToken from "../../utilities/useToken";

const Carieer = () => {
	const { addCareer } = useContext(APPContext);
	return <div>{addCareer ? <AddCarieer /> : <ViewCarieer />}</div>;
};

export default Carieer;

const ViewCarieer = () => {
	const [token] = useToken();
	const navigate = useNavigate();

	const { jobs, jobsLoading } = useCollection();

	if (jobsLoading) {
		return <Loading />;
	}

	if (!jobsLoading && jobs?.length === 0) {
		return <p>No Job is Avaiable</p>;
	}

	const allJobs = [...jobs].reverse();

	const handleCarieerView = (id) => {
		console.log("clicked", id);
		navigate(`/admin-dashboard/carieer/${id}`);
	};

	const handleCarieerEdit = (id) => {
		console.log("clicked", id);
		navigate(`/admin-dashboard/carieer/update/${id}`);
	};

	//Handle Delete Carieer
	const handleDeleteCarieer = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			const userUrl = `${baseURL}/api/admin/vaccancies/destroy/${id}`;
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

	const Carieer_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Designation",
				accessor: "designation",
				sortType: "basic",
			},
			{
				Header: "Type",
				accessor: "type",
				sortType: "basic",
			},
			{
				Header: "Skills",
				accessor: "skills",
				sortType: "basic",
			},

			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { id } = row.original;
					return (
						<div className="flex  items-center justify-center  gap-2 ">
							<button onClick={() => handleCarieerView(id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg  " />
								</div>
							</button>
							<button onClick={() => handleCarieerEdit(id)}>
								<div className="w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center">
									<RiEditBoxFill className="text-lg  text-white" />
								</div>
							</button>

							<button onClick={() => handleDeleteCarieer(id)}>
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
		<div className="text-primary p-3 ">
			{jobs?.length && (
				<Table
					columns={Carieer_COLUMNS()}
					data={allJobs}
					headline={"All Jobs"}
				/>
			)}
		</div>
	);
};

const AddCarieer = () => {
	const [token] = useToken();

	const [designation, setDesignation] = useState("");
	const [type, setType] = useState("");
	const [salary_range, setSalary_range] = useState("");
	const [skills, setSkills] = useState("");
	const [description, setDescription] = useState("");
	const [isSending, setIsSending] = useState(false);

	//Handle Add Job
	const handleAddServiceForm = async (e) => {
		e.preventDefault();
		setIsSending(true);
		const jobData = new FormData();
		jobData.append("designation", designation);
		jobData.append("type", type);
		jobData.append("salary_range", salary_range);
		jobData.append("skills", skills);
		jobData.append("description", description);

		const url = `${baseURL}/api/admin/vaccancies/store`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: jobData,
		});

		const result = await response.json();

		if (result.error) {
			console.log(result.error);
			toast.error("Job Add Failed");
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
			<div>
				<h3 className="px-3 text-2xl font-bold text-center  lg:text-start my-2">
					Add Job
				</h3>

				<form className="p-3" onSubmit={handleAddServiceForm}>
					<div className="flex flex-col lg:flex-row items-center gap-3">
						<div className="mb-3 flex flex-col items-start w-full">
							<label for="projectTitle" className="font-bold mb-1">
								Designation
							</label>
							<input
								type="text"
								className="w-full bg-bgclr rounded py-2 px-3 outline-none"
								id="projectTitle"
								onChange={(e) => setDesignation(e.target.value)}
								placeholder="Designation"
								required
							/>
						</div>

						<div className="mb-3 flex flex-col items-start w-full">
							<label for="projectTitle" className="font-bold mb-1">
								Job Type
							</label>
							<input
								type="text"
								className="w-full bg-bgclr rounded py-2 px-3 outline-none"
								id="projectTitle"
								onChange={(e) => setType(e.target.value)}
								placeholder="Job Type"
								required
							/>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row items-center gap-3">
						<div className="mb-3 flex flex-col items-start w-full">
							<label for="projectTitle" className="font-bold mb-1">
								Salary Range
							</label>
							<input
								type="text"
								className="w-full bg-bgclr rounded py-2 px-3 outline-none"
								id="projectTitle"
								onChange={(e) => setSalary_range(e.target.value)}
								placeholder="Salary Range"
								required
							/>
						</div>

						<div className="mb-3 flex flex-col items-start w-full">
							<label for="projectTitle" className="font-bold mb-1">
								Skills
							</label>
							<input
								type="text"
								className="w-full bg-bgclr rounded py-2 px-3 outline-none"
								id="projectTitle"
								onChange={(e) => setSkills(e.target.value)}
								placeholder="Skills"
								required
							/>
						</div>
					</div>

					<div className="mb-3 flex flex-col  w-full">
						<label for="serviceDesc" className="mb-1 font-bold text-start">
							Description
						</label>
						<CKEditor
							data={description}
							onChange={(e) => setDescription(e.editor.getData())}
							// config={{toolbar: editorToolbar}}
							className="w-full bg-bgclr rounded py-2 px-3 outline-none"
							required
						/>
					</div>

					<div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
						<button
							type="submit"
							className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg"
							disabled={isSending}
						>
							{isSending ? "Adding..." : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
