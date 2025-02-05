"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Trash2 } from "lucide-react";

const SYMBOLS = [
  "#",
  "@",
  "!",
  "?",
  "(",
  ")",
  "-",
  "+",
  "_",
  "*",
  "&",
  "^",
  "%",
  "$",
  "~",
  "|",
  "\\",
  "{",
  "}",
  "[",
  "]",
  "/",
];

export default function KeywordGenerator() {
  const [mainKeyword, setMainKeyword] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState([]);
  const [prefixSymbol, setPrefixSymbol] = useState("#");
  const [suffixSymbol, setSuffixSymbol] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState(new Set());

  const generateKeywords = () => {
    if (!mainKeyword.trim()) return;

    const baseKeyword = mainKeyword.toLowerCase().trim();
    const variations = [
      baseKeyword,
      `best ${baseKeyword}`,
      `${baseKeyword} tips`,
      `how to ${baseKeyword}`,
      `${baseKeyword} ideas`,
      `${baseKeyword} guide`,
      `${baseKeyword} tutorial`,
      `${baseKeyword} examples`,
      `top ${baseKeyword}`,
      `${baseKeyword} for beginners`,
      `professional ${baseKeyword}`,
      `${baseKeyword} tricks`,
      `${baseKeyword} hacks`,
      `${baseKeyword} strategy`,
      `${baseKeyword} basics`,
    ];

    setGeneratedKeywords(variations);
  };

  const getFormattedKeyword = (keyword) => `${prefixSymbol}${keyword}${suffixSymbol}`;

  const toggleKeywordSelection = (index) => {
    const newSelected = new Set(selectedKeywords);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedKeywords(newSelected);
  };

  const copyToClipboard = async () => {
    const keywordsToCopy = generatedKeywords
      .filter((_, index) => selectedKeywords.has(index))
      .map((keyword) => getFormattedKeyword(keyword));

    if (keywordsToCopy.length === 0) {
      keywordsToCopy.push(...generatedKeywords.map(getFormattedKeyword));
    }

    await navigator.clipboard.writeText(keywordsToCopy.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center py-5 items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-6">Keyword Generator</h1>

        <div className="space-y-6">
          {/* Input Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Enter main keyword:</label>
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <input
                value={mainKeyword}
                onChange={(e) => setMainKeyword(e.target.value)}
                placeholder="Enter your main keyword (e.g., 'digital marketing')"
                className="flex-grow border-none outline-none bg-transparent text-base p-2"
              />
              <button
                onClick={generateKeywords}
                className="flex items-center bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
              >
                <Search className="w-5 h-5 mr-2" /> Generate
              </button>
            </div>
          </div>

          {/* Prefix and Suffix Section */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Prefix Symbol:</label>
              <div className="grid grid-cols-8 gap-2">
                {SYMBOLS.map((symbol) => (
                  <button
                    key={`prefix-${symbol}`}
                    onClick={() => setPrefixSymbol(symbol)}
                    className={`w-8 h-8 text-sm flex justify-center items-center rounded-md cursor-pointer transition ${
                      prefixSymbol === symbol
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Suffix Symbol:</label>
              <div className="grid grid-cols-8 gap-2">
                {SYMBOLS.map((symbol) => (
                  <button
                    key={`suffix-${symbol}`}
                    onClick={() => setSuffixSymbol(symbol)}
                    className={`w-8 h-8 text-sm flex justify-center items-center rounded-md cursor-pointer transition ${
                      suffixSymbol === symbol
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Keywords Section */}
          {generatedKeywords.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedKeywords(new Set())}
                  className="flex items-center bg-gray-200 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300 transition"
                >
                  <Trash2 className="w-5 h-5 mr-2" /> Clear Selection
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" /> Copy Selected
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {generatedKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    onClick={() => toggleKeywordSelection(index)}
                    className={`p-2 rounded-md text-center cursor-pointer transition ${
                      selectedKeywords.has(index)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {getFormattedKeyword(keyword)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
