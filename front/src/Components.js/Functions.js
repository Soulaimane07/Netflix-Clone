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

export const GetNetwork = (id) => {
    const [data, setData] = useState({})

    useEffect(()=> {
        axios.get(`${BaseUrl}/networks/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

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

export const GetMoviesByGendre = () => {
    const [data, setData] = useState([]);
    let genres = GetGendres();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await Promise.all(genres.map(async genre => {
                    const res = await axios.get(`${BaseUrl}/movies/gendre/${genre.id}`);
                    return { movies: res.data, genre };
                }));
                setData(moviesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [genres]); 

    return data;
}

export const GetSeriesByGendre = () => {
    const [data, setData] = useState([]);
    let genres = GetGendres();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await Promise.all(genres.map(async genre => {
                    const res = await axios.get(`${BaseUrl}/series/gendre/${genre.id}`);
                    return { movies: res.data, genre };
                }));
                setData(moviesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [genres]); 

    return data;
}

export const GetGendre = (id) => {
    const [data, setData] = useState({})

    useEffect(()=> {
        axios.get(`${BaseUrl}/gendres/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

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

export const GetMovie = (id) => {
    const [data, setData] = useState({})

    useEffect(()=> {
        axios.get(`${BaseUrl}/movies/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

    return data
}

export const GetMoviesByNetwork = (id) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/movies/network/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

    return data
}

export const GetMoviesByGenre = (id) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/movies/gendre/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

    return data
}






export const GetSeries = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/series`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [])

    return data
}

export const GetSerie = (id) => {
    const [data, setData] = useState({})

    useEffect(()=> {
        axios.get(`${BaseUrl}/series/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

    return data
}

export const GetSeriesByNetwork = (id) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/series/network/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

    return data
}

export const GetSeriesByGenre = (id) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/series/gendre/${id}`)
            .then(res => {
                setData(res.data)
            })    
            .catch(err => {
                console.log(err);
            })
    }, [id])

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

export const GenerateNumber = (min, max) => {
    const [num, setNum] = useState(1)

    useEffect(()=> {
        setNum(Math.floor(Math.random() * (max - min + 1)) + min)
    }, [min, max])

    return num
};