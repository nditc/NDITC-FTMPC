'use client';
import Announcements from '@/Components/Admin/AdminAnnouncements';
import EditConfig from '@/Components/Admin/EditConfig';
import Error from '@/Components/Error';
import { auth, db, pfp } from '@/config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiDownload, BiUpload } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const Page = () => {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [file, setFile] = useState<FileList | null>();
  const [loading, setLoading] = useState<boolean[]>([false, false, false, false, false]);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const fileRef = useRef<HTMLFormElement>(null);
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

  const getAllDocs = async (selected: boolean) => {
    try {
      const loadIndex = selected ? 1 : 0;
      if (adminAuth) {
        setLoadingIndexed(loadIndex, true);
        const data: any = [];
        const x = !selected
          ? await getDocs(query(collection(db, 'participants'), where('verified', '==', true)))
          : await getDocs(
              query(
                collection(db, 'participants'),
                where('verified', '==', true),
                where('selected', '==', true)
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

        const workBook = XLSX.utils.book_new();
        const xlsx = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workBook, xlsx, 'All Participants');

        XLSX.writeFile(workBook, 'Participants.xlsx');

        // setUrl(URL.createObjectURL(blob));

        // setTimeout(() => downloadRef.current?.click(), 3000);
        setLoadingIndexed(loadIndex, false);
        toast.info('Data Downloaded as XLSX');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };
  const uploadResult = (type: 'pre_result' | 'final_result', loadingIndex: number) => {
    if (file && file.length > 0) {
      setLoadingIndexed(loadingIndex, true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = async (e) => {
        try {
          console.log(e.target?.result);
          const workBook = XLSX.read(e.target?.result, { type: 'binary' });
          const json = XLSX.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);
          const upJson: any[] = [];

          for (let i = 0; i < json.length; i++) {
            const userResult: any = json[i];
            const userData = (await getDoc(doc(db, 'participants', userResult.uid))).data();
            console.table(userResult);
            console.log(userData);
            upJson.push({
              name: userData?.name,
              institution: userData?.institution,
              imageUrl: userData?.imageUrl,
              ...userResult,
            });
            await setDoc(doc(db, type, userResult.uid), {
              name: userData?.name || null,
              institution: userData?.institution || null,
              imageUrl: userData?.imageUrl || null,
              ...userResult,
            });
            await updateDoc(doc(db, 'participants', userResult.uid), {
              selected: userResult.selected,
            });
          }
          const uploadBlob = new Blob([JSON.stringify(upJson)], {
            type: 'application/json',
          });
          await uploadBytes(ref(pfp, 'result/' + type), uploadBlob);
          toast.success('Result Uploaded!');
          setLoadingIndexed(loadingIndex, false);
          setFile(null);
          fileRef.current?.reset();
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          setFile(null);
          fileRef.current?.reset();

          setLoadingIndexed(loadingIndex, false);
          return;
        }
      };
    } else {
      toast.error('There are no files!');
    }
  };

  const uploadData = (loadingIndex: number) => {
    if (file && file.length > 0) {
      setLoadingIndexed(loadingIndex, true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = async (e) => {
        try {
          console.log(e.target?.result);
          const workBook = XLSX.read(e.target?.result, { type: 'binary' });
          const json = XLSX.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);
          const upJson: any[] = [];

          for (let i = 0; i < json.length; i++) {
            const userResult: any = json[i];
            const userData = (await getDoc(doc(db, 'participants', userResult.uid))).data();
            console.table(userResult);
            console.log(userData);

            await updateDoc(doc(db, 'participants', userResult.uid), {
              ...userResult,
            });
          }

          toast.success('Result Uploaded!');
          setLoadingIndexed(loadingIndex, false);
          setFile(null);
          fileRef.current?.reset();
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          setFile(null);
          fileRef.current?.reset();

          setLoadingIndexed(loadingIndex, false);
          return;
        }
      };
    } else {
      toast.error('There are no files!');
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
            <h1 className="text-5xl container  mt-8">
              ADMIN <span className="text-primary">PANEL</span>
            </h1>
            <p className="mb-5 mt-3">Click once and wait for at least 15 seconds.</p>

            {/* Downloads */}
            <div className="container   p-6  bg-white rounded-xl my-6">
              <div className="flex flex-wrap gap-5 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <BiDownload className="w-12 h-12 text-primary" />
                  <h1 className="text-4xl leading-none">
                    <span className="">DOWNLOADS</span>
                  </h1>
                </div>
                <div className="flex gap-4">
                  <button
                    disabled={loading[0]}
                    className="hover:bg-primary_dark hover:text-white  justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                    onClick={() => getAllDocs(false)}
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
                    className="hover:bg-primary_dark hover:text-white  justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                    onClick={() => getAllDocs(true)}
                  >
                    {loading[1] ? (
                      <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                    ) : (
                      'All Selected User Data'
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* Uploads */}
            <div className="container  p-6 bg-white rounded-xl my-6">
              <div className="flex flex-wrap  gap-5 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <BiUpload className="w-12 h-12 text-primary" />
                  <h1 className="text-4xl leading-none">
                    <span className="">UPLOADS</span>
                  </h1>
                </div>

                <form ref={fileRef}>
                  <input
                    onChange={(e) => setFile(e.target.files)}
                    className="file:px-5 file:py-3 my-0 "
                    type={'file'}
                  />
                </form>
                <div className="flex gap-4">
                  <button
                    disabled={loading[2]}
                    className="hover:bg-primary_dark hover:text-white   flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                    onClick={() => uploadResult('pre_result', 2)}
                  >
                    {' '}
                    {loading[2] ? (
                      <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                    ) : (
                      'Upload Preliminary Result'
                    )}
                  </button>
                  <button
                    disabled={loading[3]}
                    className="hover:bg-primary_dark hover:text-white   flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                    onClick={() => uploadResult('final_result', 3)}
                  >
                    {' '}
                    {loading[3] ? (
                      <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                    ) : (
                      'Upload Final Result'
                    )}
                  </button>
                  <button
                    disabled={loading[4]}
                    className="hover:bg-primary_dark hover:text-white   flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                    onClick={() => uploadData(4)}
                  >
                    {' '}
                    {loading[4] ? (
                      <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                    ) : (
                      'Upload Data'
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Announcements />
            <EditConfig />
            <div className="flex flex-wrap gap-5">
              <button
                disabled={loading[0]}
                className="hover:bg-primary_dark hover:text-white  text-lg flex-1 justify-center  transition-colors px-5 py-3 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                onClick={() => {
                  auth.signOut();
                  Router.push('/login');
                }}
              >
                Sign Out
              </button>
            </div>
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
