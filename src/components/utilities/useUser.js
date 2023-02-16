/* import { useEffect } from "react";
import { useState } from "react";

const useUser = () => {
    const [user, setUser] = useState([]);
   //  console.log(user)
    useEffect(() => {
       const getUserStr=localStorage.getItem("user");
       if(getUserStr){
         const getUser= JSON.parse(getUserStr);
         //    console.log(getUser);
            setUser(getUser);
       }
      

    }, []);
    return [user, setUser];
}

export default useUser; */