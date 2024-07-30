/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { toPng } from "html-to-image";
import Gallery from "@/components/gallery";
import { useDispatch } from "react-redux";
import { writeQuote } from "@/redux/slices/canvas-slice";
import { useRef, useState } from "react";
import Edit from "@/components/edit";
import NewCanvas from "@/components/new-canvas";
import Image from "next/image";
import { Pencil } from "lucide-react";

export default function New() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const [isEditing, isEditingOrNot] = useState(false);

  const downloadImage = async () => {
    if (!canvasRef.current) return;

    toPng(canvasRef.current, { style: { borderRadius: "0" } })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "eqtibas.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <main>
      <section className="mt-10">
        <div className="container mx-auto px-2">
          <div className="grid justify-center grid-cols-[repeat(1,minmax(300px,600px))] gap-4">
            <textarea
              onKeyUp={(e) => {
                dispatch(writeQuote((e.target as HTMLTextAreaElement).value));
              }}
              id="textarea"
              placeholder="الاقتباس..."
            />
          </div>
          <div className="flex flex-col justify-center items-center m-12 gap-6">
            <div className="relative">
              <NewCanvas className="rounded-md" ref={canvasRef} />
              <span
                className="absolute -top-4 -left-4 rounded-full p-3 bg-gray-300 shadow-md cursor-pointer"
                onClick={() => isEditingOrNot(true)}
              >
                <Pencil />
              </span>
            </div>

            {isEditing && <Edit closePanel={() => isEditingOrNot(false)} />}

            <button onClick={downloadImage}>تحميل</button>
          </div>
          <hr />
        </div>
      </section>
      <Gallery />
      <footer>
        <div className="py-10 container mx-auto text-center px-2">
          <hr />
          <br />
          صنع بواسطة{" "}
          <a
            className="underline text-blue-800"
            href="https://os-mhmd.vercel.app"
          >
            أسامة محمد
          </a>{" "}
          - 2024
        </div>
      </footer>
    </main>
  );
}
