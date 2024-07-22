"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [owner, SetOwner] = useState(""); // Owner of quote

  return (
    <main>
      <section className="mt-10">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl mb-6">اقتباس</h1>
          <div className="grid justify-center grid-cols-[repeat(1,minmax(300px,600px))] gap-4">
            <textarea
              onKeyUp={(e) => setQuote((e.target as HTMLTextAreaElement).value)}
              placeholder="الاقتباس..."
            />
            <input type="text" placeholder="صاحب المقولة..." />
          </div>
          <div className="flex justify-center items-center m-12">{quote}</div>
        </div>
      </section>
    </main>
  );
}
