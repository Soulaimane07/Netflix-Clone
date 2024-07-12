import axios from "axios"
import { BaseUrl } from "./Variables"
import { useEffect, useState } from "react"

export const GetProfiles = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/profiles`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [])

    return data
}