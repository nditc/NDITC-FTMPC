'use client';

import Field from '@/Components/Field';
import React, { useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/db/firebase';

import { deleteUser, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, DocumentReference, deleteDoc } from 'firebase/firestore';

const Page = () => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (UserCred) => {
        const UserInfo = UserCred.user;
        try {
          await sendEmailVerification(UserInfo);
          toast.success('Verfication Email Sent! Verify and Login.');
          Router.push('/login');
        } catch (err) {
          console.error(err);
          toast.error('Aww! Snap!');
        }
      })
      .catch((error) => {
        console.dir(error);
        switch (error.code) {
          case 'auth/invalid-credential':
            toast.error(`Invalid email or password.`);
            break;
          default:
            console.error(error.message);
            toast.error('Aww! Snap!');
            break;
        }
        setLoading(false);
      });
  };
  return (
    <div className="w-screen shadow-lg  shadow-secondary mt-[81px] bg-image md:min-h-[calc(100vh_-_81px)] grid place-items-center">
      <div className="container-login w-full bg-white sm:rounded-xl flex pt-3 pb-8 sm:py-0 sm:my-16 min-h-[70vh]">
        <form
          className="flex flex-col grid-cols-1 gap-5 w-full lg:w-1/2 p-5 sm:p-12 justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl">
            ACCOUNT <span className="text-primary">RE-VERIFY</span>
          </h1>
          <p className="text-base">Give you credential to get verification mail again.</p>
          <div className="flex flex-col gap-5 w-full">
            <Field
              state={email}
              setValue={(name, data) => setEmail(String(data))}
              name="email"
              label="E-mail"
              type="email"
            />
            <Field
              state={password}
              setValue={(name, data) => setPassword(String(data))}
              name="Password"
              label="Password"
              type="password"
            />{' '}
            <div className="justify-self-end w-full md:w-auto">
              <button
                style={{
                  pointerEvents: loading ? 'none' : 'auto',
                }}
                className="bg-primary rounded-xl text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {loading ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-secondary_light mx-auto" />
                ) : (
                  'Re-Verify'
                )}
              </button>
            </div>
          </div>
        </form>
        <Image
          alt="login"
          className={'hidden lg:block w-1/2 rounded-xl m-5'}
          src="/Images/abt_bg.png"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;
