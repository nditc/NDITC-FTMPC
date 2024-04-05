/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Modal from '@/Components/Modal';
import Field from '../Field';
import { CgSpinner } from 'react-icons/cg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, pfp } from '@/db/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { LiaTimesSolid } from 'react-icons/lia';

const ProfilePic = ({ imageUrl, setImage }: { imageUrl: any; setImage: (url: string) => void }) => {
  const [changeImage, setChangeImage] = useState<boolean>();
  const [newImage, setNewImage] = useState<FileList | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const FileRef = useRef<HTMLInputElement>(null);
  const changePfp = () => {
    if (user?.uid && newImage) {
      setLoading(true);
      const storeRef = ref(pfp, 'pfp/' + user.uid);
      uploadBytes(storeRef, newImage[0]).then(async (snapshot) => {
        const url = await getDownloadURL(storeRef);
        await updateDoc(doc(db, 'participants', user.uid), { imageUrl: url });
        setImage(url);
        setLoading(false);
        setNewImage(null);
        setChangeImage(false);
      });
    }
  };
  return (
    <>
      <div
        onClick={() => {
          setChangeImage(true);
        }}
      >
        <Image
          className="rounded-full object-cover w-[200px] h-[200px]  aspect-square shadow-md  bg-white"
          src={imageUrl}
          alt="profile-img"
          width={200}
          height={200}
        />
      </div>
      <Modal state={changeImage}>
        {changeImage ? (
          <div className=" rounded-xl bg-white p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-end">
              <button
                className="text-primary text-right mb-5 font-medium border-b-2 border-transparent hover:border-primary ml-2 flex gap-2 items-center"
                onClick={() => {
                  setChangeImage(false);
                  setNewImage(null);
                }}
              >
                <LiaTimesSolid className="w-4 h-4" />
                Close
              </button>
            </div>
            <h1 className="text-4xl">
              UPLOAD <span className="text-primary">PROFILE PICTURE</span>
            </h1>
            {newImage && newImage[0] ? (
              <img
                className="w-[200px] h-[200px] object-cover rounded-full mx-auto my-2"
                src={URL.createObjectURL(newImage[0])}
                alt=""
              />
            ) : null}
            <input
              onChange={(e) => setNewImage(e.target.files ? e.target.files : null)}
              className="my-5"
              ref={FileRef}
              name="pfp"
              type={'file'}
            />
            <div className="justify-self-end w-full md:w-auto py-3 md:py-0">
              <button
                style={{
                  pointerEvents: loading ? 'none' : 'auto',
                }}
                disabled={newImage && newImage[0] ? false : true}
                className="bg-primary rounded-xl flex justify-center disabled:opacity-80 text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                type="button"
                onClick={changePfp}
              >
                {loading ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-secondary_light" />
                ) : (
                  'Update Data'
                )}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default ProfilePic;
