'use client';
import ArchiveData from '@/data/archive';
import Link from 'next/link';
import React from 'react';
import { BiArchive } from 'react-icons/bi';

const Page = ({ params }: { params: { type: string } }) => {
  return (
    <div className="py-28  md:py-32  bg-[#F6F6F6] min-h-[100vh]">
      <h1 className="text-4xl md:text-5xl container pl-2">
        <BiArchive className="w-8 h-8 md:w-12 md:h-12 text-primary inline mr-3" />
        <span>FTMPC </span> <span className="text-primary">| </span>
        <span className="text-secondary">ARCHIVE</span>
      </h1>
      {ArchiveData.map((data, index) => (
        <div key={index} className="container   p-6  bg-white rounded-xl my-6">
          <div className="flex flex-wrap gap-5 items-center justify-between">
            <div className="flex gap-2 items-center">
              <h1 className="text-4xl leading-none">
                FTMPC <span className="text-primary">{data.ver}</span>{' '}
                <span className="text-xl">{data.year}</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <Link
                target="_blank"
                href={data.practise}
                className="hover:bg-primary_dark hover:text-white  justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
              >
                Practise Contest
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
