"use client";

import { FaCode } from "react-icons/fa";
import Member from "@/Components/Home/Member";
import DevData from "./developers";
import { useState } from "react";
import Modal from "./Modal";

const Developer = () => {
  const [modalState, setModalState] = useState<[string, number] | null>(null);
  return (
    <div className="w-full  bg-[#F6F6F6]">
      <Modal modalState={modalState} setModalState={setModalState} />
      <div className=" container min-h-[100vh] py-[125px] relative flex flex-col">
        <div className="flex mt-0 md:mt-12 items-center md:items-start gap-3 xsm:gap-5">
          <div className="rounded-full aspect-square   bg-white  shadow-[5px_5px_20px_10px_#00000024] md:mb-3">
            <FaCode className="w-14 xsm:w-16 sm:w-20 h-16 sm:h-20 text-white bg-black rounded-full p-3 m-5 hover:-rotate-90 transition-all" />
          </div>
          <div>
            <div className=" flex flex-col md:flex-row gap-0 md:gap-3 justify-start md:justify-start items-start md:items-end">
              <h1 className="text-4xl md:text-6xl pb-1 md:pb-2">MEET OUR</h1>
              <h1 className="text-5xl sm:text-6xl md:text-8xl text-primary">
                DEVELOPERS
              </h1>
            </div>
            <p className="pt-3  hidden md:block text-lg">
              We would like to thank our amazing developers who worked hard to
              create this website. They have shown great skill, creativity, and
              dedication in bringing our vision to life. They have overcome many
              challenges and delivered a high-quality product that we are proud
              of. We appreciate their efforts and contributions to our success.
            </p>
          </div>
        </div>
        <p className="pt-3 mt-4 md:hidden text-base">
          We would like to thank our amazing developers who worked hard to
          create this website. They have shown great skill, creativity, and
          dedication in bringing our vision to life. They have overcome many
          challenges and delivered a high-quality product that we are proud of.
          We appreciate their efforts and contributions to our success.
        </p>
        {Object.entries(DevData).map(([title, members]) => {
          const titleArr = title.split(" ");
          const first = titleArr?.splice(0, 1);
          const last = titleArr?.join(" ") + " ";
          return (
            <>
              <div className="mt-14 md:mt-16  flex flex-col md:flex-row gap-0 md:gap-3 justify-start md:justify-start items-start md:items-end">
                <h1 className="text-4xl md:text-5xl text-primary">{first}</h1>
                <h1 className="text-4xl md:text-5xl ">{last}</h1>
              </div>
              <div className="flex pt-2 mt-4 md:mt-5   grid-fluid-fill-[275px] md:grid-fluid-fill-[250px] flex-wrap gap-4 md:gap-8  justify-start">
                {members.map(
                  ({ name, post, image_url, dept, imageInCenter }, index) => (
                    <div
                      className=""
                      key={index}
                      onClick={() => {
                        setModalState([title, index]);
                      }}
                    >
                      <Member
                        hasClickHandler={true}
                        imgInCenter={imageInCenter}
                        img={image_url}
                        name={name}
                        designation={post}
                        department={dept}
                        hoverText="Click for Details"
                      />
                    </div>
                  )
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Developer;
