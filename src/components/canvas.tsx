import { cn, hexToRgb, isBgColorDark } from "@/utils";
import { forwardRef } from "react";
import { type HTMLAttributes } from "react";
import Image from "next/image";

const themes = {
  "no-effect": "",
  quotation: "",
};

function Quotation({ position }: { position: string }) {
  return (
    <Image
      alt="Quotation"
      className={`absolute ${position}`}
      src="/quote.png"
      width={60}
      height={60}
    />
  );
}

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  quote: string;
  background: string;
  theme?: "no-effect" | "quotation";
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  (
    { quote, className = "", theme = "no-effect", background, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[370px] sm:w-[440px] relative h-[320px] sm:h-[380px] text-xl p-8 flex text-center justify-center items-center",
          className,
          themes[theme]
        )}
        style={{
          backgroundColor: background,
          color: isBgColorDark(hexToRgb(background)) ? "#fff" : "#000",
        }}
        {...props}
      >
        {theme == "quotation" && <Quotation position="top-10 right-10" />}
        {quote}
        {theme == "quotation" && (
          <Quotation position="bottom-10 left-10 rotate-180" />
        )}
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
