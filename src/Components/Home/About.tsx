import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section className="w-screen bg-no-repeat bg-cover bg-bottom  relative my-auto" id="about">
      <section className="w-screen bg-image bg-no-repeat bg-cover bg-bottom  relative my-auto">
        {' '}
        <section className="flex flex-col container items-center my-auto">
          <div className="flex flex-col-reverse md:flex-row gap-8 text-[#ffffffbe] text-base 2xl:text-lg Nunito pt-12 pb-8 items-center">
            <div className="flex-1 pb-5">
              <h1 className="text-[2.55rem] pt-5 md:text-5xl mb-5 text-white">
                ABOUT <span className="text-secondary">FTMPC 4.0</span>
              </h1>
              <p className="flex-1">
                NDITC INIT 4.0 is set to blow your mind with a lineup of thrilling events designed
                to challenge and inspire. Whether you&apos;re into the high-energy action of Robo
                Wars or the brain-teasing puzzles of Programming Contests, there&apos;s something
                here for every tech enthusiast. And if sports are more your style, we&apos;ve got
                unique twists like Spot N Go and Soccer Wheels to get your heart pumping and your
                competitive spirit soaring. But wait, there&apos;s more! We&apos;ve pulled out all
                the stops to make NDITC INIT 4.0 an unforgettable experience. Get ready for amazing
                prizes that&apos;ll leave you speechless and bragging rights that&apos;ll make your
                friends jealous. So, mark May 2–May 4, 2023, on your calendars, as NDITC INIT 4.0 is
                set to deliver to you one of the county&apos;s top college-level technology-based
                festivals, and it&apos;s going to be epic.
              </p>
            </div>
            <div className="w-full flex-1 md:w-1/2 rounded-xl h-full shadow">
              <Image
                width={750}
                height={750}
                className="w-full object-cover  md:min-h-[410px] max-h-[50vh]  rounded-xl h-full"
                src="/Images/abt.jpg"
                alt=""
              ></Image>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-[#ffffffbe] text-base 2xl:text-lg Nunito pb-12 pt-8 items-center">
            <div className="w-full flex-1 md:w-1/2 rounded-xl h-full shadow">
              <Image
                width={750}
                height={750}
                className="w-full object-cover  md:min-h-[410px] max-h-[50vh]  rounded-xl h-full"
                src="/Images/abt.jpg"
                alt=""
              ></Image>
            </div>
            <div className="flex-1 pb-5">
              <h1 className="text-[2.55rem] pt-5 md:text-5xl mb-5 text-white">
                ABOUT <span className="text-secondary">FTMPC 4.0</span>
              </h1>
              <p className="flex-1">
                NDITC INIT 4.0 is set to blow your mind with a lineup of thrilling events designed
                to challenge and inspire. Whether you&apos;re into the high-energy action of Robo
                Wars or the brain-teasing puzzles of Programming Contests, there&apos;s something
                here for every tech enthusiast. And if sports are more your style, we&apos;ve got
                unique twists like Spot N Go and Soccer Wheels to get your heart pumping and your
                competitive spirit soaring. But wait, there&apos;s more! We&apos;ve pulled out all
                the stops to make NDITC INIT 4.0 an unforgettable experience. Get ready for amazing
                prizes that&apos;ll leave you speechless and bragging rights that&apos;ll make your
                friends jealous. So, mark May 2–May 4, 2023, on your calendars, as NDITC INIT 4.0 is
                set to deliver to you one of the county&apos;s top college-level technology-based
                festivals, and it&apos;s going to be epic.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default About;
