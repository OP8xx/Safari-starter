import './App.css';
import bg from './assets/BG.png';
import axios from 'axios';
import { useState } from 'react';
import Typewriter from 'typewriter-effect';

import wilma from './assets/wilma.png';
import moodle from './assets/moodle.png';
import sanoma from './assets/sanoma.png';
import otava from './assets/otava.png';
import office from './assets/office.png';

const Link = (props) => {
  return (
    <a className='link' href={props.link} target="_blank" rel="noreferrer">
      <img src={props.img} alt="" srcset="" width={props.width} style={props.style}/>
    </a>
  )
}

function App() {

  const [food, setFood] = useState('')
  const [weather, setWeather] = useState('')
  const [emoji, setEmoji] = useState('')

  function setWeatherEmoji() {
    if (weather > 25) {
      setEmoji('☀️')
    }
    else if (weather > 15) {
      setEmoji('🌤️')
    }
    else if (weather > 5) {
      setEmoji('☁️')
    }
    else {
      setEmoji('🥶')
    }
  }

  function calculateAverage(arr) {
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }

  axios.get("https://host.clasu.fi/api/v1/aromi.json")
    .then((response) => {
      console.log(response.data.today)
      setFood(response.data.today)
    })
    .catch((error) => {
      console.log(error)
    })

  axios.get("https://api.open-meteo.com/v1/forecast?latitude=61.4991&longitude=23.7871&hourly=temperature_2m&forecast_days=1")
    .then((response) => {
      console.log(response.data.hourly.temperature_2m)
      setWeather(calculateAverage(response.data.hourly.temperature_2m))
      setWeatherEmoji()

    })
    .catch((error) => {
      console.log(error)
    })

  

  return (
    <>
      <main>
        <img className='bgImg' src={bg} alt="" srcset="" width={750}/>

        <header>
          <h1> <Typewriter
                  options={{
                  strings: ['Tervetuloa.'],
                  autoStart: true,
                  loop: true,
                  pauseFor: 100000,
                  delay: 75,
                }}
/></h1>
        </header>

        <section className='left'>
          <h1>Tänään ruokana:</h1>

          <div className='food-box'>
            <p className='food-item' dangerouslySetInnerHTML={{ __html: food }} />
          </div>
        </section>

        <section className='right'>
          <h1>Päivän lämpötila:</h1>
          <div className='weather-box'>
            <p className='weather-item'>Keskimäärin {emoji} {weather} °</p>
          </div>
        </section>

        <footer>
          <Link link="https://edutampere.inschool.fi/!02252016/" img={wilma} width={75} style={{rotate: '-90deg'}}/>
          <Link link="https://moodle.tampere.fi/my/" img={moodle} width={60}/>
          <Link link="https://kampus.sanomapro.fi" img={sanoma} width={60}/>
          <Link link="https://opiskelija.otava.fi" img={otava} width={75}/>
          <Link link="https://www.office.com/?auth=2" img={office} width={65}/>
        </footer>
      </main>
    </>
  )
}

export default App
