import React from "react";

export default function CategoryTabs({ categories, activeTab, onTabChange }) {
    return (
        <div className="px-6 pt-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
            <button
                onClick={() => onTabChange("all")}
                className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 whitespace-nowrap ${activeTab === "all" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-500 hover:text-blue-600 border border-slate-200"}`}
            >
                Semua
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onTabChange(cat.name.toLowerCase())}
                    className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 whitespace-nowrap ${activeTab === cat.name.toLowerCase() ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-500 hover:text-blue-600 border border-slate-200"}`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
