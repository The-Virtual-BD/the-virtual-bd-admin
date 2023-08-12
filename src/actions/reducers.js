import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchBloggerApplication, fetchBlogs, fetchCategory, fetchComments, fetchEmailSubs, fetchJobAppli, fetchJobPost, fetchNewsLetter, fetchNotices, fetchPortfolio, fetchQuery, fetchReviews, fetchServices, fetchSubscription, fetchUsers } from "./dataFetching";

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
    const { data: emailSubs, isLoading: emailSubsLoading } = useQuery("emailSubs", fetchEmailSubs);
    const { data: newsLetter, isLoading: newsLetterLoading } = useQuery("newsLetter", fetchNewsLetter);
    const { data: services, isLoading: servicesLoading } = useQuery("services", fetchServices);

    const { data: portfolio, isLoading: portfolioLoading } = useQuery("portfolio", fetchPortfolio);
    const { data: subscription, isLoading: subscriptionLoading } = useQuery("subscription", fetchSubscription);

    const { data: users, isLoading: usersLoading } = useQuery("users", fetchUsers);
    const { data: comments, isLoading: commentsLoading } = useQuery("comments", fetchComments);
    const { data: notices, isLoading: noticesLoading } = useQuery("notices", fetchNotices);

    const { data: query, isLoading: queryLoading } = useQuery("query", fetchQuery);
    const { data: reviews, isLoading: reviewsLoading } = useQuery("reviews", fetchReviews);

    // console.log(users)


    const value = {
        isproject, setIsproject, menuOpen, setMenuOpen, isAddPermission, setIsAddPermission, isAddService, setIsAddService, addNotice, setAddNotice, user, setUser, addCategory, setAddCategory, addRole, setAddRole, addNewsLetter, setAddNewsLetter, addEmailSubs, setAddEmailSubs, addCareer, setAddCareer,
        categories, categoriesLoading, blogs, blogsLoading, bloggerReq, bloggerReqLoading, jobs, jobsLoading, jobAppli, jobAppliLoading, emailSubs, emailSubsLoading, newsLetter, newsLetterLoading, services, servicesLoading,portfolio,portfolioLoading,subscription,subscriptionLoading,users,usersLoading,comments,commentsLoading,notices,noticesLoading,query,queryLoading,reviews,reviewsLoading
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