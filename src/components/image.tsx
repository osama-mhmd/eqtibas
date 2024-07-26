import { forwardRef } from "react";

type ImageProps = {
  quote: string;
};

const Image = forwardRef<HTMLDivElement, ImageProps>(({ quote }, ref) => {
  return (
    <div
      id="image"
      ref={ref}
      className="w-[370px] sm:w-[440px] h-[320px] sm:h-[380px] text-lg bg-purple-950 text-white p-4 flex text-center justify-center items-center"
    >
      {quote}
    </div>
  );
});

Image.displayName = "Image";

export default Image;
