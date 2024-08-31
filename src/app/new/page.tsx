"use client";

import * as htmlToImage from "html-to-image";
import Gallery from "@/components/gallery";
import { useDispatch } from "react-redux";
import { writeQuote } from "@/redux/slices/canvas-slice";
import { useRef, useState } from "react";
import Edit from "@/components/edit";
import NewCanvas from "@/components/new-canvas";

import { Bolt, Pencil } from "lucide-react";

type AvailableExtensions = "png" | "svg";

export default function New() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const [isEditing, isEditingOrNot] = useState(false);
  const [fileExtension, setFileExtension] =
    useState<AvailableExtensions>("png");

  const downloadImage = async () => {
    if (!canvasRef.current) return;

    const extensionCaped =
      fileExtension.charAt(0).toUpperCase() + fileExtension.slice(1);

    const functionName = "to" + extensionCaped;

    htmlToImage[functionName as "toPng" | "toSvg"](canvasRef.current, {
      style: { borderRadius: "0" },
    })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "eqtibas." + fileExtension;
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

            <div className="w-[370px] sm:w-[440px] mx-auto">
              <details className="bg-gray-100 rounded-lg p-4 border border-gray-400">
                <summary className="list-none cursor-pointer">
                  <div className="flex justify-between">
                    <h3 className="text-lg">إعدادات التحميل</h3>
                    <Bolt className="rotate-0 transition" />
                  </div>
                </summary>
                <div className="flex gap-1 items-center mt-4 py-2 border-t border-t-gray-400 pt-6">
                  <label>صيغة التحميل:</label>
                  <div className="custom-select">
                    <select
                      defaultValue={fileExtension}
                      onChange={(e) =>
                        setFileExtension(e.target.value as AvailableExtensions)
                      }
                    >
                      <option value="png">PNG</option>
                      <option value="svg">SVG</option>
                    </select>
                  </div>
                </div>
              </details>
            </div>

            <button onClick={downloadImage}>تحميل</button>
          </div>
          <hr />
        </div>
      </section>
      <Gallery />
    </main>
  );
}
