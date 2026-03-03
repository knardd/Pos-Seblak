import React from "react";
import { ShoppingCart, Flame, Printer } from "lucide-react";
import CartItem from "./CartItem";

export default function CartSidebar({
    cart,
    levels,
    selectedLevel,
    onLevelChange,
    onUpdateQty,
    onRemove,
    onResetCart,
    onPayClick,
    subtotal,
    total,
    processing,
}) {
    const cartCount = cart.reduce((a, i) => a + i.qty, 0);

    return (
        <div className="w-[340px] bg-white border-l border-slate-200 flex flex-col shrink-0">
            {/* Cart Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-blue-600 shrink-0">
                <h2 className="text-sm font-bold flex items-center gap-2 text-white">
                    <ShoppingCart className="w-4 h-4" />
                    Pesanan
                    {cartCount > 0 && (
                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </h2>
                <button
                    onClick={onResetCart}
                    className="text-[10px] font-bold text-blue-200 hover:text-white transition-colors tracking-wider"
                >
                    RESET
                </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300">
                        <ShoppingCart className="w-10 h-10 mb-2 opacity-30" />
                        <p className="italic text-xs">Pilih menu di kiri</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQty={onUpdateQty}
                            onRemove={onRemove}
                        />
                    ))
                )}
            </div>

            {/* Spicy Level */}
            <div className="px-4 py-3 bg-blue-50/60 border-t border-blue-100/50 shrink-0">
                <label className="text-[10px] font-bold uppercase text-blue-400 mb-1.5 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Level Pedas
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                    {levels.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => onLevelChange(l)}
                            className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-200 ${selectedLevel?.id === l.id ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-blue-600 border-blue-200 hover:border-blue-400"}`}
                        >
                            {l.level_name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary & Pay */}
            <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
                <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString()}</span>
                    </div>
                    {selectedLevel?.extra_price > 0 && (
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Level ({selectedLevel.level_name})</span>
                            <span>
                                + Rp{" "}
                                {selectedLevel.extra_price.toLocaleString()}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200">
                        <span className="text-xs font-bold text-slate-500 tracking-wider">
                            TOTAL
                        </span>
                        <span className="text-xl font-black text-blue-600">
                            Rp {total.toLocaleString()}
                        </span>
                    </div>
                </div>
                <button
                    disabled={cart.length === 0 || processing}
                    onClick={onPayClick}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                    <Printer className="w-4 h-4" /> BAYAR
                </button>
            </div>
        </div>
    );
}
