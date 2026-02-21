import React from "react";
import { Utensils, Coffee, Package, Grid } from "lucide-react";

export default function CategoryTabs({ categories, activeTab, onTabChange }) {
    // Fungsi untuk memberikan icon berdasarkan nama kategori secara dinamis
    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes("minum")) return <Coffee className="w-4 h-4" />;
        if (n.includes("frozen")) return <Package className="w-4 h-4" />;
        return <Utensils className="w-4 h-4" />;
    };

    return (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
                onClick={() => onTabChange("all")}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-sm ${
                    activeTab === "all"
                        ? "bg-orange-600 text-white"
                        : "bg-white text-slate-500 hover:bg-slate-50"
                }`}
            >
                <Grid className="w-4 h-4" />
                Semua
            </button>

            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onTabChange(cat.name.toLowerCase())}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-sm ${
                        activeTab === cat.name.toLowerCase()
                            ? "bg-orange-600 text-white"
                            : "bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    {getIcon(cat.name)}
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
