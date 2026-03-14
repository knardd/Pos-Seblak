import React from "react";

export default function CategoryTabs({ categories, activeTab, onTabChange }) {
    return (
        <div className="px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide shrink-0 items-center bg-white border-b border-gray-100 sticky top-0 z-30">
            <button
                onClick={() => onTabChange("all")}
                className={`px-3 py-1.25 rounded-md font-bold text-[10px] uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === "all" 
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-100" 
                        : "bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 border border-transparent"
                }`}
            >
                Semua
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onTabChange(cat.name.toLowerCase())}
                    className={`px-3 py-1.25 rounded-md font-bold text-[10px] uppercase tracking-wider transition-all whitespace-nowrap ${
                        activeTab === cat.name.toLowerCase() 
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-100" 
                            : "bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 border border-transparent"
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
