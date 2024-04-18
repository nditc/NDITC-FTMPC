import Link from 'next/link';
import React from 'react';
import { BsDownload } from 'react-icons/bs';
import { LuArchive } from 'react-icons/lu';

const Page = () => {
  return (
    <div className="py-28  md:py-32  bg-[#F6F6F6] min-h-[100vh]">
      <h1 className="text-5xl container ">
        <LuArchive className="w-12 h-12 text-primary inline mr-3" />
        <span>ARCHIVES</span>
      </h1>
      <div className={'container mt-8 '}>
        <h2 className="text-4xl ml-2 mb-4">
          2021 <span className="text-secondary">|</span>{' '}
          <span className="text-primary">FTMPC 1.0</span>
        </h2>
        <div className="my-2 text-xl  bg-white rounded-xl p-6 flex justify-between items-center">
          <h3 className="t-xl Nunito font-bold">Practise Round</h3>
          <Link
            href=""
            className="text-primary border-b leading-none  border-transparent Nunito text-semibold hover:border-primary"
          >
            <BsDownload className="w-5 h-5 inline mr-2 pb-1" />
            Download
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
