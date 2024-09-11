import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { GetNetworkWorks, GoTop } from '../../../Components.js/Functions'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'
import WorkSkeleton from '../../../Components.js/Work/WorkSkeleton'

function Network() {
  GoTop("Movify | The greatest stories, all in one place")
  let items = [1,2,3,4,5,6,7,8]

    let { id } = useParams()

    const [works, setWorks] = useState([])
    const [network, setNetwork] = useState(null)
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [endReached, setEndReached] = useState(false) 

    const loadMoreRef = useRef(null)

    useEffect(() => {
        if (endReached) return

        setIsLoading(true)
        GetNetworkWorks(id, page).then(data => {
            if (data.works.length === 0) {
                setEndReached(true) 
            } else {
                setNetwork(data.network)
                setWorks(prevWorks => [...prevWorks, ...data.works])
            }
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }, [id, page, endReached])


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading && !endReached) {
                setPage(prevPage => prevPage + 1) // Load next page
            }
        }, {
            rootMargin: '200px', // Trigger 200px before hitting the bottom
        })

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current)
            }
        }
    }, [isLoading, endReached])

    return (
        <div className='text-mywhite bg-primary min-h-screen'>
            <Navbar />

            <div className='min-h-screen pb-32'>
                <Header network={network} />

                <div className='grid grid-cols-4 px-40 gap-4 mt-14'>
                  {works?.map((item, key) => (
                      <Work item={item} key={key} />
                  ))}
                    
                    {isLoading &&
                        items.map(key => (
                            <WorkSkeleton key={key} />
                        ))
                    }
                </div>

                {!endReached && <div ref={loadMoreRef} style={{ height: '20px' }}></div>}
            </div>

            <Footer />
        </div>
    )
}

export default Network;
