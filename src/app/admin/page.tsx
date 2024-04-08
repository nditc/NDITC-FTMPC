'use client';
import Announcements from '@/Components/Admin/AdminAnnouncements';
import Error from '@/Components/Error';
import { auth, db } from '@/config/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getAll } from 'firebase/remote-config';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'react-toastify';

const Page = () => {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean[]>([false, false]);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [dataURL, setUrl] = useState<string>('');
  const Router = useRouter();

  const setLoadingIndexed = (index: number, state: boolean) => {
    setLoading((s) => {
      const newArr = s.map((itm, ind) => {
        return index === ind ? state : itm;
      });
      return newArr;
    });
  };

  const getAllDocs = async () => {
    try {
      if (adminAuth) {
        setLoadingIndexed(0, true);
        const data: any = [];
        const x = await getDocs(
          query(collection(db, 'participants'), where('verified', '==', true))
        );
        x.forEach((doc) => {
          const temp = doc.data();
          const createdAt = new Date(temp?.timestamp?.seconds * 1000).toString();
          if (temp.timestamp) {
            delete temp.timestamp;
          }
          data.push({
            uid: doc.id,
            createdAt,
            ...temp,
          });
        });
        let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

        setUrl(URL.createObjectURL(blob));

        setTimeout(() => downloadRef.current?.click(), 3000);
        setLoadingIndexed(0, false);
        toast.info('Data Downloaded as JSON');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };
  const getSelectedDocs = async () => {
    try {
      if (adminAuth) {
        setLoadingIndexed(1, true);
        const data: any = [];
        const x = await getDocs(
          query(
            collection(db, 'participants'),
            where('verified', '==', true),
            where('selected', '==', 'true')
          )
        );
        x.forEach((doc) => {
          const temp = doc.data();
          const createdAt = new Date(temp?.timestamp?.seconds * 1000).toString();
          if (temp.timestamp) {
            delete temp.timestamp;
          }
          data.push({
            uid: doc.id,
            createdAt,
            ...temp,
          });
        });
        let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

        setUrl(URL.createObjectURL(blob));

        setTimeout(() => downloadRef.current?.click(), 3000);
        setLoadingIndexed(1, false);
        toast.info('Data Downloaded as JSON');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };
  useEffect(() => {
    if (user && user.email) {
      fetch('/api/admin', {
        method: 'POST',
        body: JSON.stringify({ id: user.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          console.log(resp);
          setAdminAuth(resp.auth || false);
          setAuthLoading(false);
        })
        .catch((err) => {
          toast.error('Something went wrong');
          setAdminAuth(false);
          setAuthLoading(false);
        });
    } else {
      setAdminAuth(false);
      setAuthLoading(false);
    }
  }, [user]);
  return (
    <>
      {adminAuth ? (
        <div className="min-h-screen w-screen bg-[#f6f6f6]">
          <div className="container py-[81px]">
            <h1 className="text-4xl container  mt-8">
              ADMIN <span className="text-primary">ACTIONS</span>
            </h1>
            <p className="mb-5 mt-3">Click once and wait for at least 15 seconds.</p>
            <div className="flex flex-wrap gap-5">
              <button
                disabled={loading[0]}
                className="hover:bg-primary_dark hover:text-white  text-lg flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                onClick={() => {
                  auth.signOut();
                  Router.push('/admin/login');
                }}
              >
                Sign Out
              </button>
            </div>
            <h1 className="text-4xl container  mt-3 mb-3">
              <span className="text-primary">DOWNLOADS</span>
            </h1>
            <div className="flex flex-wrap gap-5">
              <button
                disabled={loading[0]}
                className="hover:bg-primary_dark hover:text-white  text-lg flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                onClick={getAllDocs}
              >
                {' '}
                {loading[0] ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                ) : (
                  'All User Data'
                )}
              </button>
              <button
                disabled={loading[1]}
                className="hover:bg-primary_dark hover:text-white  text-lg flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                onClick={getSelectedDocs}
              >
                {loading[1] ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                ) : (
                  'All Selected User Data'
                )}
              </button>
            </div>
            <br />
            <Announcements />
            <a className="hidden" ref={downloadRef} href={dataURL} download={true}>
              Down
            </a>
          </div>
        </div>
      ) : authLoading ? (
        <div className="grid place-items-center w-full h-screen ">
          <CgSpinner className="mx-auto w-16 h-16 animate-spin text-primary" />
        </div>
      ) : (
        <Error statusCode={403} msg="Unauthorized User" action={() => Router.push('/')} />
      )}
    </>
  );
};

export default Page;
