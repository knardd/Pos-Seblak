import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQty, onRemove }) {
    return (
        <div className="group relative flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-1 -mx-1 rounded-lg">
            <div className="flex-1 min-w-0">
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-[10px] leading-tight truncate">
                        {item.name}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[9px] text-gray-400 font-bold uppercase">
                            Rp {Math.round(item.price).toLocaleString("id-ID")}
                        </span>
                        <span className="text-[9px] font-black text-blue-600/60">
                            × {item.qty}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                {/* Quantity Controls */}
                <div className="flex items-center bg-white border border-gray-100 rounded-md overflow-hidden h-5 shadow-sm">
                    <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-4 h-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                        <Minus className="w-2 h-2" />
                    </button>
                    <span className="w-4 text-center font-black text-[9px] text-gray-900 leading-none">
                        {item.qty}
                    </span>
                    <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-4 h-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                        <Plus className="w-2 h-2" />
                    </button>
                </div>
                {/* Total Price & Delete */}
                <div className="flex items-center gap-2 min-w-[60px] justify-end">
                    <span className="font-black text-gray-900 text-[10px] tracking-tight leading-none">
                        {Math.round(item.qty * item.price).toLocaleString(
                            "id-ID",
                        )}
                    </span>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded-md transition-colors group"
                        title="Hapus item"
                    >
                        <Trash2
                            size={14}
                            strokeWidth={2.5}
                            className="shrink-0"
                        />
                    </button>
                </div>{" "}
            </div>
        </div>
    );
}
