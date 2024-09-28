import './chatpage.css'
import NewPrompt from '../../components/NewPrompt/NewPrompt';

const Chatpage = () => {
  
  return (
    <div className='chatpage'>
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Test message from AI</div>
          <div className="message user">Message from User</div>
          <NewPrompt/>
        </div>
      </div>
    </div>
  )
}

export default Chatpage