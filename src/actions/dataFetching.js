import { baseURL } from "../components/utilities/url";

const getToken = window.localStorage.getItem("token");
const headers = {
    'Authorization': `Bearer ${getToken}`,
    'Content-Type': 'application/json',
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






