import React, { useState } from "react";
import {
    Utensils,
    Soup,
    LayoutDashboard,
    Menu,
    User,
    LogOut,
    Flame,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children, auth }) {
    const user = usePage().props.auth.user;
    const [showingMobileMenu, setShowingMobileMenu] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* ===== SIDEBAR ===== */}
            <aside className="fixed inset-y-0 left-0 bg-white border-r border-slate-200 w-64 hidden md:flex flex-col z-50">
                {/* Logo Section */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                        <Utensils />
                    </div>
                    <span className="text-xl font-bold text-slate-800 tracking-tight transition-all">
                        POS<span className="text-blue-600">SEBLAK</span>
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href={route("category.index")}
                        className="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                        <Menu />
                        <span>Category</span>
                    </Link>

                    <Link
                        href={route("product.index")}
                        className="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                        <Soup />
                        <span>Product</span>
                    </Link>

                    <Link
                        href={route("spicy.level.index")}
                        className="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                        <Flame />
                        <span>Level</span>
                    </Link>

                    <Link
                        href={route("cashier.index")}
                        className="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                        <User />
                        <span>Cashier</span>
                    </Link>
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-800 truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Link
                                href={route("profile.edit")}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                            >
                                <User />
                                <span>Profil</span>
                            </Link>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <LogOut />
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ===== MAIN AREA ===== */}
            <main className="flex-1 md:ml-64 min-h-screen">
                {/* Header Mobile */}
                <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center">
                    <span className="font-bold text-blue-600">POS SEBLAK</span>
                    <button
                        onClick={() => setShowingMobileMenu(!showingMobileMenu)}
                        className="p-2 text-slate-600"
                    >
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content Header */}
                {header && (
                    <header className="bg-white border-b border-slate-100 py-6 px-8">
                        <div className="max-w-7xl mx-auto">{header}</div>
                    </header>
                )}

                {/* Page Content */}
                <div className="p-8 max-w-7xl mx-auto">{children}</div>
            </main>

            {/* Mobile Menu Overlay */}
            {showingMobileMenu && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setShowingMobileMenu(false)}
                    ></div>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Utensils />
                            </div>
                            <span className="font-bold">POS SEBLAK</span>
                        </div>
                        <nav className="space-y-4">
                            <Link
                                href={route("dashboard")}
                                className="block text-blue-600 font-bold"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("category.index")}
                                className="block text-slate-600"
                            >
                                Kategori
                            </Link>
                            <Link
                                href={route("product.index")}
                                className="block text-slate-600"
                            >
                                Produk
                            </Link>
                            <Link
                                href={route("spicy.level.index")}
                                className="block text-slate-600"
                            >
                                Level Pedas
                            </Link>
                            <Link
                                href={route("cashier.index")}
                                className="block text-slate-600"
                            >
                                Kelola Kasir
                            </Link>
                            <Link
                                href={route("pos.index")}
                                className="block text-slate-600"
                            >
                                POS
                            </Link>
                            <div className="pt-4 mt-4 border-t border-slate-100">
                                <Link
                                    href={route("profile.edit")}
                                    className="block text-slate-600 mb-4 text-sm"
                                >
                                    Profil
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block text-red-600 text-sm font-bold"
                                >
                                    Logout
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}
