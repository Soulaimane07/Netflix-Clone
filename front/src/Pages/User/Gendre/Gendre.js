import Navbar from '../Navbar/Navbar'
import { GetGendreWorks, GoTop } from '../../../Components.js/Functions'
import { useParams } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'
import WorkSkeleton from '../../../Components.js/Work/WorkSkeleton'
import { useEffect, useRef, useState } from 'react'

function Gendre() {
  GoTop("Movify | More than you'd ever imagine")

    let {id} = useParams()

    let items = [1,2,3,4,5,6,7,8]

    const [works, setWorks] = useState([])
    const [genre, setGenre] = useState(null)
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [endReached, setEndReached] = useState(false) 

    const loadMoreRef = useRef(null)

    useEffect(() => {
        if (endReached) return

        setIsLoading(true)
        GetGendreWorks(id, page).then(data => {
            if (data.works.length === 0) {
                setEndReached(true) 
            } else {
              console.log(data);
              
                setGenre(data.gendre)
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
    <div className=' text-mywhite bg-primary min-h-screen'>
        <Navbar />
        
        <div className='pt-14 pb-32 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10 '> {genre?.title} </h1>

            <div className=' grid grid-cols-4  px-40 gap-4 '>
              {works?.map((item,key)=>(
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

export default Gendre