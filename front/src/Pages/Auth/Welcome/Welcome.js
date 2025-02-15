import React, { useEffect } from 'react'
import Header from './Header'
import Faq from './Faq'
import Footer from '../../../Components.js/Footer'

function Welcome() {
  useEffect(() => {
    document.title = 'Movify | The greatest stories, all in one place';
  }, []);

  return (
    <div className='text-mywhite min-h-screen bg-primary'>
      <Header />
      
      <article className='min-h-screen text-center py-28'>
        <h1 className='text-4xl font-medium mb-3'> Watch the way you want </h1>
        <p className='text-xl font-medium opacity-80 mb-16'> Discover the world's greatest stories, all in one place. </p>
        <img src={'../assets/images/welcome_1.webp'} alt="welcome-1"  className='w-2/3 mx-auto' />
      </article>
      
      <article className='min-h-screen text-center py-28'>
        <h1 className='text-4xl font-medium mb-3'> Exclusive originals </h1>
        <p className='text-xl font-medium opacity-80 mb-16'> TV series, movies and documentaries you can't see anywhere else, from the world's greatest storytellers. </p>
        <img src='../assets/images/welcome_2.webp' alt="welcome-2" className='w-2/3 mx-auto' />
      </article>

      <Faq />
      <Footer />
    </div>
  )
}

export default Welcome