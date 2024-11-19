import { useState } from "react";
//import { Calendar } from "../components/ui/calendar.tsx";
import { NavBar } from "../components/ui/navbar.tsx";
import "../index.css";
import Hamburger from "../components/hamburger.tsx";
import FixedButton from "../components/fixedbutton.tsx";
import Calendar2 from "../components/reactcalendar.tsx";
import { Calendar } from "lucide-react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import Timeline from "../components/ui/timeline.tsx"

const HomePage:React.FC = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log('Hamburger button clicked');
  };

  return (
    <>
    <div>
      <NavBar></NavBar>
    </div>
    <h1></h1>
    <Timeline />
    <FixedButton onClick={handleClick} />
      </>
  );
}

export default HomePage;