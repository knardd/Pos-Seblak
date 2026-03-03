import React from "react";
import { Wallet, CreditCard, X } from "lucide-react";

export default function PaymentModal({
    isOpen,
    total,
    paymentMethod,
    onPaymentMethodChange,
    amountPaid,
    onAmountPaidChange,
    changeAmount,
    onConfirm,
    onClose,
    processing,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-black text-slate-800">
                        Pembayaran
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Total Display */}
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-blue-400 font-semibold mb-1">
                            Total Pembayaran
                        </p>
                        <p className="text-2xl font-black text-blue-600">
                            Rp {total.toLocaleString()}
                        </p>
                    </div>

                    {/* Payment Method */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onPaymentMethodChange("cash")}
                            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 font-bold text-sm transition-all duration-200 ${paymentMethod === "cash" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
                        >
                            <Wallet className="w-5 h-5" /> Tunai
                        </button>
                        <button
                            onClick={() => onPaymentMethodChange("qris")}
                            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 font-bold text-sm transition-all duration-200 ${paymentMethod === "qris" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
                        >
                            <CreditCard className="w-5 h-5" /> QRIS
                        </button>
                    </div>

                    {paymentMethod === "cash" && (
                        <div>
                            <label className="text-xs font-semibold text-slate-400 block mb-1">
                                Uang Diterima (Rp)
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xl font-black text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all"
                                placeholder="0"
                                value={amountPaid}
                                onChange={(e) =>
                                    onAmountPaidChange(e.target.value)
                                }
                                autoFocus
                            />
                            {amountPaid && (
                                <div className="mt-2 flex justify-between font-bold text-xs bg-slate-50 rounded-lg p-2.5">
                                    <span className="text-slate-500">
                                        Kembalian
                                    </span>
                                    <span
                                        className={
                                            changeAmount < 0
                                                ? "text-red-500"
                                                : "text-green-600"
                                        }
                                    >
                                        Rp {changeAmount.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 font-bold text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={
                                processing ||
                                (paymentMethod === "cash" &&
                                    (!amountPaid || changeAmount < 0))
                            }
                            className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm disabled:bg-slate-200 disabled:text-slate-400 transition-all duration-200 active:scale-[0.97] hover:bg-blue-700"
                        >
                            {processing ? "Memproses..." : "Konfirmasi & Bayar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
