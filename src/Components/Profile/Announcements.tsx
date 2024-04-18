import { db } from '@/config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';
import { GrAnnounce } from 'react-icons/gr';
import { toast } from 'react-toastify';
const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  useEffect(() => {
    getDocs(query(collection(db, 'announcements'), orderBy('order')))
      .then((docs) => {
        const annc: any[] = [];
        docs.forEach((data) => {
          annc.push(data.data());
        });
        annc.reverse();
        setAnnouncements(annc);
      })
      .catch((err) => {
        toast.error("Announcements can't be loaded");
        console.error(err);
      });
  }, []);
  return (
    <div className="container pt-6  p-5 md:p-8 pb-2 md:pb-4 bg-white rounded-xl my-4 md:my-8">
      <div className="ml-2 flex gap-3  items-center">
        <GrAnnounce className="w-8 h-8 xsm:w-10 xsm:h-10 text-primary" />
        <h1 className="text-3xl mt-1 xsm:text-4xl leading-none ">ANNOUNCEMENTS</h1>
      </div>
      <div className="flex flex-col gap-5 my-5 max-h-[550px]  overflow-y-scroll overflow-x-clip">
        {announcements.map((data: any, index: number) => {
          return (
            <div className="p-5 bg-gray-100 rounded-xl" key={index}>
              <h3 className="text-xl Nunito font-bold">{data.title}</h3>
              <p className="min-h-[80px] md:min-h-0">{data.description}</p>

              <div className="justify-end text-sm flex gap-2 mt-2 items-center text-zinc-500 Nunito">
                <BsClock className="w-4 h-4 text-zinc-500" />
                {new Date(data.timestamp.seconds * 1000).toDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
