import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';
import { GrAnnounce } from 'react-icons/gr';
const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  useEffect(() => {
    getDocs(collection(db, 'announcements')).then((docs) => {
      const annc: any[] = [];
      docs.forEach((data) => {
        annc.push(data.data());
      });
      setAnnouncements(annc);
    });
  }, []);
  return (
    <div className="container  max-h-[100vh] overflow-y-scroll p-6 md:p-8 pb-2 md:pb-4 bg-white rounded-xl my-8">
      <div className="flex gap-5 items-center">
        <GrAnnounce className="w-12 h-12 text-primary" />
        <h1 className="text-4xl">
          <span className="">ANNOUNCEMENTS</span>
        </h1>
      </div>
      <div className="flex flex-col gap-5 my-5">
        {announcements.map((data: any, index: number) => {
          return (
            <div className="p-5 bg-gray-100 rounded-xl" key={index}>
              <h3 className="text-xl Nunito font-bold">{data.title}</h3>
              <p>{data.description}</p>
              <p className="justify-end text-sm flex gap-2 mt-2 items-center text-zinc-500">
                <BsClock className="w-4 h-4 text-zinc-500" />
                {new Date(data.timestamp.seconds * 1000).toDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
