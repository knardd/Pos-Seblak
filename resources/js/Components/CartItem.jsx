import React from "react";
import { Minus, Plus, X } from "lucide-react";

export default function CartItem({ item, onUpdateQty, onRemove }) {
    return (
        <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
            <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-700 text-xs truncate">
                    {item.name}
                </p>
                <p className="text-xs text-blue-600 font-semibold">
                    Rp {Math.round(item.price).toLocaleString()}
                </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5">
                <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors"
                >
                    <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center font-bold text-xs text-slate-700">
                    {item.qty}
                </span>
                <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors"
                >
                    <Plus className="w-3 h-3" />
                </button>
            </div>
            <span className="font-bold text-slate-800 text-xs w-20 text-right">
                Rp {Math.round(item.qty * item.price).toLocaleString()}
            </span>
            <button
                onClick={() => onRemove(item.id)}
                className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}
