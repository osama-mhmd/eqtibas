"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  changeBackground,
  changeFamily,
  changeImage,
  changeTheme,
} from "@/redux/slices/canvas-slice";
import NewCanvas from "./new-canvas";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/utils";
import { useState } from "react";

const backgrounds = ["#2564eb", "#dc2828", "#1f2937"];
const gradients = [
  "linear-gradient(to right, #2564eb, #f564eb)",
  "linear-gradient(to right, #002828, #002868)",
  "linear-gradient(to right, #1f2947, #1f29af)",
];

import { families as fontFamilies } from "@/app/families";
const families = Object.keys(fontFamilies);

export default function Edit({ closePanel }: { closePanel: any }) {
  const dispatch = useDispatch();
  const [isPickingColor, makePickingColor] = useState(false);
  const { background, theme, image, family } = useSelector(
    (state) => (state as any).canvas
  );

  return (
    <>
      <div className="container absolute top-0 p-6 bg-white mx-auto sm:mt-8 sm:rounded-md z-10 shadow-gray-600">
        {/* Header */}
        <div className="flex justify-end">
          <span
            onClick={closePanel}
            className="cursor-pointer rounded-full hover:bg-gray-200 p-2 bg-gray-100 transition"
          >
            <X />
          </span>
        </div>
        <NewCanvas className="rounded-md mx-auto my-8" />
        <h2 className="text-2xl my-4">الخلفية</h2>
        <div className="py-4 squares relative">
          {backgrounds.map((_background, index) => {
            return (
              <span
                key={index}
                className={background == _background ? "active-slot" : ""}
                style={{
                  backgroundColor: _background,
                }}
                onClick={() => {
                  dispatch(changeBackground(_background));
                }}
              ></span>
            );
          })}
          <span
            className={cn(
              "bg-gray-200 flex justify-center items-center relative",
              backgrounds.indexOf(background) == -1 &&
                !image.length &&
                "active-slot"
            )}
            onClick={() => {
              const colorInput: HTMLInputElement | null =
                document.querySelector("#custom-color");

              colorInput?.click();
            }}
          >
            مخصص
            <input
              type="color"
              className="absolute -z-10"
              id="custom-color"
              onChange={(e) =>
                dispatch(changeBackground(e.currentTarget.value))
              }
            />
          </span>
          {gradients.map((gradient, index) => {
            return (
              <span
                key={index}
                className={image == gradient ? "active-slot" : ""}
                style={{
                  backgroundImage: gradient,
                }}
                onClick={() => {
                  dispatch(changeImage(gradient));
                }}
              ></span>
            );
          })}
        </div>
        <h2 className="text-2xl my-4 mt-6">السمات</h2>
        <div className="py-4 squares">
          <span
            className={cn(
              "bg-gray-200 flex border-2 border-white justify-center items-center",
              theme == "quotation" && "active-slot"
            )}
            onClick={() => dispatch(changeTheme("quotation"))}
          >
            <Image src="/quote.png" alt="quote" width={60} height={60} />
          </span>
          <span
            className={cn(
              "bg-gray-200 flex border-2 border-white justify-center items-center",
              theme == "no-effect" && "active-slot"
            )}
            onClick={() => dispatch(changeTheme("no-effect"))}
          >
            لا تأثير
          </span>
        </div>
        <h2 className="text-2xl my-4">الخط</h2>
        <div className="py-4 rects">
          {families.map((_family, index) => {
            return (
              <span
                key={index}
                className={cn(
                  "bg-gray-200 flex border-2 border-white justify-center items-center",
                  fontFamilies[_family as keyof typeof fontFamilies],
                  _family == family ? "active-slot" : ""
                )}
                onClick={() => {
                  dispatch(changeFamily(_family));
                }}
              >
                بسم الله الرحمن الرحيم
              </span>
            );
          })}
        </div>
      </div>
      <div
        className="fixed w-full h-screen top-0 left-0 bg-gray-900 opacity-45 z-[7]"
        onClick={closePanel}
      ></div>
    </>
  );
}
