/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import html2canvas from "html2canvas";
import Gallery from "@/components/gallery";
import { useDispatch, useSelector } from "react-redux";
import { writeQuote } from "@/redux/slices/image";
import Image from "@/components/image";
import { useRef } from "react";

type Params = {
  quote?: string;
};

export default function Home({ searchParams }: { searchParams: Params }) {
  const { quote, background } = useSelector((state) => (state as any).image);
  const imageRef = useRef(null);

  const dispatch = useDispatch();

  const downloadImage = async () => {
    if (!imageRef.current) return;

    const canvas = await html2canvas(imageRef.current, { scale: 15 });

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
              onKeyUp={(e) =>
                dispatch(writeQuote((e.target as HTMLTextAreaElement).value))
              }
              id="textarea"
              placeholder="الاقتباس..."
              defaultValue={searchParams.quote}
            />
          </div>
          <div className="flex flex-col justify-center items-center m-12 gap-6">
            <div className="p-2 rounded-md border-2 border-[hsl(var(--primary))] relative">
              <Image quote={quote} ref={imageRef} />
            </div>

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
