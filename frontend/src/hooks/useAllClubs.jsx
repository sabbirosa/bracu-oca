import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllClubs = () => {
    const {data : allClubs = [], refetch: allClubsRefetch, isLoading} = useQuery({
        queryKey: ['allClubs'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-clubs`);
            return res.data
        },
    }
    )

    return [allClubs, allClubsRefetch, isLoading]
};

export default useAllClubs;