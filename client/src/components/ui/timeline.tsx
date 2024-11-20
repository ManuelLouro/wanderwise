import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React from "react";



type Event = {
  id: string;
  name: string;
  location?: string;
  description?: string;
  date?: string;
};

type TimelineProps = {
  events: Event[];
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <VerticalTimeline>
      {events.map((event) => (
        <VerticalTimelineElement
          key={event.id}
          date={event.date || "No date"}
          iconClassName="bg-customTeal text-white"
          icon={<div></div>}
        >
          <h3 className="text-lg font-bold">{event.name}</h3>
          <h4 className="text-sm font-semibold">{event.location || "No location"}</h4>
          <p>{event.description || "No description"}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
    

    

