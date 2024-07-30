import { Noto_Nastaliq_Urdu, Rakkas, Lalezar, Marhey } from "next/font/google";

const noto = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400"] });
const rakkas = Rakkas({ subsets: ["arabic"], weight: ["400"] });
const lalezar = Lalezar({ subsets: ["arabic"], weight: ["400"] });
const marhey = Marhey({ subsets: ["arabic"], weight: ["400"] });

const families = {
  ibm: "", // the default one for the website, no need to import it again
  noto: noto.className,
  rakkas: rakkas.className,
  lalezar: lalezar.className,
  marhey: marhey.className,
};

export { families };
