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

const NewsLetter = () => {
	const { addNewsLetter } = useContext(APPContext);
	return <div>{addNewsLetter ? <AddNewsLetter /> : <ViewNewsLetter />}</div>;
};

export default NewsLetter;

const ViewNewsLetter = () => {
	const [token] = useToken();
	const navigate = useNavigate();

	const { newsLetter, newsLetterLoading } = useCollection();

	if (newsLetterLoading) {
		return <Loading />;
	}

	if (!newsLetterLoading && newsLetter?.length === 0) {
		return <p>No Newsletter is Avaiable</p>;
	}
	const sortNewsLetter = [...newsLetter].reverse();

	const handleNewslettersView = (id) => {
		console.log("clicked", id);
		navigate(`/admin-dashboard/newsletter/${id}`);
	};

	const handleNewslettersEdit = (id) => {
		console.log("clicked", id);
		navigate(`/admin-dashboard/newsletter/update/${id}`);
	};

	//Handle Delete NEWSLETTER
	const handleDeleteNewsletters = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			const userUrl = `${baseURL}/api/admin/newsletters/destroy/${id}`;
			fetch(userUrl, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message) {
						toast.success(data.message);
					} else {
						console.log(data.message);
						toast.error("Newsletter Delete Failed");
					}
				});
		}
	};

	const SERVICE_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Subject",
				accessor: "subject",
				sortType: "basic",
			},

			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { id } = row.original;
					return (
						<div className="flex  items-center justify-center  gap-2 ">
							<button onClick={() => handleNewslettersView(id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg  " />
								</div>
							</button>
							<button onClick={() => handleNewslettersEdit(id)}>
								<div className="w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center">
									<RiEditBoxFill className="text-lg  text-white" />
								</div>
							</button>

							<button onClick={() => handleDeleteNewsletters(id)}>
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
			{newsLetter?.length && (
				<Table
					columns={SERVICE_COLUMNS()}
					data={sortNewsLetter}
					headline={"All Newsletter"}
				/>
			)}
		</div>
	);
};

const AddNewsLetter = () => {
	const [token] = useToken();

	const [link, setLink] = useState("");
	const [image, setImage] = useState(null);
	const [text, setDescription] = useState("");
	const [subject, setSubject] = useState("");
	const [isSending, setIsSending] = useState(false);

	//Handle Add Services
	const handleAddNewsletterForm = async (e) => {
		e.preventDefault();
		setIsSending(true);

		const serviceData = new FormData();
		serviceData.append("link", link);
		serviceData.append("image", image, image.name);
		serviceData.append("text", text);
		serviceData.append("subject", subject);

		const url = `${baseURL}/api/admin/newsletters/store`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: serviceData,
		});

		const result = await response.json();

		if (result.message) {
			console.log(result);
			toast.success(result.message);
			e.target.reset();
			setDescription("");
			setIsSending(false);
		} else {
			console.log(result.error);
			toast.error("Newsletter Add Failed");
			setIsSending(false);
		}
	};

	if (isSending) {
		return <Sending />;
	}

	return (
		<div className="text-labelclr p-3 m-3 bg-white rounded-md ">
			<div>
				<h3 className="px-3 text-2xl font-bold text-center  lg:text-start my-2">
					Add Newsletter
				</h3>

				<form className="p-3" onSubmit={handleAddNewsletterForm}>
					<div className="mb-3 flex flex-col items-start w-full">
						<label for="projectTitle" className="font-bold mb-1">
							Subject
						</label>
						<input
							type="text"
							className="w-full bg-bgclr rounded py-2 px-3 outline-none"
							id="projectTitle"
							onChange={(e) => setSubject(e.target.value)}
							placeholder="Add Subject"
						/>
					</div>

					<div className="mb-3 flex flex-col items-start w-full">
						<label for="projectTitle" className="font-bold mb-1">
							Link
						</label>
						<input
							type="text"
							className="w-full bg-bgclr rounded py-2 px-3 outline-none"
							id="projectTitle"
							onChange={(e) => setLink(e.target.value)}
							placeholder="Add Link"
						/>
					</div>

					<div className="mb-3 flex flex-col items-start w-full">
						<label for="img" className="font-bold mb-1">
							Image
						</label>
						<input
							className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr outline-none focus:outline-none"
							type="file"
							id="img"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>

					<div className="mb-3 flex flex-col  w-full">
						<label for="serviceDesc" className="mb-1 font-bold text-start">
							Description
						</label>
						<CKEditor
							// data={description}
							onChange={(e) => setDescription(e.editor.getData())}
							// config={{toolbar: editorToolbar}}
							className="w-full bg-bgclr rounded py-2 px-3 outline-none"
						/>
					</div>

					<div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
						<button
							type="reset"
							className="px-10 font-bold py-2 bg-white border border-blue hover:bg-blue hover:border-blue hover:text-white text-blue rounded-lg "
						>
							Reset
						</button>

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
