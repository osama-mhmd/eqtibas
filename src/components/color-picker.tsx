"use client";

import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { changeBackground } from "@/redux/slices/canvas-slice";

export default function ColorPicker({ closePanel }: { closePanel: any }) {
  const dispatch = useDispatch();

  const change = (color: string) => {
    const c = `bg-[${color}]`;
    console.log(c == c);
    dispatch(changeBackground(c));
  };

  return (
    <>
      <HexColorPicker
        className="react-colorful z-[12]"
        color="#222"
        onChange={change}
      />
      <div
        className="fixed w-full h-screen top-0 bg-gray-900 opacity-45 left-0 z-[11]"
        onClick={closePanel}
      ></div>
    </>
  );
}
