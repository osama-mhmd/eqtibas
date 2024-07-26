import { cn } from "@/utils";
import { forwardRef } from "react";
import { type HTMLAttributes } from "react";

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  quote: string;
  background: string;
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ quote, className = "", background, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[370px] sm:w-[440px] h-[320px] sm:h-[380px] text-xl text-white p-8 flex text-center justify-center items-center",
          className,
          background
        )}
        {...props}
      >
        {quote}
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
