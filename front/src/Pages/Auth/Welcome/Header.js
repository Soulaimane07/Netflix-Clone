import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../../Components.js/Variables'
import { useDispatch, useSelector } from 'react-redux';
import { changeLange } from '../../../Components.js/Redux/Slices/UserSlice';

function Header({LanguagePath}) {
    const dispatch = useDispatch()
    const ChangeLang = (e) => {
        dispatch(changeLange(e.target.value))
    }

    const lang = useSelector((state) => state.user.language);

    
  return (
    <header style={{ backgroundImage: `url(../assets/images/welcome_bg.webp)`}} className='flex flex-col Header h-screen'>
        <nav className='flex space-x-6 justify-end px-20 py-8 items-stretch'>
            <li className='flex bg-primary rounded-md overflow-hidden pr-2'>
                <p className='px-6 py-2'> {LanguagePath.pages.landing.chooseLang} </p>
                <select onChange={ChangeLang} className=' bg-primary px-6 pl-2 py-2 outline-none'> 
                    <option selected={lang === "en"} value={LanguagePath.other.languages.en}> {LanguagePath.other.languages.english} </option>
                    <option selected={lang === "fr"} value={LanguagePath.other.languages.fr}> {LanguagePath.other.languages.french} </option>
                    <option selected={lang === "ar"} value={LanguagePath.other.languages.ar}> {LanguagePath.other.languages.arabic} </option>
                </select> 
            </li>
            <li className='hover:scale-110 transition-all flex items-center bg-primary  cursor-pointer rounded-md hover:bg-myorange'>
                <Link className=" px-12 h-full items-center flex" to="/login"> {LanguagePath.other.buttons.login} </Link>
            </li>
        </nav>

        <article className='flex-1 flex items-center justify-center'>
            <section className=' justify-center flex flex-col'>
                <img src={logo} alt="logo" className='w-80 mx-auto mb-10' />
                <p className=' text-3xl w-2/3 text-center mx-auto mb-8'> {LanguagePath.pages.landing.header} </p>
                <Link className="bg-primary w-1/3 mx-auto text-center px-6 py-4 transition-all hover:scale-105 cursor-pointer rounded-md hover:bg-myorange" to="/register"> 
                    {LanguagePath.other.buttons.signupnow}
                </Link>
            </section>
        </article>
    </header>
  )
}

export default Header