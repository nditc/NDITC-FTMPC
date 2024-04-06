'use client';
import React, { useState } from 'react';
import Member from './Home/Member';

const FAQS = [
  {
    title: 'Why FTMPC 4.0',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur cumque aliquid obcaecati perferendis magnam ducimus! Perferendis illo voluptatum modi dolores, animi quam porro corporis fuga eos eligendi exercitationem ad possimus labore deserunt dolor optio nemo consequatur repudiandae quod adipisci culpa, quos magnam libero. Esse id ipsa laboriosam neque! In, itaque!',
  },
  {
    title: 'Why FTMPC 4.0',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur cumque aliquid obcaecati perferendis magnam ducimus! Perferendis illo voluptatum modi dolores, animi quam porro corporis fuga eos eligendi exercitationem ad possimus labore deserunt dolor optio nemo consequatur repudiandae quod adipisci culpa, quos magnam libero. Esse id ipsa laboriosam neque! In, itaque!',
  },
  {
    title: 'Why FTMPC 4.0',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur cumque aliquid obcaecati perferendis magnam ducimus! Perferendis illo voluptatum modi dolores, animi quam porro corporis fuga eos eligendi exercitationem ad possimus labore deserunt dolor optio nemo consequatur repudiandae quod adipisci culpa, quos magnam libero. Esse id ipsa laboriosam neque! In, itaque!',
  },
];
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);
  //here index starts from 1. 0 means all closed
  return (
    <section className="w-screen h-fit pt-16 pb-16 object-cover  text-center">
      <div className="container">
        <h1 className="mx-auto mb-5 md:mb-8 ">
          <span className="text-4xl md:text-5xl text-center">FREQUENTLY ASKED </span>{' '}
          <br className="inline md:hidden" />
          <span className="text-primary text-4xl md:text-5xl text-center">QUESTIONS </span>{' '}
        </h1>
        {FAQS.map((data, index) => (
          <div key={index}>
            <h2 className="text-xl font-extrabold Nunito">
              <button
                onClick={() => setOpenIndex((s) => (s === 0 ? index + 1 : 0))}
                type="button"
                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${
                  index !== FAQS.length - 1 || openIndex === index + 1 ? 'border-b-0' : ''
                } border-gray-200 ${
                  index === 0
                    ? 'rounded-t-xl'
                    : index === FAQS.length - 1 && openIndex !== index + 1
                    ? 'rounded-b-xl'
                    : ''
                } focus:ring-4 focus:ring-gray-200    hover:bg-gray-100  gap-3`}
              >
                <span>{data.title}</span>
                <svg
                  className={`w-3 h-3 ${
                    openIndex === index + 1 ? 'rotate-180' : '-rotate-90'
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div>
              <div
                style={{
                  display: openIndex === index + 1 ? 'block' : 'none',
                }}
                className={`p-5 border transition-all ${
                  index !== FAQS.length - 1 ? 'border-b-0' : 'rounded-b-xl'
                } border-gray-200  overflow-hidden`}
              >
                <p className="mb-2 text-gray-500">{data.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
