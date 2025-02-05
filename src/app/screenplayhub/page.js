'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ScreenplayEditor() {
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    const savedContent = localStorage.getItem('screenplay');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const insertFormat = (type) => {
    const formats = {
      scene: 'INT. LOCATION - DAY\n\n',
      action: 'Description of the action...\n\n',
      character: 'CHARACTER NAME\n',
      dialogue: '(beat)\nDialogue goes here...\n\n',
      transition: 'CUT TO:\n\n',
    };

    const cursorPos = editorRef.current?.selectionStart || 0;
    const updatedContent =
      content.substring(0, cursorPos) +
      formats[type] +
      content.substring(cursorPos);
    setContent(updatedContent);
  };

  const saveScreenplay = () => {
    localStorage.setItem('screenplay', content);
    alert('Screenplay saved!');
  };

  const renderPreview = () => {
    return content.split('\n').map((line, index) => {
      if (line.match(/^INT\.|^EXT\./)) {
        return (
          <div key={index} className="font-bold uppercase text-gray-600 mb-2">
            {line}
          </div>
        );
      } else if (line.match(/^[A-Z]{2,}$/)) {
        return (
          <div key={index} className="font-bold text-center my-5">
            {line}
          </div>
        );
      } else if (line.trim() === '') {
        return <div key={index} className="pt-2"></div>;
      } else {
        return (
          <div key={index} className="ml-10 italic py-2">
            {line}
          </div>
        );
      }
    });
  };

  return (
    <>
    {/* <div className='sticky top-0 w-full z-50 p-5 bg-white'>
      <h1 className=' text-center font-semibold text-xl text-violet-700 md:font-bold md:text-3xl '>SCREENPLAY WRITING</h1>
    </div> */}
      <div className=' min-h-screen flex justify-center items-center bg-gray-100'>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white py-2 px-5 rounded-lg text-lg mb-5 transition-colors hover:bg-blue-700"
      >
        Start Writing
      </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center">
          <div className="relative bg-gray-800 text-white p-5 w-11/12 max-w-4xl h-3/4 rounded-lg overflow-auto">
            <span
              className="absolute top-2 right-5 text-white text-3xl cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <div className="flex gap-6 h-full mt-5">
              <div className="flex-1 flex flex-col">
                <div className="bg-gray-700 p-3 rounded-lg mb-3 flex gap-3 flex-wrap">
                  {['scene', 'action', 'character', 'dialogue', 'transition'].map((btn) => (
                    <button
                      key={btn}
                      onClick={() => insertFormat(btn)}
                      className="bg-purple-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-purple-600"
                    >
                      {btn.charAt(0).toUpperCase() + btn.slice(1)}
                    </button>
                  ))}
                  <button
                    onClick={saveScreenplay}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg transition-colors hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
                <textarea
                  ref={editorRef}
                  className="flex-grow p-5 bg-white text-black rounded-lg resize-none font-mono text-sm leading-relaxed shadow-md"
                  placeholder="Start writing your screenplay here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex-1 bg-white text-black p-5 rounded-lg overflow-y-auto shadow-md">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
