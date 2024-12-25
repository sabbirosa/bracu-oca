import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useCurrentUser = () => {
    const {user} = useContext(AuthContext)

    const mail = user?.email;

    const {data : currentUser = {}, refetch: currentUserRefetch} = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/current-user/${mail}`);
            return res.data
        },
    }
    )

    return [currentUser, currentUserRefetch]
};

export default useCurrentUser;