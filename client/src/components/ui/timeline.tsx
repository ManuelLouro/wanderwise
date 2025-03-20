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
  pdfUrl?: string;
};

type TimelineProps = {
  events: Event[];
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  if (events.length === 0) return null; // Prevents rendering empty timeline

  return (
    <VerticalTimeline>
      {events.map((event) => (
        <VerticalTimelineElement
          key={event.id}
          date={event.date || "No date"}
          iconClassName="bg-customTeal text-white"
          icon={<div></div>}
        >
          <div>
            <h3 className="text-lg font-bold">{event.name}</h3>
            <h4 className="text-sm font-semibold">
              {event.location || "No location"}
            </h4>
            <p>{event.description || "No description"}</p>

            {event.pdfUrl && (
              <a
                href={`http://localhost:3000${event.pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-500 underline ml-40"
              >
                View PDF
              </a>
            )}
          </div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
