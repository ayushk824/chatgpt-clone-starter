import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a New chat</Link>
      <Link to="/">Explore SAPPHIRE.AI More</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>

      <div className="list">
        <Link>my new </Link>
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong "
          : data?.map((chats) => {
            <Link to ={`/dashboard/chats/${chats._id}`}> 
            {chats.title}
            </Link>
          })}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Pro Version of SAPPHIRE.AI</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
