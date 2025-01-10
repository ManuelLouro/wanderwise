import Calendar2 from "../components/reactcalendar.tsx"
import { NavBar } from "../components/ui/navbar.tsx"
import FixedButton from "../components/fixedbutton.tsx";
import { Calendar } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { CalendarProps } from "../components/ui/calendar.tsx";

const CalendarPage:React.FC = () => {
    const handleClick = () => {
        console.log('Hamburger button clicked');
      };

    return (
        <>
        <NavBar></NavBar>
        <div className="flex">
            <div>
                <h1 className=" bg-black text-white"> Your calendar: </h1>
            <Calendar></Calendar>
            </div>
        <FixedButton onClick={handleClick}></FixedButton>
        </div>
        </>
    )
}
export default CalendarPage


