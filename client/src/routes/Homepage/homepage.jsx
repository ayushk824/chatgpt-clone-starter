import './homepage.css'
import{Link} from "react-router-dom";
const Homepage = () => {
  return (
    <div className='homepage'>
      <img src="/backg.jpg" alt="" className='backg' />
      <div className="left">
        <h1>SAPPHIRE.AI</h1>
        <h2>Super charge your Creativity and Productivity</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis saepe, minima voluptatem blanditiis voluptatum ipsa, quos ad doloribus 

        </h3>
        <  Link to = "/dashboard">Get Started</ Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"> </div>
          </div>
          <img src="/bot.png" alt="" className='bot'/>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" className='imgk' />
        <div className="links">
          <Link to = "/">Terms of service</Link>
          <span>|</span>
          <Link to = "/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage