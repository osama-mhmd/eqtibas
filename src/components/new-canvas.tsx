// IMPORTANT NOTE: new-canvas is the canvas in the homepage and the editor page

import { useSelector } from "react-redux";
import Canvas from "./canvas";
import { forwardRef, HTMLAttributes } from "react";

const NewCanvas = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { quote, background } = useSelector((state) => (state as any).canvas);

    return (
      <Canvas
        background={background}
        ref={ref}
        quote={quote}
        theme="quotation"
        className={className}
        {...props}
      />
    );
  }
);

NewCanvas.displayName = "NewCanvas";

export default NewCanvas;
