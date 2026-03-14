import React from "react";
import { CheckCircle, Printer, ShoppingBag } from "lucide-react";
import Receipt from "./Receipt";

export default function SuccessScreen({ isOpen, onClose, transactionData }) {
    if (!isOpen) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Receipt Component (Hidden on screen, visible on print) */}
            {transactionData && (
                <Receipt
                    items={transactionData.cart}
                    total={transactionData.total}
                    amountPaid={transactionData.amountPaid}
                    changeAmount={transactionData.changeAmount}
                    selectedLevel={transactionData.selectedLevel}
                />
            )}

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-[340px] rounded-xl p-5 shadow-xl text-center transform animate-in zoom-in-95 duration-200 border border-slate-100 overflow-hidden">
                {/* Subtle success background accent */}

                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                    <CheckCircle className="w-7 h-7" />
                </div>

                <h2 className="text-[16px] font-bold text-slate-800 mb-1">
                    Transaksi Berhasil
                </h2>
                <p className="text-[12px] text-slate-400 font-medium mb-5">
                    Data transaksi telah tersimpan di sistem.
                </p>

                {/* Info Pembayaran */}
                {transactionData && (
                    <div className="bg-slate-50/50 rounded-lg p-3.5 mb-5 border border-slate-100 space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-slate-400 uppercase tracking-wider">
                                Total Harga
                            </span>
                            <span className="text-slate-700">
                                Rp{" "}
                                {transactionData.total.toLocaleString("id-ID")}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-slate-400 uppercase tracking-wider">
                                {transactionData.paymentMethod === "cash"
                                    ? "Tunai"
                                    : "QRIS"}
                            </span>
                            <span className="text-slate-700">
                                Rp{" "}
                                {Number(
                                    transactionData.amountPaid,
                                ).toLocaleString("id-ID")}
                            </span>
                        </div>
                        <div className="border-t border-slate-200/60 pt-2.5 mt-1 flex justify-between items-center">
                            <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                                Kembalian
                            </span>
                            <span className="text-emerald-600 font-black text-[16px] tracking-tight">
                                <span className="text-[11px] mr-0.5 font-bold">
                                    Rp
                                </span>
                                {transactionData.changeAmount.toLocaleString(
                                    "id-ID",
                                )}
                            </span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={handlePrint}
                        className="w-full py-2.5 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-lg font-bold text-[12px] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <Printer className="w-4 h-4" />
                        Cetak Struk
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[12px] transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm shadow-blue-100"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Pesanan Baru
                    </button>
                </div>
            </div>
        </div>
    );
}
