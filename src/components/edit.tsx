"use client";

import { useDispatch } from "react-redux";
import { changeBackground, changeTheme } from "@/redux/slices/canvas-slice";
import NewCanvas from "./new-canvas";
import Image from "next/image";

const backgrounds = ["bg-blue-600", "bg-red-600", "bg-gray-800"];

export default function Edit({ closePanel }: { closePanel: any }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="container absolute top-0 p-6 bg-white mx-auto sm:mt-8 sm:rounded-md z-10 shadow-gray-600">
        {/* Header */}
        <div className="flex justify-end">
          <span onClick={closePanel} className="cursor-pointer text-blue-700">
            إغلاق
          </span>
        </div>
        <NewCanvas className="rounded-md mx-auto my-8" />
        <h2 className="text-2xl my-4">الخلفية</h2>
        <div className="py-4 squares">
          {backgrounds.map((background, index) => {
            return (
              <span
                key={index}
                className={background}
                onClick={() => dispatch(changeBackground(background))}
              ></span>
            );
          })}
          <span className="bg-gray-200 flex justify-center items-center">
            مخصص
          </span>
        </div>
        <h2 className="text-2xl my-4 mt-6">السمات</h2>
        <div className="py-4 squares">
          <span
            className="bg-gray-400 flex justify-center items-center"
            onClick={() => dispatch(changeTheme("quotation"))}
          >
            <Image src="/quote.png" alt="quote" width={60} height={60} />
          </span>
          <span
            className="bg-gray-200 flex justify-center items-center"
            onClick={() => dispatch(changeTheme("no-effect"))}
          >
            لا تأثير
          </span>
        </div>
      </div>
      <div
        className="fixed w-full h-screen top-0 left-0 bg-gray-900 opacity-45 z-[7]"
        onClick={closePanel}
      ></div>
    </>
  );
}
