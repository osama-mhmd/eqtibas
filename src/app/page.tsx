import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { families } from "./families";
import { cn } from "@/utils";
import { CardStack } from "@/components/card-stack";
import Image from "next/image";

const cards = [
  {
    name: "الإمام ابن القيم رحمه الله",
    content: "الشكر حارس النعمة، من كل ما يكون سببا لزوالها",
  },
  {
    name: "رسول الله صلى الله عليه وسلم",
    content: "رحم الله عبدا قال خيرا فغنم، أو سكت عن سوء فسلم.",
  },
  {
    name: "أبو الدرداء رضى الله عنه",
    content:
      "من يُكثر قرع الباب يوشك أن يُفتح له ومن يُكثر الدعاء يوشك أن يستجاب له.",
  },
  {
    name: "الإمام ابن القيم رحمه الله",
    content: "يُخاف على من اتبع الهوى أن ينسلخ من الدين وهو لا يشعر.",
  },
  {
    name: "",
    content: "رحم الله من عرف الحرام بلا مماطلة ولا مجادلة.",
  },
];

export default function Homepage() {
  return (
    <main>
      <section>
        <div className="container mx-auto px-2 flex flex-col pt-14 text-center gap-14 relative">
          <Image
            src="/blob.svg"
            alt="blob"
            width={900}
            height={900}
            className="opacity-20 max-w-[900px] -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <h1 className={cn(families.noto, "text-8xl")}>اقتباس</h1>
          <Link
            className="as-button flex items-center justify-center gap-2 w-fit mx-auto"
            href="/new"
            dir="rtl"
          >
            اقتبس الآن <ArrowLeft />
          </Link>
          <div className="flex justify-center mt-12">
            <CardStack items={cards} />
          </div>
        </div>
      </section>
    </main>
  );
}
