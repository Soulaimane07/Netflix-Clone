import { GetUserProfiles } from '../../../Components.js/Functions'
import { useDispatch } from 'react-redux'
import { setProfilee } from '../../../Components.js/Redux/Slices/UserSlice'

function Profiles({user, profilee}) {
    const dispatch = useDispatch()
    const userProfiles = GetUserProfiles(user?.id)

  return (
    <div className='mt-20'>
        <h1 className='text-2xl'> Profiles </h1>
        <ul className='flex flex-row  overflow-x-scroll Scroll space-x-4 py-4 scroll-smooth'>
            {userProfiles?.map((item,key)=>(
                <button onClick={()=> dispatch(setProfilee(item))} key={key} className={"hover:scale-105 transition-all"}> 
                    <img src={item.profile} className={`w-28 mb-2 text-white text-center transition-all border-4 border-transparent cursor-pointer rounded-full   p-0 m-0 ${profilee.id === item.id ? "opacity-100 transition-all bg-white" : "opacity-60 transition-all"}`} alt='profile' /> 
                    <h2 className={`${profilee.id === item.id ? "opacity-100 transition-all" : "opacity-60 transition-all"}`}> {item.name} </h2>
                </button>
            ))}
        </ul>
    </div>
  )
}

export default Profiles