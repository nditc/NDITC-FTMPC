'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { Suspense } from 'react';
import { LuLogIn } from 'react-icons/lu';
import { auth } from '@/config/firebase';
import { FiUser } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const Route = usePathname();
  const Params = useSearchParams();
  const navRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(800);
  const [userAuth, loading, error] = useAuthState(auth);

  useEffect(() => {
    const stateHandler = () => {
      setShowOptions(false);
    };
    const handleClickOutside: EventListener = (e) => {
      if (navRef.current && e.target instanceof Node && !navRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    const listener = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setShowOptions(false);
      }
    };
    setShowOptions(false);

    listener();

    window.addEventListener('hashchange', stateHandler);
    window.addEventListener('resize', listener);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('hashchange', stateHandler);
      window.removeEventListener('resize', listener);
    };
  }, [Route, Params]);

  return (
    <Suspense>
      <nav
        ref={navRef}
        className={
          'bg-white fixed max-w-[100vw] w-full top-0 z-50 start-0 border border-gray-200 ' +
          (showOptions ? 'border-transparent' : '')
        }
      >
        <div className="container flex flex-wrap  items-center justify-between mx-auto py-4 px-1 relative">
          <Link
            href="/"
            onClick={() => {
              setShowOptions(false);
            }}
            className="flex items-center  z-50 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/Images/FTMPC.svg"
              className="h-12 max-w-[7.5rem] xsm:max-w-36 object-contain"
              alt="NDITC Logo"
              width={512}
              height={512}
            />
          </Link>
          <div className="flex md:order-2 space-x-3   z-50 md:space-x-0 rtl:space-x-reverse">
            {userAuth ? (
              <Link
                href="/profile"
                type="button"
                className="before:ease relative bg-primary_dark text-sm flex items-center overflow-hidden border Inter   shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary before:transition-all before:duration-300 hover:text-white hover:before:-rotate-180 text-white  font-ShareTechTown focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg  px-4 md:px-2 lg:px-4 py-2 text-center"
              >
                <FiUser className="w-5 h-5 xsm:w-4 xsm:h-4 xsm:mr-2 z-10" />
                <span className="relative z-10 hidden xsm:inline">PROFILE</span>
              </Link>
            ) : (
              <Link
                href="/login"
                type="button"
                className="before:ease relative bg-primary_dark text-sm flex items-center overflow-hidden border Inter   shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-primary before:transition-all before:duration-300 hover:text-white hover:before:-rotate-180 text-white  font-ShareTechTown focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg  px-4 md:px-2 lg:px-4 py-2 text-center"
              >
                <LuLogIn className="w-5 h-5 xsm:w-4 xsm:h-4 xsm:mr-2 z-10" />
                <span className="relative z-10 hidden xsm:inline">LOGIN</span>
              </Link>
            )}
            <button
              onClick={() => setShowOptions(!showOptions)}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {showOptions ? (
                <RxCross2 className={'w-6 h-6'} />
              ) : (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            style={{
              transformOrigin: 'top',
            }}
            className={`items-center justify-between bg-white w-screen md:flex z-30  md:w-auto md:order-1 transition ${
              showOptions || windowWidth >= 768 ? 'scale-y-100 ' : 'scale-y-0 pointer-events-none'
            } ${windowWidth < 768 ? 'fixed top-[72px] pb-5 left-0 border-b border-gray-200' : ''}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col gap-1 items-center Inter md:gap-0  container  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-5 lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li className="w-full md:w-auto text-center">
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="/"
                  className={
                    'block py-2 px-3  text-gray-900 rounded md:hover:bg-transparent md:hover:text-secondary   md:p-0' +
                    ' ' +
                    (Route === '/'
                      ? 'bg-primary text-white hover:bg-primary_dark md:bg-transparent  md:text-secondary'
                      : 'md:text-black hover:bg-gray-200 md:bg-transparent')
                  }
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="w-full md:w-auto text-center">
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="/#about"
                  className={
                    'block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent   md:hover:text-secondary md:p-0' +
                    ' ' +
                    (Route === '/about'
                      ? 'bg-primary text-white hover:bg-primary_dark  md:bg-transparent  md:text-secondary'
                      : 'md:text-black hover:bg-gray-200 md:bg-transparent')
                  }
                >
                  About
                </Link>
              </li>
              <li className="w-full md:w-auto text-center">
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="/#rules"
                  className={
                    'block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent   md:hover:text-secondary md:p-0' +
                    ' ' +
                    (Route === '/about'
                      ? 'bg-primary text-white hover:bg-primary_dark  md:bg-transparent  md:text-secondary'
                      : 'md:text-black hover:bg-gray-200 md:bg-transparent')
                  }
                >
                  Rules
                </Link>
              </li>
              {/* <li>
                <Hover
                  setShowOption={() => setShowOptions(false)}
                  text="Activities"
                  showOptions={showOptions}
                  windowWidth={windowWidth}
                />
              </li> */}

              <li className="w-full md:w-auto text-center">
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="/#Contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-secondary md:p-0"
                >
                  Contact
                </Link>
              </li>
              <li className="w-full md:w-auto text-center">
                <Link
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  href="https://init.nditc.net"
                  className={
                    'block py-2 px-3 text-primary rounded-lg md:rounded-none md:hover:bg-transparent border-2 md:border-0 md:border-b-2 border-primary md:border-secondary  md:hover:text-secondary md:p-0' +
                    ' ' +
                    (Route === '/'
                      ? 'bg-primary text-white hover:bg-primary_dark  md:bg-transparent  md:text-secondary'
                      : 'md:text-primary hover:bg-primary hover:text-white md:bg-transparent')
                  }
                >
                  INIT 4.0
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
