import React, { HTMLInputTypeAttribute } from 'react';
import { regDataInit, regDataType } from '@/db/registerData';

type props = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  state: string | number;
  setValue: (name: string, data: string | number) => void;
  notRequired?: boolean;
};

const Field = ({ name, label, type, state, setValue, notRequired }: props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 ml-2 font-medium" htmlFor={name}>
        {label}
        {notRequired ? ' (Optional)' : ''}:
      </label>
      <input
        className="px-5 py-3 border-gray-200 rounded-xl border focus:border-primary focus:outline-none"
        onChange={(e) => setValue(name, e.target.value)}
        value={state}
        type={type}
        name={name}
        required={!notRequired}
        placeholder={label}
      />
    </div>
  );
};

export default Field;
