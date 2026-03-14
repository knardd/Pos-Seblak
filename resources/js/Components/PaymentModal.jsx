import React from "react";
import { Wallet, CreditCard, X, CheckCircle2 } from "lucide-react";

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

    const quickPayOptions = [
        10000, 15000, 20000, 25000, 30000, 35000, 50000, 100000,
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[360px] rounded-xl shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h3 className="text-[14px] font-bold text-slate-800 tracking-tight">
                            Konfirmasi Pembayaran
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {/* Total Display */}
                    <div className="bg-blue-600 rounded-lg p-4 text-center shadow-sm relative overflow-hidden">
                        <p className="text-[10px] text-blue-100 font-bold uppercase tracking-wider mb-1 opacity-90">
                            Total Tagihan
                        </p>
                        <p className="text-[22px] font-black text-white tracking-tight leading-none">
                            <span className="text-[14px] font-bold mr-1 opacity-80">
                                Rp
                            </span>
                            {total.toLocaleString("id-ID")}
                        </p>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-0.5">
                            Metode Bayar
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onPaymentMethodChange("cash")}
                                className={`py-2.5 px-3 rounded-lg border flex flex-col items-center gap-1.5 font-bold text-[12px] transition-all relative ${
                                    paymentMethod === "cash"
                                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                            >
                                <Wallet
                                    className={`w-4 h-4 ${paymentMethod === "cash" ? "text-blue-600" : "text-slate-400"}`}
                                />
                                Tunai
                                {paymentMethod === "cash" && (
                                    <CheckCircle2 className="absolute top-1.5 right-1.5 w-3 h-3 text-blue-600" />
                                )}
                            </button>
                            <button
                                onClick={() => onPaymentMethodChange("qris")}
                                className={`py-2.5 px-3 rounded-lg border flex flex-col items-center gap-1.5 font-bold text-[12px] transition-all relative ${
                                    paymentMethod === "qris"
                                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                            >
                                <CreditCard
                                    className={`w-4 h-4 ${paymentMethod === "qris" ? "text-blue-600" : "text-slate-400"}`}
                                />
                                QRIS
                                {paymentMethod === "qris" && (
                                    <CheckCircle2 className="absolute top-1.5 right-1.5 w-3 h-3 text-blue-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {paymentMethod === "cash" && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 ml-0.5">
                                    Uang Diterima
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-[12px] font-bold text-slate-400">
                                        Rp
                                    </span>
                                    <input
                                        type="number"
                                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[16px] font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                        placeholder="0"
                                        value={amountPaid}
                                        onChange={(e) =>
                                            onAmountPaidChange(e.target.value)
                                        }
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Quick Pay Options */}
                            <div className="grid grid-cols-4 gap-1.5">
                                {quickPayOptions.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() =>
                                            onAmountPaidChange(
                                                amount.toString(),
                                            )
                                        }
                                        className="py-1.5 text-[10px] font-bold bg-white text-slate-500 border border-slate-200 rounded-md hover:border-blue-500 hover:text-blue-600 transition-all"
                                    >
                                        {amount >= 1000
                                            ? `${amount / 1000}k`
                                            : amount}
                                    </button>
                                ))}
                            </div>

                            {amountPaid && (
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Kembalian
                                    </span>
                                    <span
                                        className={`text-[14px] font-black tracking-tight ${changeAmount < 0 ? "text-rose-500" : "text-emerald-600"}`}
                                    >
                                        <span className="text-[10px] mr-1 font-bold opacity-70">
                                            Rp
                                        </span>
                                        {changeAmount.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t border-slate-50 mt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 text-[12px] font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
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
                            className="flex-[2] py-2 bg-blue-600 text-white rounded-lg font-bold text-[12px] transition-all active:scale-[0.98] hover:bg-blue-700 shadow-sm disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none"
                        >
                            {processing ? "Memproses..." : "Konfirmasi Bayar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
