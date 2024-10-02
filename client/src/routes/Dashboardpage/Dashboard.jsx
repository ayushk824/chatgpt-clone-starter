import './Dashboard.css'
import { useAuth } from "@clerk/clerk-react";


const Dashboard = () => {
  const { userId }= useAuth();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    await fetch(`http://localhost:3000/api/chats`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({ text})
    });

  };
  return (
    <div className='dashboard'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>
            SAPPHIRE.AI
          </h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a new chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze The Image</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form  onSubmit={handleSubmit}>
          <input type='Text' name='text' placeholder='Start Conversation with me.........'/>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard