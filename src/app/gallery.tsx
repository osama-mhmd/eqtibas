const quotes = [
  {
    quote:
      "قال الإمام ابن القيم رحمه الله: يُخاف على من اتبع الهوى أن ينسلخ من الدين وهو لا يشعر.",
  },
  {
    quote:
      "قال أبو الدرداء رضى الله عنه: من يُكثر قرع الباب يوشك أن يُفتح له ومن يُكثر الدعاء يوشك أن يستجاب له.",
  },
  {
    quote:
      "قال رسول الله صلى الله عليه وسلم: رحم الله عبدا قال خيرا فغنم، أو سكت عن سوء فسلم.",
  },
  {
    quote:
      "قال الإمام ابن القيم رحمه الله: الشكر حارس النعمة، من كل ما يكون سببا لزوالها",
  },
  {
    quote: "رحم الله من عرف الحرام بلا مماطلة ولا مجادلة.",
  },
];

export default function Gallery() {
  return (
    <section className="py-8">
      <div className="container px-2 mx-auto grid gc justify-center gap-2">
        {quotes.map((quote, index) => {
          return (
            <a
              href={`/?quote=${quote.quote}`}
              key={`quote_${index}`}
              className="bg-purple-950 text-white rounded-md p-4 inline-flex text-center justify-center items-center aspect-[22/19] text-lg"
            >
              {quote.quote}
            </a>
          );
        })}
      </div>
    </section>
  );
}
