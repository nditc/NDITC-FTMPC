'use client';

import Field from '@/Components/Field';
import React, { useReducer, useState } from 'react';
import { regDataInit, regDataType, classes } from '@/db/registerData';
import Select from '@/Components/Select';
import { auth, db } from '@/db/firebase';
import { doc, setDoc } from 'firebase/firestore';

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import verifyData from '@/util/verification';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type actionType = {
  type: 'SET_FIELD';
  name: string;
  data: string | number;
};
const Page = () => {
  const [regData, dispatch] = useReducer<
    (prevState: regDataType, action: actionType) => regDataType
  >((prevState: regDataType, action: actionType) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...prevState, [action.name]: action.data };
      default:
        return { ...prevState };
    }
  }, regDataInit);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const [verified, massage] = verifyData(regData, password, confirmPassword);
    if (verified) {
      //

      createUserWithEmailAndPassword(auth, regData.email, password)
        .then(async (userInfo) => {
          //add userInfo in Collections
          const uid = userInfo.user.uid;
          await setDoc(doc(db, 'participants', uid), {
            ...regData,
            imageUrl:
              'https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86',
          });
          await sendEmailVerification(userInfo.user);
          toast.success('Email verification sent! Please verify your email then login.');
          setLoading(false);
          Router.push('/login');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              toast.error(`Email address already in use.`);
              break;
            case 'auth/invalid-email':
              toast.error(`Email address is invalid.`);
              break;
            case 'auth/operation-not-allowed':
              toast.error(`Error during sign up.`);
              break;
            case 'auth/weak-password':
              toast.error(
                'Password is not strong enough. Add additional characters including special characters and numbers.'
              );
              break;
            default:
              toast.error(error.message.replaceAll('Firebase: ', ''));

              break;
          }
          setLoading(false);
        });
    } else {
      toast.error(massage);
      setLoading(false);
    }
  };
  const setValue = (name: string, data: string | number) => {
    dispatch({ type: 'SET_FIELD', name, data });
  };
  return (
    <div className="w-screen shadow-lg  shadow-secondary mt-[81px] bg-image md:min-h-[calc(100vh_-_81px)] grid place-items-center">
      <div className="container-login w-full bg-white sm:rounded-xl flex pt-3 pb-8 sm:py-0 sm:my-16">
        <form className="grid grid-cols-1 gap-5 w-full p-5 sm:p-12" onSubmit={handleSubmit}>
          <AiOutlineUserAdd className="w-12 h-12 text-primary" />
          <h1 className="text-4xl">
            <span className="text-primary">Registration</span> Form
          </h1>
          <p>
            Please fill out the form below to secure your spot in the contest. We can’t wait to see
            what you’ll bring to the table!{' '}
            <Link
              className="text-primary font-medium border-b-2 border-transparent hover:border-primary inline"
              href="/login"
            >
              Login Instead
            </Link>{' '}
            if you have already registered. By filling out this form you are agreeing, to our terms
            and conditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <Field
              state={regData.name}
              setValue={setValue}
              name="name"
              label="Full Name"
              type="text"
            />
            <Select
              selected={regData.class}
              values={classes}
              setValue={setValue}
              name="class"
              label="Class"
            />
            <Field
              state={regData.institution}
              setValue={setValue}
              name="institution"
              label="Institution"
              type="text"
            />
            <Field
              state={regData.email}
              setValue={setValue}
              name="email"
              label="E-mail"
              type="email"
            />
            <Field
              state={regData.mobile}
              setValue={setValue}
              name="mobile"
              label="Mobile No."
              type="tel"
            />
            <Field
              state={regData.address}
              setValue={setValue}
              name="address"
              label="Present Address"
              type="text"
            />
            <Field
              state={regData.gurdianName}
              setValue={setValue}
              name="gurdianName"
              label="Gurdian Name"
              type="text"
            />
            <Field
              state={regData.gurdianMobile}
              setValue={setValue}
              name="gurdianMobile"
              label="Gurdian Mobile"
              type="tel"
            />
            <Field
              state={regData.fbLink}
              setValue={setValue}
              name="fbLink"
              label="Facebook Profile Link"
              type="text"
              notRequired
            />
            <Field
              state={regData.codeforcesHandle}
              setValue={setValue}
              name="codeforcesHandle"
              label="Codeforces Handle"
              type="text"
              notRequired
            />{' '}
            <Field
              state={password}
              setValue={(name, data) => setPassword(String(data))}
              name="Password"
              label="Password"
              type="password"
            />{' '}
            <Field
              state={confirmPassword}
              setValue={(name, data) => setConfirmPassword(String(data))}
              name="Confirm Password"
              label="Confirm Password"
              type="password"
            />
          </div>
          <div className="justify-self-end w-full md:w-auto py-3 md:py-0">
            <button
              style={{
                pointerEvents: loading ? 'none' : 'auto',
              }}
              className="bg-primary rounded-xl text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
              type="submit"
            >
              {loading ? (
                <CgSpinner className="w-7 h-7 animate-spin text-secondary_light" />
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
