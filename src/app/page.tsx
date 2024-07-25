/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Gallery from "./gallery";

function $(query: string): HTMLDivElement | null {
  return document.querySelector(query);
}

type Params = {
  quote?: string;
};

export default function Home({ searchParams }: { searchParams: Params }) {
  const [quote, setQuote] = useState(searchParams.quote);

  const willNotChangeClasses =
    "bg-purple-950 text-white p-4 flex text-center justify-center items-center";

  const downloadImage = async () => {
    // The next five lines is written to enhance the resolution of the image;
    let image = $("#image") as HTMLDivElement;
    let ogClasses = $("#image")!.className;
    image.className =
      "leading-5 w-[1320px] h-[1140px] text-7xl " + willNotChangeClasses;
    $("#image")!.className = ogClasses;
    const canvas = await html2canvas(image);

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
              onKeyUp={(e) => setQuote((e.target as HTMLTextAreaElement).value)}
              id="textarea"
              placeholder="الاقتباس..."
              defaultValue={searchParams.quote}
            />
          </div>
          <div className="flex flex-col justify-center items-center m-12 gap-6">
            <div className="p-2 rounded-md border-2 border-[hsl(var(--primary))]">
              <div
                id="image"
                className={
                  "w-[370px] sm:w-[440px] aspect-[22/19] text-lg " +
                  willNotChangeClasses
                }
              >
                {quote}
              </div>
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
