import React, { useState } from "react";
import {
    Utensils,
    Soup,
    LayoutDashboard,
    Menu,
    User,
    LogOut,
    Flame,
    ShoppingBag,
    Settings,
    Users,
    X,
    Box,
    History,
    PieChart,
    Receipt,
    Info,
} from "lucide-react";
import { Link, usePage, Head, useForm, router } from "@inertiajs/react";
import SideNavItem from "@/Components/SideNavItem";
import Modal from "@/Components/Modal";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingMobileMenu, setShowingMobileMenu] = useState(false);
    const [showClosingModal, setShowClosingModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        total_cash_reported: "",
        notes: "",
    });

    const handleLogoutClick = (e) => {
        if (user.role === "cashier") {
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

    const navigation = [
        {
            name: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutDashboard size={18} />,
            active: route().current("dashboard"),
            roles: ["admin"],
        },
        {
            name: "Kategori",
            href: route("category.index"),
            icon: <Menu size={18} />,
            active: route().current("category.index"),
            roles: ["admin"],
        },
        {
            name: "Produk",
            href: route("product.index"),
            icon: <Soup size={18} />,
            active: route().current("product.index"),
            roles: ["admin"],
        },
        {
            name: "Level Pedas",
            href: route("spicy.level.index"),
            icon: <Flame size={18} />,
            active: route().current("spicy.level.index"),
            roles: ["admin"],
        },
        {
            name: "Manajemen Stok",
            href: route("inventory.stock.index"),
            icon: <Box size={18} />,
            active: route().current("inventory.stock.index"),
            roles: ["admin"],
        },
        {
            name: "Log Inventaris",
            href: route("inventory.logs"),
            icon: <History size={18} />,
            active: route().current("inventory.logs"),
            roles: ["admin"],
        },
        {
            name: "Riwayat Pesanan",
            href: route("order.index"),
            icon: <ShoppingBag size={18} />,
            active: route().current("order.index"),
            roles: ["admin"],
        },
        {
            name: "Laporan",
            href: route("report.index"),
            icon: <PieChart size={18} />,
            active: route().current("report.index"),
            roles: ["admin"],
        },
        {
            name: "Pengeluaran",
            href: route("expense.index"),
            icon: <Receipt size={18} />,
            active: route().current("expense.index"),
            roles: ["admin", "cashier"],
        },
        {
            name: "Tutup Kasir",
            href: route("closing.index"),
            icon: <LogOut size={18} />,
            active: route().current("closing.index"),
            roles: ["admin"],
        },
        {
            name: "Kelola Kasir",
            href: route("cashier.index"),
            icon: <Users size={18} />,
            active: route().current("cashier.index"),
            roles: ["admin"],
        },
    ].filter((item) => item.roles.includes(user.role));

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-blue-100 selection:text-blue-700">
            {/* ===== SIDEBAR ===== */}
            <aside className="fixed inset-y-0 left-0 bg-white border-r border-gray-100 w-64 hidden lg:flex flex-col z-50 shadow-sm">
                {/* Logo Section */}
                <div className="p-4 border-b border-gray-50/50">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-2.5 group"
                    >
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                            <Utensils size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900 tracking-tight leading-none">
                                SEBLAKKU
                            </span>
                            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                                {user.role === "admin"
                                    ? "Admin Dashboard"
                                    : "Cashier Dashboard"}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 px-3 py-3 space-y-4 overflow-y-auto custom-scrollbar">
                    <nav className="space-y-0.5">
                        {navigation.map((item) => (
                            <SideNavItem
                                key={item.name}
                                href={item.href}
                                active={item.active}
                                icon={item.icon}
                            >
                                <span className="text-sm font-semibold">
                                    {item.name}
                                </span>
                            </SideNavItem>
                        ))}
                    </nav>

                    <div className="pt-4 mt-4 border-t border-gray-50">
                        <SideNavItem
                            href={route("pos.index")}
                            active={route().current("pos.index")}
                            icon={<ShoppingBag size={18} />}
                        >
                            <span className="text-sm font-semibold">
                                Buka Kasir
                            </span>
                        </SideNavItem>
                    </div>
                </div>

                {/* User Profile Section */}
                {user.role === "admin" && (
                    <div className="p-3 border-t border-gray-50 mt-auto">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 transition-all duration-200">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-8 h-8 bg-white border border-gray-200 text-blue-600 rounded-md flex items-center justify-center font-bold text-xs shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-gray-800 truncate leading-tight">
                                        {user.name}
                                    </p>
                                    <p className="text-[10px] font-medium text-gray-400 truncate tracking-tight">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`grid ${user.role === "admin" ? "grid-cols-2" : "grid-cols-1"} gap-1.5`}
                            >
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center justify-center gap-1 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-md text-[10px] font-bold text-gray-600 transition-all shadow-sm"
                                >
                                    <Settings size={12} />
                                    Profil
                                </Link>

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    onClick={handleLogoutClick}
                                    className="flex items-center justify-center gap-1 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-md text-[10px] font-bold text-rose-600 transition-all shadow-sm"
                                >
                                    <LogOut size={12} />
                                    Keluar
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* ===== MAIN AREA ===== */}
            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Mobile Top Bar */}
                <div className="lg:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-3 flex justify-between items-center z-40">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Utensils size={14} />
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight text-sm">
                            SEBLAK<span className="text-blue-600">POS</span>
                        </span>
                    </div>
                    <button
                        onClick={() => setShowingMobileMenu(!showingMobileMenu)}
                        className="p-1.5 bg-gray-50 rounded-lg text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <Menu size={18} />
                    </button>
                </div>

                {/* Content Header */}
                {header && (
                    <header className="bg-white border-b border-gray-50 py-3.5 px-4 lg:px-6">
                        <div className="max-w-7xl mx-auto font-bold text-sm text-gray-800">
                            {header}
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <div className="p-4 flex-1">
                    <div className="max-w-7xl mx-auto h-full">{children}</div>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {showingMobileMenu && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowingMobileMenu(false)}
                    ></div>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl p-5 animate-in slide-in-from-left duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <Utensils size={16} />
                                </div>
                                <span className="font-bold text-gray-900">
                                    SEBLAK
                                    <span className="text-blue-600">POS</span>
                                </span>
                            </div>
                            <button
                                onClick={() => setShowingMobileMenu(false)}
                                className="text-gray-400 p-1 hover:bg-gray-50 rounded-lg"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="space-y-6">
                            <div className="space-y-1.5">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                                            item.active
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-5 border-t border-gray-50 space-y-1.5">
                                <Link
                                    href={route("pos.index")}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-semibold text-gray-500 hover:bg-gray-50"
                                >
                                    <ShoppingBag size={18} />
                                    Buka Kasir
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    onClick={handleLogoutClick}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-semibold text-rose-600 hover:bg-rose-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

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
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
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
