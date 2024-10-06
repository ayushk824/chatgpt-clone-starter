import { useMutation, useQueryClient } from '@tanstack/react-query'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const queryClient = useQueryClient()
 const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn:(text)=>{
       return fetch(`${import.meta.env.VITE_API_URL}/api/chats`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({ text})
      }).then((res)=> res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigation(`/dashboard/chats/${id}`)
    },

  })
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
   mutation.mutate(text);

  }
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