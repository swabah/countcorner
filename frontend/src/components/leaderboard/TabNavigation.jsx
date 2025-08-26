import React from "react";
import "./leaderboard.css";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex justify-center gap-4 pt-5 mb-8 border-b-2 border-gray-300 min-w-max px-4">
        <button
          onClick={() => setActiveTab("ranking")}
          className={`tab-button px-6 py-2 font-semibold rounded-t-md whitespace-nowrap transition-all duration-200 ${
            activeTab === "ranking"
              ? "bg-gray-300 text-black border-t-2 border-accent shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          Ranking
        </button>
        <button
          onClick={() => setActiveTab("today")}
          className={`tab-button px-6 py-2 font-semibold rounded-t-md whitespace-nowrap transition-all duration-200 ${
            activeTab === "today"
              ? "bg-gray-300 text-black border-t-2 border-accent shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          Today (
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          )
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
