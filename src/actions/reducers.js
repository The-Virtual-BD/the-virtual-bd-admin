import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchBloggerApplication, fetchBlogs, fetchCategory, fetchJobAppli, fetchJobPost } from "./dataFetching";

export const APPContext = createContext();

const DataCollection = ({ children }) => {
    const [isproject, setIsproject] = useState(false);
    const [isAddPermission, setIsAddPermission] = useState(false);
    const [isAddService, setIsAddService] = useState(false);
    const [addNotice, setAddNotice] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [addRole, setAddRole] = useState(false);
    const [addNewsLetter, setAddNewsLetter] = useState(false);
    const [addEmailSubs, setAddEmailSubs] = useState(false);
    const [addCareer, setAddCareer] = useState(false);
    const [menuOpen, setMenuOpen] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUserStr = localStorage.getItem("user");
        if (getUserStr) {
            const getUser = JSON.parse(getUserStr);
            //    console.log(getUser);
            setUser(getUser);
        }
    }, []);


    const { data: categories, isLoading: categoriesLoading } = useQuery("categories", fetchCategory);
    const { data: blogs, isLoading: blogsLoading } = useQuery("blogs", fetchBlogs);
    const { data: bloggerReq, isLoading: bloggerReqLoading } = useQuery("bloggerReq", fetchBloggerApplication);

    const { data: jobs, isLoading: jobsLoading } = useQuery("jobs", fetchJobPost);
    const { data: jobAppli, isLoading: jobAppliLoading } = useQuery("jobAppli", fetchJobAppli);
    //  const { data: reviews, isLoading: reviewsLoading } = useQuery("reviews", fetchReview);


    const value = {
        isproject, setIsproject, menuOpen, setMenuOpen, isAddPermission, setIsAddPermission, isAddService, setIsAddService, addNotice, setAddNotice, user, setUser, addCategory, setAddCategory, addRole, setAddRole, addNewsLetter, setAddNewsLetter, addEmailSubs, setAddEmailSubs, addCareer, setAddCareer,
        categories, categoriesLoading, blogs, blogsLoading, bloggerReq, bloggerReqLoading, jobs, jobsLoading, jobAppli, jobAppliLoading
    }

    return <APPContext.Provider value={value}>
        {children}
    </APPContext.Provider>

};

//Create Hooks for send data
export const useCollection = () => {
    const context = useContext(APPContext);
    return context;
};

export default DataCollection;