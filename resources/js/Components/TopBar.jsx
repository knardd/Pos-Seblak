import React from "react";
import { router, Link } from "@inertiajs/react";
import { Search } from "lucide-react";
import { LogOut } from "lucide-react";

export default function TopBar({ search, onSearchChange, isAdmin }) {
    return (
        <div className="bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex gap-2 text-red-400"
                >
                    <LogOut />
                    <span>Logout</span>
                </Link>
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
    );
}
