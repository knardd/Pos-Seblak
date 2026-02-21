import React from "react";
import { Plus } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
    const getBgColor = (cat) => {
        switch (cat) {
            case "topping":
                return "bg-orange-100";
            case "frozen":
                return "bg-blue-100";
            case "drink":
                return "bg-green-100";
            default:
                return "bg-slate-100";
        }
    };

    return (
        <button
            onClick={() => onAdd(product)}
            className={`relative p-5 rounded-2xl border-2 border-transparent hover:border-orange-500 transition-all text-left flex flex-col justify-between h-32 shadow-sm ${getBgColor(product.category)}`}
        >
            <span className="font-bold text-slate-800 leading-tight">
                {product.name}
            </span>
            <div className="flex justify-between items-end">
                <span className="text-sm font-black text-orange-700">
                    Rp {product.price.toLocaleString()}
                </span>
                <div className="bg-white/50 p-1 rounded-lg">
                    <Plus className="w-4 h-4 text-orange-700" />
                </div>
            </div>
        </button>
    );
}
