import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GenerateNumber, GetRanSerie, GetSeriesGenres, GoTop } from '../../../Components.js/Functions'

function Series() {
  GoTop("Movify | Watch Hit TV Series")

  const [serie, setSerie] = useState({});

  useEffect(() => {
    const fetchSerie = async () => {
        let randomId = GenerateNumber(1, 10);
        let serieData = await GetRanSerie(randomId);

        while (!serieData) {
            randomId = GenerateNumber(1, 10);
            serieData = await GetRanSerie(randomId);
        }

        setSerie(serieData);
    };

    fetchSerie();
  }, []);

  let series = GetSeriesGenres()


  return (
    <div className=' text-mywhite bg-primary min-h-screen'>
      <Navbar />

      <div className='pb-32'>
        <Header item={serie} type={"serie"} />
        
        <div className='min-h-screen'> 
            <Gendres />
            <GendresVer data={series} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Series