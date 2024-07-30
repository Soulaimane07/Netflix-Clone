import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GoTop } from '../../../Components.js/Functions';
import Navbar from '../Navbar/Navbar';
import Header from '../../../Components.js/Header/Header';
import Footer from '../../../Components.js/Footer';
import Movie from './Movie';
import { BaseUrl } from '../../../Components.js/Variables';
import Serie from './Serie';

function Work() {
    const {type, id} = useParams()


    const fetchSerie = async (id) => {
      const response = await fetch(`${BaseUrl}/series/${id}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    };
    
    const fetchMovie = async (id) => {
      const response = await fetch(`${BaseUrl}/movies/${id}`);
      if (response.ok) {
        return response.json();
      }
      return null;
    };
    
    const [content, setContent] = useState({});
    
    useEffect(() => {
      const getContent = async () => {
        try {
          if(type=== 'movie'){
            const movie = await fetchMovie(id);
            setContent(movie);
          } 
          if(type === 'serie') {
            const series = await fetchSerie(id);
            setContent(series);
          }
        } catch (err) {
          console.error(err);
        } finally {
        }
      };
      
      getContent();
    }, [id, type]);
    
    GoTop()
    document.title = `${content?.title}  - Disney+` 


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header item={content} type={type} />

        <div className='pb-48'> 
          {type === 'movie' && <Movie data={content} />}
          {type === 'serie' && <Serie data={content} />}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Work