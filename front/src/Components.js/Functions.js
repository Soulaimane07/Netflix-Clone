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

export const GetNetworks = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/networks`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [])

    return data
}

export const GetUserProfiles = (userId) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/users/getProfiles/${userId}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [userId])

    return data
}