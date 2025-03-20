import React, { useState, useRef, useEffect } from "react";
import {
  Quote,
  PaintBucket,
  Type,
  Palette,
  Image,
  QuoteIcon,
  Download,
  Maximize,
  Sun,
  Moon,
  Smile,
  Frown,
  Brain,
  BookOpen,
} from "lucide-react";
import { toPng } from "html-to-image";
import clsx from "clsx";
import Cookies from "js-cookie";

type Theme = "modern" | "classic" | "minimal" | "bold";
type Direction = "ltr" | "rtl";
type BackgroundTheme = "none" | "nature" | "abstract" | "geometric" | "pattern";
type QuoteLayout = "simple" | "corners" | "sides" | "ornate";
type Mood = "happy" | "sad" | "wise" | "book";

const themes: Record<Theme, string> = {
  modern: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
  classic: "bg-amber-100 text-gray-800 border-2 border-amber-800",
  minimal: "bg-white text-gray-900 shadow-lg dark:bg-gray-800 dark:text-white",
  bold: "bg-black text-white",
};

const backgroundThemes: Record<BackgroundTheme, string> = {
  none: "",
  nature:
    'bg-[url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80")] bg-cover bg-center',
  abstract:
    'bg-[url("https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&q=80")] bg-cover bg-center',
  geometric:
    'bg-[url("https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?auto=format&fit=crop&q=80")] bg-cover bg-center',
  pattern:
    'bg-[url("https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&q=80")] bg-cover bg-center',
};

const moodEmojis = {
  happy: ["😊", "😄", "🌟", "✨", "🎉"],
  sad: ["🌧️", "💭", "🌙", "⭐", "🌊"],
  wise: ["🔮", "📚", "🎯", "💡", "🗿"],
  book: ["📚"],
};

// const moodPositions = {
//   happy: { min: 20, max: 80 },
//   sad: { min: 20, max: 80 },
//   wise: { min: 20, max: 80 },
// };

const quoteLayouts: Record<
  QuoteLayout,
  { className: string; decorations: React.ReactNode }
> = {
  simple: {
    className: "",
    decorations: null,
  },
  corners: {
    className: "border-4 border-current/20",
    decorations: (
      <>
        <Quote className="absolute w-8 h-8 rotate-180 top-4 left-4 opacity-60" />
        <Quote className="absolute w-8 h-8 bottom-4 right-4 opacity-60" />
      </>
    ),
  },
  sides: {
    className: "",
    decorations: (
      <>
        <Quote className="absolute w-8 h-8 rotate-180 -translate-y-1/2 left-4 top-1/2 opacity-60" />
        <Quote className="absolute w-8 h-8 -translate-y-1/2 right-4 top-1/2 opacity-60" />
      </>
    ),
  },
  ornate: {
    className: "border-[3px] border-current/20",
    decorations: (
      <>
        <div className="absolute top-0 left-0 w-16 h-16 border-l-[3px] border-t-[3px] border-current/20" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-[3px] border-t-[3px] border-current/20" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-[3px] border-b-[3px] border-current/20" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-[3px] border-b-[3px] border-current/20" />
        <Quote className="absolute w-6 h-6 rotate-180 top-4 left-4 opacity-60" />
        <Quote className="absolute w-6 h-6 bottom-4 right-4 opacity-60" />
      </>
    ),
  },
};

const fonts = ["font-serif", "font-sans", "font-mono"];

