/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import html2canvas from "html2canvas";
import Gallery from "@/components/gallery";
import { useDispatch, useSelector } from "react-redux";
import { writeQuote } from "@/redux/slices/canvas-slice";
import Canvas from "@/components/canvas";
import { useRef, useState, useEffect } from "react";
import Edit from "@/components/edit";

type Params = {
  quote?: string;
};

export default function Home({ searchParams }: { searchParams: Params }) {
  const { quote, background } = useSelector((state) => (state as any).canvas);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const [isEditing, isEditingOrNot] = useState(false);

  const downloadImage = async () => {
    if (!canvasRef.current) return;

    const canvas = await html2canvas(canvasRef.current, { scale: 15 });

    // Download
    const link = document.createElement("a");
    link.download = "eqtibas.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main>
      <section className="mt-10">
        <div className="container mx-auto px-2">
          <h1 className="text-center text-4xl mb-6">اقتباس</h1>
          <div className="grid justify-center grid-cols-[repeat(1,minmax(300px,600px))] gap-4">
            <textarea
              onKeyUp={(e) => {
                dispatch(writeQuote((e.target as HTMLTextAreaElement).value));
              }}
              id="textarea"
              placeholder="الاقتباس..."
              defaultValue={searchParams.quote}
            />
          </div>
          <div className="flex flex-col justify-center items-center m-12 gap-6">
            <div className="p-2 rounded-md border-2 border-[hsl(var(--primary))] relative">
              <Canvas background={background} ref={canvasRef} quote={quote} />
              <span
                className="absolute -top-8 left-0 cursor-pointer"
                onClick={() => isEditingOrNot(true)}
              >
                تعديل
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
