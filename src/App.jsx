import './App.css';
import bg from './assets/BG.png';

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

  return (
    <>
      <main>
        <img className='bgImg' src={bg} alt="" srcset="" width={750}/>

        <header>
          <h1>Tervetuloa.</h1>
        </header>

        <section className='left'>
          <h1>Tänään ruokana:</h1>

          <div className='food-box'>

          </div>
        </section>

        <section className='right'>
          <h1>Päivän lämpötila:</h1>

          <div className='weather-box'>

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
