/* eslint-disable @next/next/no-img-element */
'use client';

import { auth, db } from '@/config/firebase';
import { classes, regDataType } from '@/config/registerData';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { MdLockReset } from 'react-icons/md';
import { FaRegEdit, FaRegTrashAlt, FaTimes } from 'react-icons/fa';

import Link from 'next/link';

import { useAuthState } from 'react-firebase-hooks/auth';
import EditData from '@/Components/Profile/EditData';
import ProfilePic from '@/Components/Profile/ProfilePic';
import { update } from 'firebase/database';
import { IoIosPower } from 'react-icons/io';
import Announcements from '@/Components/Profile/Announcements';
import { CgSpinner } from 'react-icons/cg';
import Error from '@/Components/Error';

const Page = () => {
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [userAuth, loading, error] = useAuthState(auth);
  const [dLoading, setDLoading] = useState(true);
  const Route = useRouter();
  useEffect(() => {
    auth.currentUser?.reload();
    if (userAuth) {
      fetch('/api/admin', {
        method: 'POST',
        body: JSON.stringify({ id: userAuth.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          console.log(resp);
          if (resp.auth) {
            Route.push('/admin');
          }
        })
        .catch((err) => {
          toast.error('Something went wrong');
        });
    }
    if (userAuth && userAuth.emailVerified) {
      const docRef = doc(db, 'participants', userAuth.uid);

      updateDoc(docRef, { verified: true })
        .then(() => {
          getDoc(doc(db, 'participants', userAuth.uid))
            .then((docs) => {
              setUserData(docs.data());
              setDLoading(false);
            })
            .catch((err) => {
              toast.error('Something Happenned!');
              setDLoading(false);
            });
        })
        .catch((err) => {
          toast.error('Something Happenned!');
          setDLoading(false);
        });
    } else if (userAuth && !userAuth?.emailVerified) {
      setUserData(null);
      setDLoading(false);
      Route.push('/verify');
    } else if (!loading) {
      setUserData(null);
      setDLoading(false);
      Route.push('/login');
    }
  }, [Route, userAuth, loading]);
  const logOut = () => {
    setDLoading(true);

    auth.signOut();
  };

  return (
    <>
      {userData ? (
        <div className="py-28  md:py-36 grid bg-[#F6F6F6] min-h-[100vh]">
          <div className="">
            <div className="flex container justify-between  flex-col xl:flex-row gap-4  mb-4">
              <div className="flex-1 flex flex-col md:flex-row  text-center md:text-left justify-start items-center gap-8">
                <ProfilePic
                  imageUrl={userData.imageUrl}
                  setImage={(url: string) => {
                    setUserData((s: regDataType) => ({ ...s, imageUrl: url }));
                  }}
                />
                <div className="">
                  <p className="text-lg mb-1">Welcome Back!</p>
                  <h1 className="text-4xl md:text-5xl text-primary">{userData.name}</h1>
                  <h2 className="text-xl md:text-2xl  Nunito">{userData.email}</h2>
                  <div className="flex  gap-2 mt-4">
                    <button
                      onClick={logOut}
                      className="bg-white text-primary_dark justify-center text-sm flex-1  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary hover:bg-primary hover:text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                    >
                      <IoIosPower className="w-8 h-8" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 py-6 flex xl:ml-16 rounded-xl items-center justify-center bg-secondary_lighter text-primary_dark">
                Contest Details Coming Soon
              </div>
            </div>
            <Announcements />
            <EditData userData={userData} setUserData={setUserData} />
            <h1 className="text-4xl container my-5 mt-8">
              SPECIAL <span className="text-primary">ACTIONS</span>
            </h1>
            <div className="flex  container gap-2">
              <Link
                href="/reset-password"
                className="bg-white text-primary_dark  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary hover:bg-primary hover:text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
              >
                <MdLockReset className="w-8 h-8" />
                Reset Password
              </Link>
              <Link
                href="/delete-account"
                className="bg-white text-red-600 text-sm flex-1 transition-colors justify-center  focus:ring-2 focus:ring-red-300  hover:bg-red-600 hover:text-white px-5 py-2 inline-flex items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
              >
                <FaRegTrashAlt className="w-6 h-6" /> Delete Account
              </Link>
            </div>
          </div>
        </div>
      ) : loading || dLoading ? (
        <div className="grid place-items-center w-full h-screen">
          <CgSpinner className="mx-auto w-16 h-16 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid place-items-center w-full h-screen"></div>
      )}
    </>
  );
};

export default Page;
