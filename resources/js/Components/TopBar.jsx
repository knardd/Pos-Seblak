import React, { useState } from "react";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import {
    Search,
    LogOut,
    LayoutDashboard,
    ChevronDown,
    Info,
    Utensils,
} from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";

export default function TopBar({ search, onSearchChange, isAdmin, expectedCash = 0 }) {
    const { auth } = usePage().props;
    const [showClosingModal, setShowClosingModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        total_cash_reported: "",
        notes: "",
    });

    const difference = data.total_cash_reported ? Number(data.total_cash_reported) - expectedCash : 0;

    const handleLogoutClick = (e) => {
        if (auth?.user?.role === "cashier") {
            e.preventDefault();
            setShowClosingModal(true);
        }
    };

    const submitClosing = (e) => {
        e.preventDefault();
        post(route("closing.store"), {
            onSuccess: () => {
                reset();
                router.post(route("logout"));
            },
        });
    };

    return (
        <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between sticky top-0 z-40">
            {/* LEFT SIDE: LOGO */}
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                    <Utensils className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[13px] font-bold tracking-tight leading-none text-gray-900">
                        SEBLAK<span className="text-blue-600">KU</span>
                    </h1>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 leading-none">
                        Terminal
                    </span>
                </div>

                <div className="h-5 w-px bg-gray-100 mx-1 hidden md:block" />

                {(isAdmin || auth?.user?.role === "cashier") && (
                    <Link
                        href={
                            isAdmin
                                ? route("dashboard")
                                : route("expense.index")
                        }
                        className="flex items-center gap-1.5 px-2 py-1 text-gray-500 hover:text-blue-600 text-[10px] font-bold transition-colors"
                    >
                        <LayoutDashboard size={12} />
                        {isAdmin ? "Dashboard" : "Pengeluaran"}
                    </Link>
                )}
            </div>

            {/* MIDDLE: SEARCH */}
            <div className="flex-1 max-w-xs mx-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                        <Search size={12} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari menu..."
                        className="w-full pl-8 pr-3 py-1.25 bg-gray-50 border-transparent rounded-lg text-[11px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-gray-400 border shadow-none h-8"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* RIGHT SIDE: USER MENU */}
            <div className="flex items-center gap-2">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded-lg transition-colors group outline-none">
                            <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center font-bold text-[10px]">
                                {auth?.user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-[10px] font-bold text-gray-700 leading-none">
                                    {auth?.user?.name}
                                </p>
                            </div>
                            <ChevronDown
                                size={10}
                                className="text-gray-400 group-hover:text-blue-600 transition-colors"
                            />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                        width="40"
                        contentClasses="py-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                        <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/20 mb-1">
                            <p className="text-[11px] font-bold text-gray-800 truncate">
                                {auth?.user?.name}
                            </p>
                            <p className="text-[9px] font-medium text-gray-500 truncate mt-0.5">
                                {auth?.user?.email}
                            </p>
                        </div>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            onClick={handleLogoutClick}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 transition-colors text-left"
                        >
                            <LogOut size={12} />
                            Keluar
                        </Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>

            {/* Closing Modal */}
            <Modal
                show={showClosingModal}
                onClose={() => setShowClosingModal(false)}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">
                            Konfirmasi Tutup Kasir
                        </h2>
                        <button
                            onClick={() => setShowClosingModal(false)}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <LogOut size={20} className="rotate-180" />
                        </button>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex flex-col gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Saldo Tunai Sistem</span>
                                <span className="text-sm font-black text-blue-700">Rp {expectedCash.toLocaleString('id-ID')}</span>
                            </div>
                            {data.total_cash_reported && (
                                <div className="flex justify-between items-center pt-2 border-t border-blue-100">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Selisih (Fisik - Sistem)</span>
                                    <span className={`text-sm font-black ${difference === 0 ? 'text-green-600' : difference > 0 ? 'text-amber-600' : 'text-rose-600'}`}>
                                        {difference > 0 ? '+' : ''} Rp {difference.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            )}
                        </div>

                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 pt-2">
                            <Info size={16} className="text-blue-500" />
                            Input Uang Fisik
                        </h3>

                        <form onSubmit={submitClosing} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Total Uang Tunai di Laci (Rp)
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={data.total_cash_reported}
                                    onChange={(e) =>
                                        setData(
                                            "total_cash_reported",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                {errors.total_cash_reported && (
                                    <p className="text-rose-500 text-[10px] mt-1 font-bold">
                                        {errors.total_cash_reported}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Catatan Tambahan
                                </label>
                                <textarea
                                    placeholder="Misal: Kurang Rp 500 karena tidak ada kembalian"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowClosingModal(false)}
                                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-xs transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all disabled:bg-blue-300"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Selesaikan & Keluar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
