import React from 'react';
import { BiCalendarEvent, BiGift, BiMedal } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { FaLocationDot, FaMoneyBill1Wave } from 'react-icons/fa6';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { SlCalender } from 'react-icons/sl';
import { TbTrophy } from 'react-icons/tb';

const Prize = () => {
  return (
    <div className="w-screen pb-16 pt-12 text-center bg-gray-100">
      <h1 className="mx-auto mb-5 md:mb-8 ">
        <span className="text-4xl md:text-5xl text-center text-primary">PRIZE </span>
        {'  '}
        <span className=" ml-1 text-4xl md:text-5xl text-center">& GIFTS </span>{' '}
      </h1>
      <div className="container">
        <div className=" grid grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 gap-5 ">
          <div className="bg-white sm:row-span-2 flex flex-col  justify-center gap-3 md:gap-4   p-4 md:p-5 pr-8 md:pr-10 rounded-md text-left w-full">
            <div className="  mb-3 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
              <TbTrophy className="text-3xl" />
            </div>

            {/* <div className="bg-primary/50 w-0.5 min-h-[80px]"></div> */}
            <div className="w-full">
              <h3 className="text-2xl Inter font-bold  mb-2">Prize Money</h3>
              <div className="flex  flex-wrap  gap-2 text-2xl ">
                <div className="flex min-w-[200px]  flex-1 gap-2 items-center   rounded-sm">
                  <FaMoneyBill1Wave className="text-2xl text-primary" />
                  <b className="text-primary">16,000 </b>Tk
                </div>
              </div>
              <hr className="my-3"></hr>
              <div className="flex  flex-wrap  gap-2 text-xl ">
                <div className="flex min-w-[200px]  flex-1 gap-2 items-center   rounded-sm">
                  <p>1st Place</p>
                  <b className="text-primary">8,000 </b>Tk
                </div>
              </div>
              <div className="flex  flex-wrap  gap-2 text-lg ">
                <div className="flex min-w-[200px]  flex-1 gap-2 items-center   rounded-sm">
                  <p>2nd Place</p>
                  <b className="text-primary">5,000 </b>Tk
                </div>
              </div>{' '}
              <div className="flex  flex-wrap  gap-2 text-lg ">
                <div className="flex min-w-[200px]  flex-1 gap-2 items-center   rounded-sm">
                  <p>3rd Place</p>
                  <b className="text-primary">3,000 </b>Tk
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white   flex flex-col  justify-center  gap-3 md:gap-4   p-4 md:p-5 pr-8 md:pr-10 rounded-md text-left w-full">
            <div className="  mb-3 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
              <BiGift className="text-3xl" />
            </div>
            <div className="w-full">
              <h3 className="text-2xl Inter font-bold  mb-2">Medal</h3>
              <p>
                Top 10 contestants in National Round wins <b className="text-yellow-500">Gold</b>,{' '}
                <b className="text-gray-500">Silver</b> & <b className="text-orange-900">Bronze</b>{' '}
                Medal.
              </p>
            </div>
          </div>
          <div className="bg-white   flex flex-col  justify-center  gap-3 md:gap-4   p-4 md:p-5 pr-8 md:pr-10 rounded-md text-left w-full">
            <div className="  mb-3 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
              <BiGift className="text-3xl" />
            </div>
            <div className="w-full">
              <h3 className="text-2xl Inter font-bold  mb-2">Gift, Lunch & Certificates</h3>
              <p>
                Every <b>national participant</b> gets <b>Gifts, Lunch, Snacks and Certificates</b>.
                Also Participants in the <b>preliminary round</b> will also get certificate of
                participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prize;
