import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mb-8 flex flex-col md:flex-row justify-center md:justify-between items-center pt-[90px] over">
      <h1 className="md:hidden tracking-wide lg:tracking-widest text-2xl 2xl:text-3xl w-fit  font-medium text-center md:text-left">
        Welcome to
      </h1>
      <div className=" flex flex-col md:max-w-[40vw] lg:max-w-[35vw] items-center md:items-start md:gap-1 order-2 md:order-1">
        <h1 className="md:block hidden tracking-wide lg:tracking-widest text-2xl 2xl:text-3xl w-fit  font-medium text-center md:text-left">
          Welcome to
        </h1>
        <h1 className="md:block hidden tracking-wide lg:tracking-widest text-5xl 2xl:text-7xl  font-medium text-center md:text-left text-black">
          <span className="text-primary">FTMPC</span> 4.0
        </h1>
        <Image
          width={450}
          height={100}
          src={'/Images/schedule.svg'}
          alt={'Image'}
          className="relative w-full max-w-[95%] md:max-w-[450px] mt-3 mb-2"
        />
        <p className="mt-3 text-base 2xl:text-[1.375rem]   2xl:leading-8  break-words w-[85vw] md:w-fit text-center md:text-left Nunito">
          Get ready to shake off the ordinary and dive into an exciting new world with INIT 4.0!
          Brought to you by the Notre Dame Information Technology Club.
        </p>

        <a
          href="/about"
          className="hover:border-secondary_light before:ease relative flex items-center justify-center  overflow-hidden shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-secondary_light before:duration-300 hover:shadow-secondary_light hover:text-primary_dark hover:before:h-64 hover:before:-translate-y-32 Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-primary bg-primary text-white border-primary  hover:bg-zinc-700 rounded-lg"
        >
          <span className="relative z-10">REGISTER NOW</span>
        </a>
      </div>
      <Image
        src={'/Images/bg.png'}
        alt={'Image'}
        className="relative w-[80%] xsm:w-[65%] mb-4 md:mb-0 md:w-[45%] max-w-[500px] md:max-h-[70vh] object-contain order-1 md:order-2"
        width={850}
        height={850}
      />
      {/* <img src="/Images/bg.png" className="absolute bottom-[-4vh] right-0 -z-10" alt="" /> */}
    </section>
  );
};

export default Hero;
