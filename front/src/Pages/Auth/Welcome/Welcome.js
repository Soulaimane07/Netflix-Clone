import React, { useEffect } from 'react'
import Header from './Header'
import Faq from './Faq'
import Footer from '../../../Components.js/Footer'

function Welcome({LanguagePath}) {
  useEffect(() => {
    document.title = 'Movify | The greatest stories, all in one place';
  }, []);
  

  return (
    <div className='text-mywhite min-h-screen bg-primary '>
      <Header LanguagePath={LanguagePath} />
      
      <article className='min-h-screen text-center py-28'>
        <h1 className='text-4xl font-medium mb-3'> {LanguagePath.pages.landing.box1.title} </h1>
        <p className='text-xl font-medium opacity-80 mb-16'> {LanguagePath.pages.landing.box1.text} </p>
        <img src={'../assets/images/welcome_1.webp'} alt="welcome-1"  className='w-2/3 mx-auto' />
      </article>
      
      <article className='min-h-screen text-center py-28'>
        <h1 className='text-4xl font-medium mb-3'> {LanguagePath.pages.landing.box2.title} </h1>
        <p className='text-xl font-medium opacity-80 mb-16'> {LanguagePath.pages.landing.box2.text} </p>
        <img src='../assets/images/welcome_2.webp' alt="welcome-2" className='w-2/3 mx-auto' />
      </article>

      <Faq LanguagePath={LanguagePath.pages.landing.faq} />
      <Footer />
    </div>
  )
}

export default Welcome