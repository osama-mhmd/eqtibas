import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { families } from "./families";
import { cn } from "@/utils";

export default function Homepage() {
  return (
    <main>
      <section>
        <div className="container mx-auto px-2 flex flex-col pt-14 text-center gap-14 relative landing-sphere">
          <h1 className={cn(families.noto, "text-8xl")}>اقتباس</h1>
          <Link
            className="as-button flex items-center justify-center gap-2 w-fit mx-auto"
            href="/new"
            dir="rtl"
          >
            اقتبس الآن <ArrowLeft />
          </Link>
        </div>
      </section>
    </main>
  );
}
