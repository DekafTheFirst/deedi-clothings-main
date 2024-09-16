import axios from "axios";
import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";
import Cookies from "universal-cookie"

const cookies = new Cookies();
const jwtToken = cookies.get('jwt_authentication') || null;

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await makeRequest.get(url);
                // console.log('res', res)
                setData(res.data.data)
            } catch (err) {
                // console.log(err)
                setError(err)
            }
            setLoading(false)

        };
        
        fetchData();
    }, [url])

    return { data, loading, error }
}

export default useFetch