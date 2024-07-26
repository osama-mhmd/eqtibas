import { cn } from "@/utils";
import { forwardRef } from "react";

type CanvasProps = {
  quote: string;
  className?: string;
  background: string;
};

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ quote, className = "", background }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[370px] sm:w-[440px] h-[320px] sm:h-[380px] text-lg text-white p-4 flex text-center justify-center items-center",
          className,
          background
        )}
      >
        {quote}
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
