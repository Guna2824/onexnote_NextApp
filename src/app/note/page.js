"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Download, Share2, Trash2 } from "lucide-react";

const fonts = [
  "Arial, sans-serif",
  "Verdana, sans-serif",
  "Helvetica, sans-serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Times New Roman, serif",
  "Trebuchet MS, sans-serif",
  "Garamond, serif",
  "Palatino Linotype, serif",
  "Comic Sans MS, sans-serif",
  "Lucida Console, monospace",
  "Impact, sans-serif",
];

const NotePad = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const createNewNote = useCallback(() => {
    const newNote = {
      title: "",
      content: "",
      created: new Date().toLocaleString(),
      lastEdited: new Date().toLocaleString(),
      tags: [],
    };
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    setSelectedNoteIndex(updatedNotes.length - 1);
  }, [notes]);

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
      } else {
        createNewNote();
      }
    } catch (error) {
      console.error("Failed to load notes from local storage:", error);
      createNewNote();
    }
  }, []);

  useEffect(() => {
    const isModalShown = localStorage.getItem("isModalShown");
    if (!isModalShown) {
      setIsModalVisible(true);
      localStorage.setItem("isModalShown", "true");
    }
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (selectedNoteIndex !== null && notes[selectedNoteIndex]) {
      setNoteContent(notes[selectedNoteIndex].content);
      setNoteTitle(notes[selectedNoteIndex].title);
    } else {
      setNoteContent("");
      setNoteTitle("");
    }
  }, [selectedNoteIndex, notes]);

  const saveNotes = (updatedNotes) => {
    try {
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to save notes to local storage:", error);
    }
  };

  const updateWordCounts = useCallback((text) => {
    const wordsExcludingSpaces = text.trim().split(/\s+/).filter(Boolean).length;
    const wordsIncludingSpaces = text.length;
    return {
      wordCountExcludingSpaces: wordsExcludingSpaces,
      wordCountIncludingSpaces: wordsIncludingSpaces,
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const renderNotesList = useCallback(() => {
    const query = searchQuery.toLowerCase();
    return notes
      .filter(note =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      )
      .map((note, index) => (
        <li
          key={index}
          className={`p-2 text-[15px] cursor-pointer hover:bg-gray-100 mx-1 hover:text-black ${index === selectedNoteIndex ? "bg-gray-300 text-black font-semibold" : null}`}
          onClick={() => setSelectedNoteIndex(index)}
        >
          {note.title || `Note ${index + 1}`}
        </li>
      ));
  }, [notes, searchQuery, selectedNoteIndex]);

  const handleContentChange = (event) => {
    if (selectedNoteIndex !== null && notes[selectedNoteIndex]) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex].content = event.target.value;
      updatedNotes[selectedNoteIndex].lastEdited = new Date().toLocaleString();
      saveNotes(updatedNotes);
      setNoteContent(event.target.value);
    }
  };

  const handleTitleChange = (event) => {
    if (selectedNoteIndex !== null && notes[selectedNoteIndex]) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex].title = event.target.value;
      updatedNotes[selectedNoteIndex].lastEdited = new Date().toLocaleString();
      saveNotes(updatedNotes);
      setNoteTitle(event.target.value);
    }
  };

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const deleteNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = notes.filter((_, index) => index !== selectedNoteIndex);
      setSelectedNoteIndex(null);
      saveNotes(updatedNotes);
    }
  };

  const downloadNote = () => {
    if (selectedNoteIndex !== null && notes[selectedNoteIndex]) {
      const note = notes[selectedNoteIndex];
      const element = document.createElement("a");
      const file = new Blob([note.content], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${note.title || "note"}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const shareNote = () => {
    if (selectedNoteIndex !== null && notes[selectedNoteIndex]) {
      const note = notes[selectedNoteIndex];
      const shareText = `Title: ${note.title}\n\n${note.content}`;
      if (navigator.share) {
        navigator.share({
          title: note.title,
          text: shareText,
        });
      } else {
        alert("Sharing not supported on this browser.");
      }
    }
  };

  const { wordCountExcludingSpaces, wordCountIncludingSpaces } = useMemo(
    () => updateWordCounts(noteContent),
    [noteContent, updateWordCounts]
  );

  const isNoNoteSelected = selectedNoteIndex === null && notes.length > 0;
  const isNoNotes = notes.length === 0;

  return (
    <div className="flex">
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setIsModalVisible(false)}>
              &times;
            </span>
            <p className="text-sm">
              Your inputted details will be in temporary storage. Download or use only as a temporary memo. Don't include sensitive information like passwords or OTPs, as anyone with access to your computer can view it.
            </p>
          </div>
        </div>
      )}
      <button className="p-2 m-4 bg-blue-500 text-white rounded-lg" onClick={toggleSidebar}>
        {isSidebarOpen ? "←" : "→"}
      </button>
      <div className={`w-64 bg-gray-600 text-white p-4 ${isSidebarOpen ? "block" : "hidden"}`}>
        <button className="bg-green-500 text-white py-2 px-4 rounded w-full mb-4" onClick={createNewNote}>
          Create New Note
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 rounded border border-gray-300 text-black"
        />
        <ul className="overflow-y-auto h-96 py-2">{renderNotesList()}</ul>
      </div>
      <div className="flex-1 p-4 bg-gray-50 h-screen">
        <div className="flex flex-col-reverse gap-3 md:flex-row md:px-[10%] justify-between items-center mb-4">
          <select
            disabled={selectedNoteIndex === null}
            value={selectedFont}
            onChange={handleFontChange}
            className="p-2 border rounded bg-white"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <div className=" flex items-center justify-center gap-2">
            <button
              onClick={downloadNote}
              disabled={selectedNoteIndex === null}
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              <Download className="w-5 h-5 " />
            </button>
            <button
              onClick={shareNote}
              disabled={selectedNoteIndex === null}
              className="bg-green-500 text-white p-2 rounded disabled:opacity-50"
            >
              <Share2 className="w-5 h-5 " />
            </button>
            <button
              onClick={deleteNote}
              disabled={selectedNoteIndex === null}
              className="bg-red-500 text-white p-2 rounded disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5 " />
            </button>
          </div>
        </div>
        {isNoNotes ? (
          <div className="text-center flex flex-col justify-center items-center h-96 ">
            <h2 className="font-semibold text-gray-600 ">No notes available</h2>
            <button onClick={createNewNote} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
              Create New Note
            </button>
          </div>
        ) : isNoNoteSelected ? (
          <div className="text-center flex flex-col justify-center items-center h-96 ">
            <h2 className="font-semibold text-gray-600 ">No note selected</h2>
            <button onClick={createNewNote} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
              Create New Note
            </button>
          </div>
        ) : selectedNoteIndex !== null && notes[selectedNoteIndex] ? (
          <>
            <label>Title</label>
            <input
              type="text"
              value={noteTitle}
              onChange={handleTitleChange}
              placeholder={`Note ${selectedNoteIndex + 1}`}
              className="w-full p-2 mb-4 border rounded"
              style={{ fontFamily: selectedFont }}
            />
            <p className="text-sm text-gray-500">
              Created: {notes[selectedNoteIndex].created} | Last Edited: {notes[selectedNoteIndex].lastEdited}
            </p>
            <textarea
              value={noteContent}
              onChange={handleContentChange}
              rows={10}
              className="w-full p-2 border rounded mt-4"
              style={{ fontFamily: selectedFont }}
            />
            <p>Word count (excluding spaces): {wordCountExcludingSpaces}</p>
            <p>Word count (including spaces): {wordCountIncludingSpaces}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NotePad;
