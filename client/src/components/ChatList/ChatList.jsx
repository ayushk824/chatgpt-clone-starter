import { Link } from 'react-router-dom'
import './chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to ="/dashboard">Create a New chat</Link>
        <Link to = "/">Explore SAPPHIRE.AI More</Link>
        <Link to="/">Contact</Link>
        <hr/>
        <span className='title'>RECENT CHATS</span>

        <div className="list">
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
            <Link to ="/">chat Title</Link>
        </div>
        <hr/>
        <div className="upgrade">
            <img src="/logo.png" alt="" />
            <div className="texts">
                <span>Upgrade to Pro Version of SAPPHIRE.AI</span>
                <span>Get unlimited access to all features</span>
            </div>
        </div>



    </div>
  )
}

export default ChatList