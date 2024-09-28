import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboardlayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../../components/ChatList/ChatList";


const Dashboardlayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, navigate, userId]);
  if (!isLoaded) return "Loading.....";
  return (
    <div className="dashboardlayout">
      <div className="menu"><ChatList/></div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboardlayout;
