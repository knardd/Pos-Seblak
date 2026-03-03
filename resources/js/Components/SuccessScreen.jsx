import React from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessScreen({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop - Memberikan efek blur agar fokus ke modal */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center transform animate-in zoom-in-95 duration-300">
                {/* Icon Container with soft background */}
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50/50">
                    <CheckCircle className="w-12 h-12" />
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Berhasil!
                </h2>
                <p className="text-slate-500 font-medium mb-8">
                    Transaksi Anda telah berhasil tercatat di sistem.
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-wider"
                >
                    Pesanan Baru
                </button>
            </div>
        </div>
    );
}
