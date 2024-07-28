"use client";

import { ColorPicker, IColor, useColor } from "react-color-palette";
import { useDispatch } from "react-redux";
import { changeBackground } from "@/redux/slices/canvas-slice";
import "react-color-palette/css";

export default function AColorPicker({ closePanel }: { closePanel: any }) {
  const dispatch = useDispatch();
  const [color, setColor] = useColor("#561ecb");

  const change = (color: IColor) => {
    setColor(color);

    const c = `bg-[${color.hex}]`;
    console.log(c);
    dispatch(changeBackground(c.length != 0 && c));
  };

  return (
    <>
      <ColorPicker color={color} onChange={change} />
      {/* <div
        className="fixed w-full h-screen top-0 bg-gray-900 opacity-45 left-0"
        onClick={closePanel}
      ></div> */}
    </>
  );
}
