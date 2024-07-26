"use client";

import Canvas from "./canvas";
import { useSelector, useDispatch } from "react-redux";
import { changeBackground } from "@/redux/slices/canvas-slice";

const backgrounds = ["bg-blue-600", "bg-red-600", "bg-gray-800"];

export default function Edit({ closePanel }: { closePanel: any }) {
  const { quote, background } = useSelector((state) => (state as any).canvas);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container fixed top-0 p-6 bg-white mx-auto sm:mt-8 sm:rounded-md z-10 shadow-gray-600">
        {/* Header */}
        <div className="flex justify-end">
          <span onClick={closePanel} className="cursor-pointer">
            إغلاق
          </span>
        </div>
        <Canvas
          quote={quote}
          background={background}
          className="rounded-md mx-auto"
        />
        <div className="py-4 squares">
          {backgrounds.map((_background, index) => {
            return (
              <span
                key={index}
                className={_background}
                onClick={() => dispatch(changeBackground(_background))}
              ></span>
            );
          })}
          <span className="bg-gray-200 flex justify-center items-center">
            تعديل
          </span>
        </div>
      </div>
      <div
        className="fixed w-full h-screen top-0 left-0 bg-gray-200 z-[7]"
        onClick={closePanel}
      ></div>
    </>
  );
}
