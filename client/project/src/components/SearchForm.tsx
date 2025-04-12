import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const ageOptions: string[] = [
  "<1 year old", "1", "2", "3", "4", "5", "6", "7", "8",
  "9", "10", "11", "12", "13", "14", "15", "16", "17"
];

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [childrenAges, setChildrenAges] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const maxChildren = 5;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleChildrenChange = (value: number) => {
    const num = Math.max(0, Math.min(maxChildren, value));
    setChildren(num);
    setChildrenAges(Array(num).fill("<1 year old"));
  };

  const handleCheckInChange = (date: Date | null) => {
    setCheckInDate(date);
    if (date && checkOutDate && checkOutDate <= date) {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const handleCheckOutChange = (date: Date | null) => {
    if (date && checkInDate && date <= checkInDate) return;
    setCheckOutDate(date);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      destination: destination || "Mumbai",
      checkIn: checkInDate ? checkInDate.toISOString().split("T")[0] : "",
      checkOut: checkOutDate ? checkOutDate.toISOString().split("T")[0] : "",
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    });
    navigate(`/hotels?${searchParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl border-white/40 w-full max-w-7xl mx-auto mt-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Destination */}
        <input
          type="text"
          placeholder="Destination or hotel"
          className="h-12 w-full px-3 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-500"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Check-in Date */}
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInChange}
          placeholderText="Check-in"
          minDate={today}
          className="h-12 w-full px-3 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-500"
        />

        {/* Check-out Date */}
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutChange}
          placeholderText="Check-out"
          minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : today}
          className="h-12 w-full px-3 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-500"
        />

        {/* Guests Dropdown */}
        <div className="relative w-full" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="h-12 w-full px-3 rounded-lg text-left text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            {adults} adults, {children} children, {rooms} room
          </button>

          {showOptions && (
            <div className="absolute top-full left-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white text-black p-4 rounded shadow-xl z-50">
              {/* Adults */}
              <div className="flex items-center justify-between mb-2">
                <span>Adults</span>
                <div className="flex items-center space-x-2">
                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{adults}</span>
                  <button type="button" onClick={() => setAdults(adults + 1)} className="px-2 bg-gray-200 rounded">+</button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between mb-2">
                <span>Children</span>
                <div className="flex items-center space-x-2">
                  <button type="button" onClick={() => handleChildrenChange(children - 1)} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{children}</span>
                  <button type="button" onClick={() => handleChildrenChange(children + 1)} className="px-2 bg-gray-200 rounded">+</button>
                </div>
              </div>

              {/* Children Ages */}
              {children > 0 && (
                <div className="mb-2">
                  <p className="font-semibold mb-1">Ages of children:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {childrenAges.map((age, idx) => (
                      <select
                        key={idx}
                        value={age}
                        className="p-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        onChange={(e) => {
                          const updated = [...childrenAges];
                          updated[idx] = e.target.value;
                          setChildrenAges(updated);
                        }}
                      >
                        {ageOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              )}

              {/* Rooms */}
              <div className="flex items-center justify-between">
                <span>Rooms</span>
                <div className="flex items-center space-x-2">
                  <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{rooms}</span>
                  <button type="button" onClick={() => setRooms(rooms + 1)} className="px-2 bg-gray-200 rounded">+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-12 w-full px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        >
          Search →
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
