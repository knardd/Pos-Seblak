import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQty, onRemove }) {
    return (
        <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex justify-between items-start">
                <span className="font-bold text-sm text-slate-700">
                    {item.name}
                </span>
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-slate-300 hover:text-red-500"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
                    <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-1 hover:bg-slate-100 rounded text-orange-600"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                        {item.qty}
                    </span>
                    <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-1 hover:bg-slate-100 rounded text-orange-600"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <span className="font-black text-slate-800 text-sm">
                    Rp {(item.qty * item.price).toLocaleString()}
                </span>
            </div>
        </div>
    );
}
