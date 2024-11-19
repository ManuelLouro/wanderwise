import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React from "react";



const Timeline = () => {
      return (
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="19/11/2024"
            iconClassName="bg-customTeal text-white"
            icon={<div></div>}
          >
            <h3 className="text-lg font-bold">Flight</h3>
            <h4 className="text-sm font-semibold">Barcelona - Porto</h4>
            <p>
              El prat llombergat
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="20/11/2024"
            iconClassName="bg-green-300 text-white"
            icon={<div></div>}
          >
            <h3 className="text-lg font-bold">Hotel check in</h3>
            <h4 className="text-sm font-semibold">Porto</h4>
            <p>
        Hotel X
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="x"
            iconClassName="bg-green-300 text-white"
            icon={<div></div>}
          >
            <h3 className="text-lg font-bold">zzz</h3>
            <h4 className="text-sm font-semibold">zzz</h4>
            <p>zzz</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="x"
            iconClassName="bg-green-300 text-white"
            icon={<div></div>}
          >
            <h3 className="text-lg font-bold">zzz</h3>
            <h4 className="text-sm font-semibold">zzz</h4>
            <p>zzz</p>
          </VerticalTimelineElement>
          
        </VerticalTimeline>
      );
    };
    
    export default Timeline;
    

