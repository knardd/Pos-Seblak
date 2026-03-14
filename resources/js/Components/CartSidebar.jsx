import React from "react";
import { ShoppingBag, Flame, Trash2, ArrowRight } from "lucide-react";
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
        <div className="w-[300px] bg-white border-l border-gray-100 flex flex-col shrink-0 z-30 shadow-[-10px_0_20px_rgba(0,0,0,0.01)]">
            {/* Cart Header */}
            <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex flex-col">
                    <h2 className="text-[12px] font-bold text-gray-900 flex items-center gap-1.5">
                        <ShoppingBag className="w-3 h-3 text-blue-600" />
                        Pesanan
                    </h2>
                    <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                        {cartCount} Items
                    </span>
                </div>
                {cart.length > 0 && (
                    <button
                        onClick={onResetCart}
                        className="p-1 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        title="Reset"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-3 py-1 custom-scrollbar">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-40">
                        <ShoppingBag className="w-8 h-8 text-gray-200 mb-2" />
                        <p className="text-[10px] font-bold text-gray-400">
                            Keranjang Kosong
                        </p>
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

            {/* Spicy Level Selection */}
            <div className="px-4 py-3 bg-gray-50/30 border-t border-gray-100/50">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 text-orange-500" /> Pedas
                    </label>
                </div>
                <div className="grid grid-cols-4 gap-1">
                    {levels.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => onLevelChange(l)}
                            className={`py-1 text-[9px] font-bold rounded-lg border transition-all ${
                                selectedLevel?.id === l.id
                                    ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100"
                                    : "bg-white text-gray-400 border-gray-100 hover:border-blue-200 hover:text-blue-600"
                            }`}
                        >
                            {l.level_name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary & Checkout */}
            <div className="px-4 py-4 border-t border-gray-100 bg-white">
                <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                        <span>Subtotal</span>
                        <span className="text-gray-800">
                            Rp {subtotal.toLocaleString("id-ID")}
                        </span>
                    </div>
                    {selectedLevel?.extra_price > 0 && (
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                            <span>{selectedLevel.level_name}</span>
                            <span className="text-gray-800">
                                Rp{" "}
                                {selectedLevel.extra_price.toLocaleString(
                                    "id-ID",
                                )}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                        <span> Total Bayar</span>
                        <span className="text-gray-800">
                            Rp {total.toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>

                <button
                    disabled={cart.length === 0 || processing}
                    onClick={onPayClick}
                    className="group w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold text-[12px] hover:bg-blue-700 active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-300 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                    Checkout
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}
