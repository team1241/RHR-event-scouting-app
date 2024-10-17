import React from "react";
import { Input } from "~/components/ui/input";

export default function thejasPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        {/* Left Section: The map with labeled areas */}
        <div className="bg-gray-800 p-4 rounded-lg col-span-2">
          <h2 className="text-xl font-bold mb-4">TELE-OP SCREEN</h2>
          {/* Map */}
          <div className="relative bg-gray-600 p-4 rounded-lg h-[500px] grid grid-cols-4 grid-rows-2 gap-0">
            {/* Areas: A to H with specific colors */}
            <div className="bg-yellow-500 flex justify-center items-center text-white font-bold">
              B
            </div>
            <div className="bg-green-600 flex justify-center items-center text-white font-bold">
              C
            </div>
            <div className="bg-blue-500 flex justify-center items-center text-white font-bold">
              E
            </div>
            <div className="bg-pink-600 flex justify-center items-center text-white font-bold">
              G
            </div>
            <div className="bg-pink-600 flex justify-center items-center text-white font-bold">
              A
            </div>
            <div className="bg-red-700 flex justify-center items-center text-white font-bold">
              D
            </div>
            <div className="bg-yellow-500 flex justify-center items-center text-white font-bold">
              F
            </div>
            <div className="bg-green-600 flex justify-center items-center text-white font-bold">
              H
            </div>
          </div>
        </div>

        {/* Right Section: Labels and Checkboxes */}
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Match Info</h2>
          {/* Labels above buttons */}
          <div className="text-center mb-2">
            <p>MATCH NUMBER</p>
            <p>TEAM SCOUTING</p>
            <p>SCOUTER NAME</p>
          </div>
          {/* Buttons with labels and X marks */}
          <div className="space-y-4 w-full">
            {[
              { label: "INTAKE SELECTED", checked: true },
              { label: "SCORE SELECTED", checked: false },
              { label: "DEFENSE PLAYED", checked: false },
              { label: "MECHANISM BROKEN", checked: false },
              { label: "DIED", checked: false },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-green-500 p-3 rounded-lg text-black font-bold"
              >
                <span>{item.label}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    item.checked
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.checked ? "✔" : "X"}
                </div>
              </div>
            ))}
          </div>
          {/* Proceed Button */}
          <button className="w-full bg-green-500 text-black py-3 rounded-lg font-bold mt-6">
            PROCEED
          </button>
          {/* Timer text at the bottom */}
          <div className="text-center mt-4">
            <p>TIMER</p>
          </div>
        </div>
      </div>
    </div>
  );
}