function App() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState<Theme>("modern");
  const [font, setFont] = useState(fonts[0]);
  const [textSize, setTextSize] = useState("text-2xl");
  const [direction, setDirection] = useState<Direction>("ltr");
  const [backgroundTheme, setBackgroundTheme] =
    useState<BackgroundTheme>("none");
  const [quoteLayout, setQuoteLayout] = useState<QuoteLayout>("simple");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("400");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = Cookies.get("darkMode");
    return stored === "true";
  });
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [moodElements, setMoodElements] = useState<
    Array<{ emoji: string; style: React.CSSProperties }>
  >([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    Cookies.set("darkMode", isDarkMode.toString(), { expires: 365 });
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedMood) {
      const count = selectedMood === "book" ? 1 : 6;
      const elements = Array.from({ length: count }, () => {
        const emoji =
          moodEmojis[selectedMood][
            Math.floor(Math.random() * moodEmojis[selectedMood].length)
          ];
        const pos = { min: 20, max: 80 };
        const leftPos =
          Math.random() < 0.5
            ? pos.min + Math.random() * (pos.max - pos.min) // Left side
            : 100 - (pos.min + Math.random() * (pos.max - pos.min)); // Right side

        const topPos =
          Math.random() < 0.5
            ? pos.min + Math.random() * (pos.max - pos.min) // Top side
            : 100 - (pos.min + Math.random() * (pos.max - pos.min)); // Bottom side
        if (count == 1) {
          return {
            emoji,
            style: {
              position: "absolute",
              left: `5%`,
              bottom: `2%`,
              opacity: 0.8,
              fontSize: "4rem",
              zIndex: 1,
            } as React.CSSProperties,
          };
        }
        return {
          emoji,
          style: {
            position: "absolute",
            left: `${leftPos}%`,
            top: `${topPos}%`,
            opacity: 0.3,
            fontSize: `${2 + Math.random()}rem`,
            zIndex: 1,
          } as React.CSSProperties,
        };
      });
      setMoodElements(elements);
    } else {
      setMoodElements([]);
    }
  }, [selectedMood]);

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  const handleQuoteChange = (text: string) => {
    setQuote(text);
    setDirection(isArabic(text) ? "rtl" : "ltr");
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood === selectedMood ? "" : mood);
  };

  const handleDownload = async () => {
    if (quoteRef.current) {
      try {
        const dataUrl = await toPng(quoteRef.current, {
          quality: 1,
          width: parseInt(width),
          height: parseInt(height),
          pixelRatio: 2,
          skipAutoScale: true,
          style: {
            transform: "none",
          },
        });
        const link = document.createElement("a");
        link.download = "quote.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to download quote:", err);
      }
    }
  };

  return (
    <div
      className={clsx(
        "min-h-screen transition-colors duration-200",
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      )}
    >
      <div className="max-w-4xl p-8 mx-auto space-y-8">
        <div
          className={clsx(
            "rounded-lg shadow-md p-6 space-y-4 transition-colors duration-200",
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          )}
        >
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <Quote
                fill="currentColor"
                stroke="#9333ea"
                className="w-8 h-8 text-purple-200 dark:text-purple-500"
              />
              Eqtibas{" "}
              <span className="text-xl italic text-gray-500">
                Quote Generator
              </span>
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={clsx(
                "p-2 rounded-full transition-colors duration-200",
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleMoodSelect("happy")}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200",
                  selectedMood === "happy"
                    ? "bg-green-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                )}
              >
                <Smile className="w-4 h-4" /> Happy
              </button>
              <button
                onClick={() => handleMoodSelect("sad")}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200",
                  selectedMood === "sad"
                    ? "bg-blue-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                )}
              >
                <Frown className="w-4 h-4" /> Sad
              </button>
              <button
                onClick={() => handleMoodSelect("wise")}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200",
                  selectedMood === "wise"
                    ? "bg-purple-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                )}
              >
                <Brain className="w-4 h-4" /> Wise
              </button>
              <button
                onClick={() => handleMoodSelect("book")}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200",
                  selectedMood === "book"
                    ? "bg-amber-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                )}
              >
                <BookOpen className="w-4 h-4" /> Book
              </button>
            </div>

            <div>
              <label
                className={clsx(
                  "block text-sm font-medium mb-1",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                Quote Text
              </label>
              <textarea
                value={quote}
                onChange={(e) => handleQuoteChange(e.target.value)}
                className={clsx(
                  "w-full p-3 border rounded-md transition-colors duration-200",
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                )}
                rows={4}
                placeholder="Enter your quote here..."
              />
            </div>

            <div>
              <label
                className={clsx(
                  "block text-sm font-medium mb-1",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                Author (optional)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={clsx(
                  "w-full p-3 border rounded-md transition-colors duration-200",
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                )}
                placeholder="Enter author name..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  className={clsx(
                    "flex text-sm font-medium mb-1 items-center gap-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <Palette className="w-4 h-4" /> Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as Theme)}
                  className={clsx(
                    "w-full p-2 border rounded-md transition-colors duration-200",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>

              <div>
                <label
                  className={clsx(
                    "flex text-sm font-medium mb-1 items-center gap-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <Image className="w-4 h-4" /> Background
                </label>
                <select
                  value={backgroundTheme}
                  onChange={(e) =>
                    setBackgroundTheme(e.target.value as BackgroundTheme)
                  }
                  className={clsx(
                    "w-full p-2 border rounded-md transition-colors duration-200",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                >
                  <option value="none">None</option>
                  <option value="nature">Nature</option>
                  <option value="abstract">Abstract</option>
                  <option value="geometric">Geometric</option>
                  <option value="pattern">Pattern</option>
                </select>
              </div>

              <div>
                <label
                  className={clsx(
                    "flex text-sm font-medium mb-1 items-center gap-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <QuoteIcon className="w-4 h-4" /> Quote Layout
                </label>
                <select
                  value={quoteLayout}
                  onChange={(e) =>
                    setQuoteLayout(e.target.value as QuoteLayout)
                  }
                  className={clsx(
                    "w-full p-2 border rounded-md transition-colors duration-200",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                >
                  <option value="simple">Simple</option>
                  <option value="corners">Corner Quotes</option>
                  <option value="sides">Side Quotes</option>
                  <option value="ornate">Ornate</option>
                </select>
              </div>

              <div>
                <label
                  className={clsx(
                    "flex text-sm font-medium mb-1 items-center gap-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <Type className="w-4 h-4" /> Font
                </label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className={clsx(
                    "w-full p-2 border rounded-md transition-colors duration-200",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                >
                  <option value="font-serif">Serif</option>
                  <option value="font-sans">Sans</option>
                  <option value="font-mono">Monospace</option>
                </select>
              </div>

              <div>
                <label
                  className={clsx(
                    "flex text-sm font-medium mb-1 items-center gap-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <PaintBucket className="w-4 h-4" /> Text Size
                </label>
                <select
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                  className={clsx(
                    "w-full p-2 border rounded-md transition-colors duration-200",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                >
                  <option value="text-xl">Small</option>
                  <option value="text-2xl">Medium</option>
                  <option value="text-3xl">Large</option>
                  <option value="text-4xl">Extra Large</option>
                </select>
              </div>

              <div>
                <label
                  className={clsx(
                    "flex text-sm font-medium mb-1 items-center gap-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  <Maximize className="w-4 h-4" /> Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className={clsx(
                      "w-full p-2 border rounded-md transition-colors duration-200",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    )}
                    placeholder="Width"
                    min="200"
                    max="1200"
                  />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={clsx(
                      "w-full p-2 border rounded-md transition-colors duration-200",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    )}
                    placeholder="Height"
                    min="200"
                    max="1200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {quote && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div
                ref={quoteRef}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  transform: "none",
                }}
                className={clsx(
                  "rounded-lg p-8 transition-all duration-300 relative overflow-hidden",
                  themes[theme],
                  font,
                  "flex flex-col items-center justify-center",
                  quoteLayouts[quoteLayout].className,
                  backgroundTheme !== "none" && [
                    backgroundThemes[backgroundTheme],
                    "before:absolute before:inset-0 before:z-0",
                    theme === "modern"
                      ? "before:bg-gradient-to-br before:from-purple-500/90 before:to-pink-500/90"
                      : theme === "classic"
                      ? "before:bg-amber-100/90"
                      : theme === "minimal"
                      ? "before:bg-white/90 dark:before:bg-gray-800/90"
                      : "before:bg-black/90",
                  ]
                )}
              >
                {moodElements.map((element, index) => (
                  <span
                    key={index}
                    style={element.style}
                    className="pointer-events-none select-none"
                  >
                    {element.emoji}
                  </span>
                ))}
                {quoteLayouts[quoteLayout].decorations}
                <div
                  className={clsx(
                    "max-w-2xl text-center mb-4 relative z-10",
                    textSize,
                    direction === "rtl" ? "font-arabic" : ""
                  )}
                  dir={direction}
                >
                  {quote}
                </div>
                {author && (
                  <div
                    className={clsx(
                      "text-lg opacity-80 relative z-10",
                      direction === "rtl" ? "font-arabic" : ""
                    )}
                    dir={direction}
                  >
                    - {author}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 mx-auto text-white transition-colors bg-purple-500 rounded-md hover:bg-purple-600"
            >
              <Download className="w-4 h-4" />
              Download Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
