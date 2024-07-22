/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

type Params = {
  quote?: string;
};

export default function Home({ searchParams }: { searchParams: Params }) {
  const [quote, setQuote] = useState("");

  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const downloadImage = async () => {
    if (!paragraphRef.current) return;
    const canvas = await html2canvas(paragraphRef.current);
    const link = document.createElement("a");
    link.download = "paragraph-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    if (searchParams.quote) {
      setQuote(searchParams.quote);
      (document.getElementById("textarea") as HTMLTextAreaElement).value =
        searchParams.quote;
    }
  }, []);

  return (
    <main>
      <section className="mt-10">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl mb-6">اقتباس</h1>
          <div className="grid justify-center grid-cols-[repeat(1,minmax(300px,600px))] gap-4">
            <textarea
              onKeyUp={(e) => setQuote((e.target as HTMLTextAreaElement).value)}
              id="textarea"
              placeholder="الاقتباس..."
            />
          </div>
          <div className="flex flex-col justify-center items-center m-12 gap-6">
            <div
              ref={paragraphRef}
              className="bg-purple-950 w-[500px] h-[300px] text-wrap p-4 flex justify-center items-center"
            >
              {quote}
            </div>

            <button onClick={downloadImage}>تحميل</button>
          </div>
        </div>
      </section>
    </main>
  );
}
