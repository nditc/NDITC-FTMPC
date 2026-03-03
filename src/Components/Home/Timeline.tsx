import React from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { SlCalender } from 'react-icons/sl';

const TimelineCard = ({
  date,
  venue,
  title,
  time,
  format,
}: {
  date?: string;
  venue?: string;
  title: string;
  time?: string;
  format?: string;
}) => {
  return (
    <div className="bg-secondary_bg md:even:self-end md:even:flex-row-reverse flex shadow-sm  max-w-[700px]  items-center gap-3 md:gap-4   p-4 md:p-5 pr-8 md:pr-10 rounded-md text-left w-full">
      <div className="border-[6px] border-primary/80 text-white rounded-full w-8 h-8 flex items-center justify-center"></div>

      <div className="bg-primary/50 w-0.5 min-h-[80px]"></div>
      <div className="w-full ">
        <h3 className="text-2xl Inter font-bold text-primary mb-2">{title}</h3>
        <div className="flex  flex-wrap  gap-2">
          {date && (
            <div className="flex min-w-[200px]  flex-1 gap-2 items-center   rounded-sm">
              <BiCalendarEvent className="text-xl text-primary/80" />
              <p>{date}</p>
            </div>
          )}
          {venue && (
            <div className="flex min-w-[200px] flex-1  gap-2  items-center   rounded-sm">
              <FaLocationDot className="text-xl text-primary/80" />
              <p>{venue}</p>
            </div>
          )}
          {time && (
            <div className="flex min-w-[200px]  flex-1 gap-2  items-center  rounded-sm">
              <FaClock className="text-xl text-primary/80" />
              <p>{time}</p>
            </div>
          )}
          {format && (
            <div className="flex  min-w-[200px] flex-1 gap-2  items-center   rounded-sm">
              <HiOutlineViewGrid className="text-xl text-primary/80" />
              <p>{format}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="w-screen pb-16 text-center bg-top tech-bg">
      <h1 className="mx-auto mb-5 md:mb-8 ">
        <SlCalender className="inline mr-3 w-8 md:w-10 h-8 md:h-10 align-top text-primary" />
        <span className="text-4xl md:text-5xl text-center text-primary">KEEP EYES</span>
        {'  '}
        <span className=" ml-1 text-4xl md:text-5xl text-center">ON </span>{' '}
      </h1>
      <div className="container">
        <div className="flex flex-col gap-5  max-w-[1100px] mx-auto">
          <TimelineCard title="Registration Deadline" date="7 April, 2026" />
          <TimelineCard
            title="Practice Round"
            date="10 April, 2026"
            time="7:00 PM - 10:00 PM (3 hours)"
            venue="Online"
            format="3 Questions"
          />
          <TimelineCard
            title="Preliminary Round"
            date="11 April, 2026"
            venue="Online"
            time="7:00 PM - 10:00 PM (3 hours)"
            format="6 Questions"
          />
          <TimelineCard
            title="National Round"
            date="08 May, 2026"
            venue="Notre Dame College, Dhaka"
            time="To be announced(3/4 hours)"
            format="6 Questions"
          />
          <TimelineCard title="Prize Giving Ceremony" date="09 May, 2026" time="To be announced" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
