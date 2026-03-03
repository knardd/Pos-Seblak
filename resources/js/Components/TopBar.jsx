import React, { useState, useEffect, useRef } from "react";
import { router, Link, usePage } from "@inertiajs/react";
import { Search, User, LogOut } from "lucide-react";

export default function TopBar({ search, onSearchChange, isAdmin }) {
    const { auth } = usePage().props;
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
                {/* Account Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-slate-600"
                    >
                        <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                            {auth?.user?.name.charAt(0).toUpperCase()}
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    )}
                </div>

                <h1 className="text-lg font-black tracking-tight">
                    <span className="text-blue-600">SEBLAK</span>
                    <span className="text-slate-300 ml-0.5">POS</span>
                </h1>
                {isAdmin && (
                    <Link
                        href={route("dashboard")}
                        className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors border-l border-slate-200 pl-4"
                    >
                        ← Dashboard
                    </Link>
                )}
            </div>
            <div className="flex items-center gap-4">
                <div className="relative w-60">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
