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

export const GetUserProfile = (id) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/userprofiles/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [])

    return data
}

export const GetNetworkWorks = async (id, page) => {
    try {
        const res = await axios.get(`${BaseUrl}/networkss/${id}?page=${page}&size=8`)
        return res.data
    } catch (err) {
        console.log(err)
        throw err
    }
}



export const GetGendres = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/gendres`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [])

    return data
}

export const GetGendreWorks = async (id, page) => {
    try {
        const res = await axios.get(`${BaseUrl}/genres/${id}?page=${page}&size=8`)
        return res.data
    } catch (err) {
        console.log(err)
        throw err
    }
}






export const GetMovies = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/movies`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [])

    return data
}














export const GetSeasons = (serieid) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/seasons/serie/${serieid}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [serieid])

    return data
}

export const GetEpisodes = (seasonId) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/episodes/season/${seasonId}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [seasonId])

    return data
}





export const SearchFun = (term) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/search?title=${term}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [term])

    return data
}





export const GoTop = (title) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        title && (document.title = title)
    }, [title])
}