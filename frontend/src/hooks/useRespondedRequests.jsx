import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useRespondedRequests = () => {
    const {user} = useContext(AuthContext)
    const {data : respondedRequests = [], refetch: respondedRequestsRefetch} = useQuery({
        queryKey: ['responded-events'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/responded-events/${user?.email}`);
            return res.data
        },
    }
    )

    return [respondedRequests, respondedRequestsRefetch]
};

export default useRespondedRequests;