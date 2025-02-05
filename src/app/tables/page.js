"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";



// TableCard Component
const TableCard = ({ number, onSelect }) => {
  const examples = Array.from({ length: 3 }, (_, i) => ({
    multiplier: i + 1,
    result: number * (i + 1),
  }));

  return (
    <motion.div
      layoutId={`card-${number}`}
      className="bg-white border border-gray-300 rounded-lg p-4 text-center cursor-pointer shadow-md transition-transform transform hover:scale-105"
      onClick={() => onSelect(number)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="font-semibold text-lg mb-2">Table {number}</h3>
      <div className="space-y-1">
        {examples.map(({ multiplier, result }) => (
          <div key={multiplier} className="text-sm text-gray-600">
            {number} × {multiplier} = {result}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Modal Component
const Modal = ({ table, isOpen, onClose }) => {
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyPress]);

  if (!table || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg w-full max-w-lg p-6 overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Multiplication Table of {table}</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="p-2 bg-gray-100 text-center rounded shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.01 },
                }}
              >
                {table} × {i + 1} = {table * (i + 1)}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Multiplication Master Component
const MultiplicationMaster = () => {
  const [tableRange, setTableRange] = useState(20);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRangeChange = (e) => {
    setTableRange(Math.min(Math.max(Number(e.target.value), 1), 100));
  };

  const randomizeTables = () => {
    const newRange = Math.floor(Math.random() * 100) + 1;
    setTableRange(newRange);
  };

  const handleTableSelect = (number) => {
    setSelectedTable(number);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-center text-3xl font-bold mb-6">MULTIPLICATION MASTER</h1>

        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <label htmlFor="tableRange" className="font-medium">Tables Range</label>
            <input
              id="tableRange"
              type="range"
              min="1"
              max="100"
              value={tableRange}
              onChange={handleRangeChange}
              className="w-full md:w-64"
            />
            <span className="font-medium text-gray-600">{tableRange} Tables</span>
          </div>

          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={randomizeTables}
          >
            Randomize
          </motion.button>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          {Array.from({ length: tableRange }, (_, i) => (
            <TableCard 
              key={i + 1} 
              number={i + 1} 
              onSelect={handleTableSelect} 
            />
          ))}
        </motion.div>
      </motion.div>

      <Modal
        table={selectedTable}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MultiplicationMaster;
