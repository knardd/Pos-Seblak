import React from "react";
import { Plus } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
    const categoryName = product.category?.name || product.category || "";
    const isOutOfStock = product.stock <= 0;

    return (
        <button
            disabled={isOutOfStock}
            onClick={() => onAdd(product)}
            className={`group relative bg-white rounded-xl border border-gray-100 transition-all text-left p-3 flex flex-col justify-between h-[100px] overflow-hidden ${
                isOutOfStock
                    ? "opacity-60 cursor-not-allowed grayscale"
                    : "hover:border-blue-300 hover:shadow-sm hover:shadow-blue-50 active:scale-[0.98]"
            }`}
        >
            <div className="space-y-1">
                <div className="flex items-start justify-between gap-1.5">
                    <span className="font-bold text-gray-800 text-[11px] leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <span className="text-[12px] font-black text-gray-900 tracking-tight">
                    <span className="text-[9px] text-gray-400 mr-0.5 font-bold uppercase">
                        Rp
                    </span>
                    {Math.round(product.price).toLocaleString("id-ID")}
                </span>
                {!isOutOfStock && (
                    <div className="w-5 h-5 rounded-lg bg-gray-50 group-hover:bg-blue-600 flex items-center justify-center transition-all border border-gray-100 group-hover:border-blue-600">
                        <Plus className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                )}
            </div>
        </button>
    );
}
