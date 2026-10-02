import { useState } from "react";

export default function Switch({ value, onChange }) {
  return (
    <div className="flex items-center justify-center h-full text-white">
      <div
        role="switch"
        aria-checked={value}
        onClick={onChange}
        className={`border border-gray-300 h-8 w-16 rounded-full p-0.75 cursor-pointer ${value ? "bg-purple-200 border border-purple-600" : "bg-transparent"}`}
      >
        <div
          className={`h-6 w-6 rounded-full transition-transform duration-300 ${value ? "bg-purple-600 translate-x-8" : "bg-gray-200 translate-x-0"}`}
        ></div>
      </div>
    </div>
  );
}
