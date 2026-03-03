import React from "react";
import { Plus } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
    const getBadge = (cat) => {
        switch (cat?.toLowerCase()) {
            case "topping":
                return "bg-amber-100 text-amber-700";
            case "frozen":
                return "bg-sky-100 text-sky-700";
            case "drink":
                return "bg-emerald-100 text-emerald-700";
            default:
                return "bg-slate-100 text-slate-600";
        }
    };

    const categoryName = product.category?.name || product.category || "";

    return (
        <button
            onClick={() => onAdd(product)}
            className="group relative bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/8 transition-all duration-200 text-left p-4 flex flex-col justify-between h-[110px] active:scale-[0.97]"
        >
            <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-slate-700 text-sm leading-tight line-clamp-2">
                    {product.name}
                </span>
                {categoryName && (
                    <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getBadge(categoryName)}`}
                    >
                        {categoryName}
                    </span>
                )}
            </div>
            <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-blue-600">
                    Rp {Math.round(product.price).toLocaleString()}
                </span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-200">
                    <Plus className="w-3.5 h-3.5 text-blue-500 group-hover:text-white transition-colors" />
                </div>
            </div>
        </button>
    );
}
