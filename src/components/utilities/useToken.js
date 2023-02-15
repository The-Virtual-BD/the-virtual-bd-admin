import { useEffect } from "react";
import { useState } from "react";

const useToken = () => {
    const [token, setToken] = useState([]);
    useEffect(() => {
       const getToken=window.localStorage.getItem("token");
       setToken(getToken);
    }, []);
    return [token, setToken];
}

export default useToken;