import React, { FormEvent, useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import Field from '@/Components/Field';
import Select from '@/Components/Select';
import { FiUser } from 'react-icons/fi';
import { classes, regDataType } from '@/config/registerData';
import { LiaTimesSolid } from 'react-icons/lia';
import { CgSpinner } from 'react-icons/cg';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

interface props {
  userData: any;
  setUserData: React.Dispatch<any>;
}

const EditData = ({ userData, setUserData }: props) => {
  const [editUserData, setEditUserData] = useState<any>();
  const [editin, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userAuth] = useAuthState(auth);
  const setValue = (fname: string, value: string | number) => {
    setEditUserData((s: regDataType) => ({ ...s, [fname]: value }));
  };
  useEffect(() => {
    setEditUserData(userData);
  }, [userData]);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (userAuth) {
      try {
        await updateDoc(doc(db, 'participants', userAuth.uid), editUserData);
        setUserData(editUserData);
        toast.success('Data Updated!');
        setEditing(false);
      } catch (err) {
        console.error(err);

        toast.error('Aww Snap!');
      }
    }
    setLoading(false);
  };
  return (
    <div className="container w-full bg-white rounded-xl flex pt-3 pb-8 mb-4 sm:py-0 sm:mt-8">
      {editUserData ? (
        <form className="grid grid-cols-1 gap-5 w-full p-5 sm:p-12" onSubmit={submitHandler}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <FiUser className="w-12 h-12 text-primary" />
              <h1 className="text-4xl">
                <span className="text-primary">USER</span> DATA
              </h1>
            </div>
            <div>
              {editin ? (
                <button
                  type={'button'}
                  onClick={() => {
                    setEditing(false);
                  }}
                  className="bg-secondary_light text-primary_dark  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary hover:bg-primary hover:text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                >
                  <LiaTimesSolid className="w-6 h-6" />
                  Stop Editing
                </button>
              ) : (
                <button
                  type={'button'}
                  onClick={() => {
                    setEditing(true);
                  }}
                  className="hover:bg-primary_dark hover:text-white  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
                >
                  <FaRegEdit className="w-6 h-6" />
                  Edit Data
                </button>
              )}
            </div>
          </div>
          <p>Click on Edit to edit your information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <Field
              state={editUserData.name}
              setValue={setValue}
              name="name"
              label="Full Name"
              type="text"
              editable={editin}
            />
            <Select
              selected={editUserData.class}
              values={classes}
              setValue={setValue}
              name="class"
              label="Class"
              editable={editin}
            />
            <Field
              state={editUserData.institution}
              setValue={setValue}
              name="institution"
              label="Institution"
              type="text"
              editable={editin}
            />
            <Field
              state={editUserData.mobile}
              setValue={setValue}
              name="mobile"
              label="Mobile No."
              type="tel"
              editable={editin}
            />
            <Field
              state={editUserData.address}
              setValue={setValue}
              name="address"
              label="Present Address"
              type="text"
              editable={editin}
            />
            <Field
              state={editUserData.gurdianName}
              setValue={setValue}
              name="gurdianName"
              label="Gurdian Name"
              type="text"
              editable={editin}
            />
            <Field
              state={editUserData.gurdianMobile}
              setValue={setValue}
              name="gurdianMobile"
              label="Gurdian Mobile"
              type="tel"
              editable={editin}
            />
            <Field
              state={editUserData.fbLink}
              setValue={setValue}
              name="fbLink"
              label="Facebook Profile Link"
              type="text"
              editable={editin}
              notRequired
            />
            <Field
              state={editUserData.codeforcesHandle}
              setValue={setValue}
              name="codeforcesHandle"
              label="Codeforces Handle"
              type="text"
              editable={editin}
              notRequired
            />{' '}
          </div>
          {editin ? (
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
                  'Update Data'
                )}
              </button>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default EditData;
