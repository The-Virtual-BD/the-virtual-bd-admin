import { baseURL } from "../components/utilities/url";

const getToken = window.localStorage.getItem("token");
const headers = {
	Authorization: `Bearer ${getToken}`,
	"Content-Type": "application/json",
};

// Fetch Category
export const fetchCategory = async () => {
	const res = await fetch(`${baseURL}/api/categories/catlist`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Blogs
export const fetchBlogs = async () => {
	const res = await fetch(`${baseURL}/api/admin/posts`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Blogger Application
export const fetchBloggerApplication = async () => {
	const res = await fetch(`${baseURL}/api/admin/bloggerApplication`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.blogger;
};

// Fetch Blogger Job POst
export const fetchJobPost = async () => {
	const res = await fetch(`${baseURL}/api/admin/vaccancies`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Job Application
export const fetchJobAppli = async () => {
	const res = await fetch(`${baseURL}/api/admin/jobapplications`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Email Subscribe
export const fetchEmailSubs = async () => {
	const res = await fetch(`${baseURL}/api/admin/newsSubscriber`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Newsletter
export const fetchNewsLetter = async () => {
	const res = await fetch(`${baseURL}/api/admin/newsletters`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Services
export const fetchServices = async () => {
	const res = await fetch(`${baseURL}/api/admin/services`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Portfolio
export const fetchPortfolio = async () => {
	const res = await fetch(`${baseURL}/api/admin/projects`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};

// Fetch Subscription
export const fetchSubscription = async () => {
	const res = await fetch(`${baseURL}/api/admin/subscriptions`, {
		headers: headers,
	});
	const data = await res.json();
	return data?.data;
};
