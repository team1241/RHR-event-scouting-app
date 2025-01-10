import React from "react";
import { Input } from"~/components/ui/input";

export default function thejasPage() {
  return(
    <div className="bg-gray-900 text-white min-h-screen p-8">
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
      <div className="bg-gray-800 p-4 rounded-lg col-span-2">
        <h2 className="text-xl font-bold mb-4">AUTONOMOUS</h2>
        <div className="relative bg-gray-600 p-4 rounded-lg h-[500px]">

        </div>
      </div>

  {/* Right Section: Labels and Checkboxes */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Match Info</h2>
        <div className="space-y-4">
          {/* Buttons with check marks or X */}
          {[
            { label: "PRELOAD SCORED", checked: true },
            { label: "INTAKE SELECTED", checked: false },
            { label: "INTAKE OTHER", checked: false },
            { label: "SCORE SELECTED", checked: false },
            { label: "SCORE OTHER", checked: false },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
            >
              <span>{item.label}</span>
            </div>
          ))}
          {/* Proceed Button */}
          <button className="w-full bg-green-500 text-black py-2 rounded-lg font-bold">
            PROCEED
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
