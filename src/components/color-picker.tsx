"use client";

import { ColorPicker, IColor, useColor } from "react-color-palette";
import { useDispatch, useSelector } from "react-redux";
import { changeBackground } from "@/redux/slices/canvas-slice";
import "react-color-palette/css";

export default function AColorPicker({ closePanel }: { closePanel: any }) {
  const dispatch = useDispatch();
  const { background } = useSelector((state) => (state as any).canvas);
  const [color, setColor] = useColor(background);

  const colorPickerChange = (_color: IColor) => {
    setColor(_color);
    dispatch(changeBackground(_color.hex));
  };

  return (
    <>
      <div className="relative w-[300px] z-[12]" dir="ltr">
        <ColorPicker color={color} onChange={colorPickerChange} />
      </div>
      <div
        className="fixed w-full h-screen top-0 bg-gray-900 opacity-45 left-0 z-[11]"
        onClick={closePanel}
      ></div>
    </>
  );
}
