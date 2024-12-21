import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useALlEvents = () => {
    const {data : allEvents = [], refetch: allEventsRefetch} = useQuery({
        queryKey: ['allEvents'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-events`);
            return res.data
        },
    }
    )

    return [allEvents, allEventsRefetch]
};

export default useALlEvents;