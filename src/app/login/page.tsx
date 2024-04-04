'use client';

import Field from '@/Components/Field';
import React, { useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/db/firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';

import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((UserCred) => {
        const UserInfo = UserCred.user;
        if (!UserInfo.emailVerified) {
          auth.signOut();
          toast.error('User not verified!');
          setLoading(false);
        } else {
          toast.success('User logged in!');
          setLoading(false);

          // Router.push('/');
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
            PARTICIPANT <span className="text-primary">Login</span>
          </h1>
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
          </div>
          <div className="flex justify-between">
            <Link
              className="text-primary font-medium border-b-2 border-transparent hover:border-primary ml-2"
              href="/reset-password"
            >
              Reset Password
            </Link>
            <Link
              className="text-primary font-medium border-b-2 border-transparent hover:border-primary mr-2"
              href="/re-verify"
            >
              Verification Expired?
            </Link>
          </div>
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
                'Login'
              )}
            </button>
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
