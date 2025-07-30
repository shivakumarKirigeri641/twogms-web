import React, { useState } from "react";

const DropDown = ({ items, setselectedIndex, setselectedItem }) => {
  const [currentindex, setcurrentindex] = useState(0);
  const [showSuggessions, setshowSuggessions] = useState(false);
  return (
    <div className="relative w-full m-1 p-1">
      <button
        className="w-[99%] rounded-2xl p-2 text-left cursor-pointer bg-gray-50"
        onClick={() => {
          setshowSuggessions(!showSuggessions);
        }}
      >
        <div className="flex justify-between items-center">
          <p>{items[currentindex]}</p>
          <img className="w-7" src={require("../../images/up-down.svg")}></img>
        </div>
      </button>
      {/**overlay */}
      {showSuggessions && (
        <div
          className="fixed inset-0 z-10 bg-transparent w-full h-full"
          onClick={() => {
            setshowSuggessions(false);
          }}
        ></div>
      )}
      {showSuggessions && (
        <div className="absolute left-2 top-13 bg-gray-50 w-[97%] mx-auto rounded-md z-20">
          <ul>
            {items.map((x, index) => (
              <li
                key={index}
                className="p-1 border-b border-slate-200 hover:underline underline-offset-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-semibold rounded"
                onClick={() => {
                  setselectedIndex(index);
                  setselectedItem(items[index]);
                  setcurrentindex(index);
                  setshowSuggessions(false);
                }}
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
