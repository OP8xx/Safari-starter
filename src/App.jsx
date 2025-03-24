import './App.css';
import bg from './assets/BG.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import dayjs from 'dayjs';

import wilma from './assets/wilma.png';
import moodle from './assets/moodle.png';
import sanoma from './assets/sanoma.png';
import otava from './assets/otava.png';
import office from './assets/office.png';
import googledrive from './assets/googledrive.png';
import mafy from './assets/mafy.png';

import next from './assets/next.png';
import { setDay } from 'date-fns';

const Link = (props) => {
  return (
    <a className='link' href={props.link} rel="noreferrer">
      <img src={props.img} alt="" srcset="" width={props.width} style={props.style}/>
    </a>
  )
}

function App() {

  const [food, setFood] = useState('')
  const [longFood, setLongFood] = useState('')
  const [weather, setWeather] = useState('')
  const [emoji, setEmoji] = useState('')
  const [clicked, setClicked] = useState('foodMenuHidden');
  const [lunchtime, setLunchtime] = useState('');
  const [daysLeft, setDaysLeft] = useState('');

  const today = new Date();
  const day = today.getDay()

  const targetDate = dayjs('2025-07-07');
  const [td, setTd] = useState(null);

  useEffect(() => {
    setTd(dayjs())
  }, [])

  function calculateDaysLeft() {
    const daysLeft = targetDate.diff(td, 'day');
    setDaysLeft(daysLeft);
  }

  useEffect(() => {
    calculateDaysLeft()
  }, [td])



  function getLunchtime() {
    if (day == 1 || day == 3) {
      setLunchtime('11:00')
    }
    else if (day == 2 || day == 4) {
      setLunchtime('12:30')
    }
    else if (day == 5) {
      setLunchtime('11:00')
    }
  }

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

  const handleClick = () => {
    setClicked('foodMenuOpen');
  }

  const handleBackClick = () => {
    setClicked('foodMenuHidden');
  }

  function calculateAverage(arr) {
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  };

  axios.get("https://host.clasu.fi/api/v1/aromi.json")
    .then((response) => {
      console.log(response.data.long)
      setFood(response.data.today)
      setLongFood(response.data.long)
      getLunchtime()

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

    const longFoodHtml = longFood.replace(/<br>/g, '<hr>');

  return (
    <>
      <main>
        <img className='bgImg' src={bg} alt="" srcset="" width={750}/>

        <header>
          <h1> <Typewriter
                  options={{
                  strings: ['2 / 25: ' + daysLeft + ' päivää'],
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
            <img onClick={handleClick} className='expand' src={next} alt="" srcset="" width={30}/>

            <p className='food-schedule'>Tänään ruokailu klo: <b>{lunchtime}</b></p>
          </div>
        </section>

        <section className='right'>
          <h1>Päivän lämpötila:</h1>
          <div className='weather-box'>
            <p className='weather-item'>Keskimäärin {emoji} {weather} °</p>
          </div>
        </section>

        <section className={clicked}>
          <div className='header'>
            <img onClick={handleBackClick} className='back' src={next} alt="" width={30}/>
            <h1>Pitempi ruokalista</h1>
          </div>

          <div className='longFoodMenu'>
            <p className='food-item' dangerouslySetInnerHTML={{ __html: longFoodHtml }} />
          </div>
        </section>

        <footer>
          <Link link="https://edutampere.inschool.fi/!02252016/" img={wilma} width={75} style={{rotate: '-90deg'}}/>
          <Link link="https://moodle.tampere.fi/my/" img={moodle} width={60}/>
          <Link link="https://kampus.sanomapro.fi" img={sanoma} width={60}/>
          <Link link="https://app.mafynetti.fi" img={mafy} width={75}/>
          <Link link="https://opiskelija.otava.fi" img={otava} width={75}/>
          <Link link="https://www.office.com/?auth=2" img={office} width={65}/>
          <Link link="https://drive.google.com/drive/u/3/home" img={googledrive} width={85}/>
        </footer>
      </main>
    </>
  )
}

export default App
