import React from "react";
import { Flame } from "lucide-react";

export default function SpicyLevelSelector({
    levels,
    selectedLevel,
    onSelect,
}) {
    return (
        <div className="p-4 bg-orange-50 border-t border-orange-100">
            <label className="text-[10px] font-black uppercase text-orange-400 mb-2 block flex items-center gap-1">
                <Flame className="w-3 h-3" /> Pilih Level Pedas
            </label>
            <div className="grid grid-cols-4 gap-2">
                {levels.map((l) => (
                    <button
                        key={l.id}
                        onClick={() => onSelect(l)}
                        className={`py-2 text-xs font-bold rounded-lg border-2 transition-all ${
                            selectedLevel?.id === l.id
                                ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-100"
                                : "bg-white text-orange-600 border-orange-200 hover:border-orange-300"
                        }`}
                    >
                        {l.level_name}
                    </button>
                ))}
            </div>
            {selectedLevel?.extra_price > 0 && (
                <p className="text-[10px] text-orange-500 mt-2 font-bold italic">
                    * Tambahan biaya Rp{" "}
                    {selectedLevel.extra_price.toLocaleString()}
                </p>
            )}
        </div>
    );
}
