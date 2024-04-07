'use client';
import Error from '@/Components/Error';
import { db } from '@/config/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getAll } from 'firebase/remote-config';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { CgSpinner } from 'react-icons/cg';

const Page = () => {
  const param = useSearchParams();
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [dataURL, setUrl] = useState<string>('');
  const Router = useRouter();
  const getAllDocs = async () => {
    if (auth) {
      const data: any = [];
      const x = await getDocs(query(collection(db, 'participants'), where('verified', '==', true)));
      x.forEach((doc) => {
        data.push({
          uid: doc.id,
          ...doc.data(),
        });
      });
      let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

      setUrl(URL.createObjectURL(blob));

      setTimeout(() => downloadRef.current?.click(), 3000);
    }
  };
  useEffect(() => {
    fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify({ id: param.get('id'), pass: param.get('pass') }),
    })
      .then((r) => r.json())
      .then((resp) => {
        console.log(resp);
        setAuth(resp.auth || false);
        setLoading(false);
      });
  }, [param]);
  return (
    <>
      {auth ? (
        <div className="min-h-screen w-screen bg-[#f6f6f6]">
          <div className="container pt-[81px]">
            <h1 className="text-4xl container my-5 mt-8">
              ADMIN <span className="text-primary">ACTIONS</span>
            </h1>
            <p>Click once and wait for at least 15 seconds.</p>
            <div className="flex flex-wrap gap-5">
              <button
                className="hover:bg-primary_dark hover:text-white  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                onClick={getAllDocs}
              >
                Download All User Data
              </button>
              <button
                className="hover:bg-primary_dark hover:text-white  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                onClick={getAllDocs}
              >
                Download All Selected User Data
              </button>
            </div>
            <br />
            <a className="hidden" ref={downloadRef} href={dataURL} download={true}>
              Down
            </a>
          </div>
        </div>
      ) : loading ? (
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
