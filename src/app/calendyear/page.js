"use client";

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Edit2, Trash2, PanelLeftClose, PanelLeft } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [reminderText, setReminderText] = useState('');
  const [editingReminder, setEditingReminder] = useState(null);

  useEffect(() => {
    const getRemindersFromLocalStorage = () => {
      if (typeof window !== 'undefined') {
        const storedReminders = localStorage.getItem('reminders');
        return storedReminders ? JSON.parse(storedReminders) : [];
      }
      return [];
    };

    setReminders(getRemindersFromLocalStorage());
  }, []);

  const saveRemindersToLocalStorage = (reminders) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reminders', JSON.stringify(reminders));
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push(day);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const daysInMonth = getDaysInMonth(currentDate);

  const addReminder = () => {
    if (reminderText.trim() === '') return;

    const newReminder = {
      id: Date.now(),
      date: formatDate(selectedDay || currentDate),
      text: reminderText
    };

    setReminders([...reminders, newReminder]);
    setReminderText('');
    setSelectedDay(null);
    saveRemindersToLocalStorage([...reminders, newReminder]);
  };

  const editReminder = (reminder) => {
    setEditingReminder(reminder);
    setReminderText(reminder.text);
  };

  const updateReminder = () => {
    if (reminderText.trim() === '') return;

    const updatedReminders = reminders.map(r => {
      if (r.id === editingReminder.id) {
        return {
          ...r,
          text: reminderText
        };
      }
      return r;
    });

    setReminders(updatedReminders);
    setReminderText('');
    setEditingReminder(null);
    saveRemindersToLocalStorage(updatedReminders);
  };

  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter(r => r.id !== id);
    setReminders(updatedReminders);
    saveRemindersToLocalStorage(updatedReminders);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };


  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-5 p-6 relative min-h-[700px]">
      {/* Left Panel */}
      <div className={`w-full lg:w-1/3 bg-gray-100 rounded-lg p-5 mr-8 relative transition-all `}>
        <h3 className="text-xl font-semibold text-gray-800 mb-5">Upcoming Reminders</h3>
        <div className="overflow-y-auto max-h-[600px] pr-2">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="bg-white p-4 rounded-md mb-3 shadow-sm transition-all hover:translate-x-1 hover:shadow-md">
              <div className="font-bold text-blue-500 text-sm mb-2">{formatDisplayDate(new Date(reminder.date))}</div>
              <p>{reminder.text}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-blue-500 hover:bg-blue-100 p-2 rounded-md" onClick={() => editReminder(reminder)}>
                  <Edit2 size={16} />
                </button>
                <button className="text-red-500 hover:bg-red-100 p-2 rounded-md" onClick={() => deleteReminder(reminder.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Calendar Content */}
      <div className="w-full mt-8 lg:mt-0">
        <div className="flex justify-between items-center mb-5">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
            <ChevronLeft size={20} />
          </button>
          <div className="text-xl font-semibold text-gray-800">{formatMonthYear(currentDate)}</div>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-500 font-semibold">{day}</div>
          ))}
          {daysInMonth.map((date) => {
            const dayReminders = reminders.filter(r => r.date === formatDate(date));
            const isCurrentDay = isToday(date);

            return (
              <div
                key={date.toString()}
                onClick={() => setSelectedDay(date)}
                className={`relative p-2 m-1 pt-5 text-center rounded-lg transition-all ${isCurrentDay ? 'bg-blue-500 text-white' : ''} ${selectedDay && formatDate(selectedDay) === formatDate(date) ? 'border-2 border-blue-500' : ''}`}
              >
                <div className="font-bold">{date.getDate()}</div>
                {dayReminders.length > 0 && <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mt-1"></div>}
                <div className="text-xs mt-2">
                  {dayReminders.map(reminder => (
                    <div key={reminder.id} className="text-xs text-gray-700 bg-blue-100 rounded-md px-2 py-1 mb-1">{reminder.text}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {!editingReminder && (
          <div className="bg-gray-100 p-5 rounded-lg mt-5">
            <h4 className="text-lg text-gray-800 mb-4">Add Reminder</h4>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter reminder text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md"
              />
              <button onClick={addReminder} className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">Add</button>
            </div>
          </div>
        )}

        {editingReminder && (
          <div className="bg-gray-100 p-5 rounded-lg mt-5">
            <h4 className="text-lg text-gray-800 mb-4">Edit Reminder</h4>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter reminder text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md"
              />
              <button onClick={updateReminder} className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">Update</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
