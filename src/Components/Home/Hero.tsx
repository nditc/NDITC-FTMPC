import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <section className="relative w-full min-h-screen  flex flex-col md:flex-row justify-center md:justify-between items-center pt-[90px] over">
        <h1 className="md:hidden tracking-wide lg:tracking-widest text-2xl 2xl:text-3xl w-fit  font-medium text-center md:text-left">
          Welcome to
        </h1>
        <div className=" flex flex-col md:max-w-[40vw] lg:max-w-[35vw] items-center md:items-start gap-1 order-2 md:order-1">
          <h1 className="md:block hidden tracking-wide lg:tracking-widest text-2xl 2xl:text-3xl w-fit  font-medium text-center md:text-left">
            Welcome to
          </h1>
          <h1 className="tracking-wide mt-2 md:mt-0 lg:tracking-widest text-4xl md:text-5xl 2xl:text-7xl  font-medium text-center md:text-left text-black">
            <span className="text-primary">FTMPC</span> 4.0
          </h1>

          <p className="mt-3 text-base 2xl:text-[1.375rem] md:max-w-[90%]  2xl:leading-8  break-words w-[85vw] md:w-fit text-center md:text-left Nunito">
            Dive headfirst into the code arena! NDITC&apos;s FTMPC 4.0 is your chance to clash with
            fellow tech minds. This contest throws down coding challenges that will transform you
            into a programming warrior.
          </p>

          <a
            href="/register"
            className="hover:border-secondary_light before:ease relative flex items-center justify-center  overflow-hidden shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-secondary_light before:duration-300 hover:shadow-secondary_light hover:text-primary_dark hover:before:h-64 hover:before:-translate-y-32 Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-primary bg-primary text-white border-primary  hover:bg-zinc-700 rounded-lg"
          >
            <span className="relative z-10">REGISTER NOW</span>
          </a>
        </div>
        <Image
          src={'/Images/FTMPC-Banner.svg'}
          alt={'Image'}
          className="relative w-[90%] xsm:w-[70%] my-[4vh] md:mb-0 md:w-[50%] max-w-[850px] md:max-h-[70vh] object-contain order-1 md:order-2"
          width={850}
          height={850}
        />
        {/* <img src="/Images/bg.png" className="absolute bottom-[-4vh] right-0 -z-10" alt="" /> */}
      </section>
      <section className="w-screen h-fit pt-16 pb-16 object-cover  bg-top tech-bg  text-center md:text-lg">
        <div className="container leading-7">
          <h1 className="mx-auto mb-5 md:mb-8 ">
            <span className="text-4xl md:text-5xl text-center text-primary">KEEP EYES</span>
            {'  '}
            <span className=" ml-1 text-4xl md:text-5xl text-center">ON </span>{' '}
          </h1>
          <div className="mt-5 grid place-items-center">
            <img
              src={'/Images/roadmap.svg'}
              alt={'Image'}
              className="hidden md:block w-full max-w-[650px]"
            />
            <img
              src={'/Images/roadmap-sm.svg'}
              alt={'Image'}
              className="block md:hidden w-full max-w-[410px]"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
