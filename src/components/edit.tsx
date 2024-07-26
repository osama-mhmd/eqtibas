"use client";

export default function Edit({
  setEditingOrNot,
  image,
  props,
  setProps,
}: {
  setEditingOrNot: any;
  image: HTMLDivElement;
  props: {
    quote: string | undefined;
    bgColor: string;
  };
  setProps: any;
}) {
  return (
    <>
      <div className="container fixed top-0 p-6 bg-white mx-auto sm:mt-8 sm:rounded-md z-10 shadow-gray-600">
        {/* Header */}
        <div className="flex justify-end">
          <span
            onClick={() => setEditingOrNot(false)}
            className="cursor-pointer"
          >
            إغلاق
          </span>
        </div>
        <div className="mx-auto n-image">{props.quote}</div>
        <div className="py-4 squares">
          <span
            className="bg-blue-600"
            onClick={() => setProps({ bgColor: "bg-blue-600" })}
          ></span>
          <span className="bg-red-600"></span>
          <span className="bg-gray-200 flex justify-center items-center">
            تعديل
          </span>
        </div>
      </div>
      <div className="overlay" onClick={() => setEditingOrNot(false)}></div>
    </>
  );
}
