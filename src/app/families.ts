import { Noto_Nastaliq_Urdu } from "next/font/google";

const noto = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400"] });

const families = {
  ibm: "",
  noto: noto.className,
};

export { families };
