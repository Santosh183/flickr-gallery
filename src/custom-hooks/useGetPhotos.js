import { useState, useEffect } from "react";
import axios from "axios";

function useGetPhotos(url) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(url, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [url]);

    return { loading, data, error };
}
export default useGetPhotos;