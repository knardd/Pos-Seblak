import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Calendar,
    TrendingUp,
    ShoppingBag,
    DollarSign,
    Users,
    ArrowUpRight,
    PieChart,
    FileText,
    ChevronDown,
    CreditCard,
    Banknote,
    Flame,
    Receipt,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart as RePieChart,
    Pie,
    Legend,
} from "recharts";

export default function ReportIndex({
    summary,
    salesTrend,
    topProducts,
    paymentBreakdown,
    spicyPopularity,
    filters,
}) {
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("report.index"),
            {
                start_date: startDate,
                end_date: endDate,
            },
            { preserveState: true },
        );
    };

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Laporan Penjualan" />

            <div className="p-4 max-w-7xl mx-auto space-y-6">
                {/* HEADER & FILTERS */}
                <div className="flex flex-col md:flex-col justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                                <PieChart size={18} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                                Laporan Analitik
                            </h2>
                        </div>
                        <p className="text-gray-500 text-xs font-medium">
                            Pantau performa bisnis Anda secara mendalam.
                        </p>
                    </div>

                    <form
                        onSubmit={handleFilter}
                        className="flex flex-wrap items-end gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                    >
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                                Mulai
                            </label>
                            <div className="relative group">
                                <Calendar
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={14}
                                />
                                <input
                                    type="date"
                                    className="pl-9 pr-3 py-1.5 bg-gray-50 border-gray-100 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none border"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                                Selesai
                            </label>
                            <div className="relative group">
                                <Calendar
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={14}
                                />
                                <input
                                    type="date"
                                    className="pl-9 pr-3 py-1.5 bg-gray-50 border-gray-100 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none border"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm h-[34px]"
                        >
                            Terapkan
                        </button>

                        <div className="flex gap-2 h-[34px]">
                            <a
                                href={route("report.export.transactions", {
                                    start_date: startDate,
                                    end_date: endDate,
                                })}
                                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700 transition-all shadow-sm"
                            >
                                <FileText size={14} />
                                Export Penjualan
                            </a>
                            <a
                                href={route("report.export.expenses", {
                                    start_date: startDate,
                                    end_date: endDate,
                                })}
                                className="flex items-center gap-1.5 px-3 py-1 bg-orange-600 text-white rounded-lg text-[11px] font-bold hover:bg-orange-700 transition-all shadow-sm"
                            >
                                <FileText size={14} />
                                Export Pengeluaran
                            </a>
                        </div>
                    </form>
                </div>

                {/* SUMMARY WIDGETS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Omzet
                            </span>
                        </div>
                        <p className="text-xl font-black text-gray-900 tracking-tight">
                            <span className="text-sm font-bold text-gray-400 mr-1">
                                Rp
                            </span>
                            {Number(summary.total_revenue || 0).toLocaleString(
                                "id-ID",
                            )}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-rose-200 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                                <Banknote size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full uppercase">
                                HPP (Modal)
                            </span>
                        </div>
                        <p className="text-xl font-black text-gray-900 tracking-tight">
                            <span className="text-sm font-bold text-gray-400 mr-1">
                                Rp
                            </span>
                            {Number(summary.total_cost || 0).toLocaleString(
                                "id-ID",
                            )}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-orange-200 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                <Receipt size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full uppercase">
                                Pengeluaran
                            </span>
                        </div>
                        <p className="text-xl font-black text-gray-900 tracking-tight text-orange-600">
                            <span className="text-sm font-bold text-gray-400 mr-1">
                                Rp
                            </span>
                            {Number(summary.total_expenses || 0).toLocaleString(
                                "id-ID",
                            )}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-emerald-200 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                                Laba Bersih
                            </span>
                        </div>
                        <p className="text-xl font-black text-emerald-600 tracking-tight">
                            <span className="text-sm font-bold text-emerald-400 mr-1">
                                Rp
                            </span>
                            {Number(summary.total_profit || 0).toLocaleString(
                                "id-ID",
                            )}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-slate-200 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-50 text-slate-600 rounded-xl">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full uppercase">
                                Pesanan
                            </span>
                        </div>
                        <p className="text-xl font-black text-gray-900 tracking-tight">
                            {summary.total_orders || 0}
                            <span className="text-sm font-bold text-gray-400 ml-1">
                                Trx
                            </span>
                        </p>
                    </div>
                </div>

                {/* MAIN CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Trend */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <TrendingUp
                                    size={16}
                                    className="text-blue-500"
                                />
                                Tren Revenue vs Laba Bersih
                            </h3>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                                        Rev
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                                        Profit
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                                        Exp
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesTrend}>
                                    <defs>
                                        <linearGradient
                                            id="colorRev"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#3b82f6"
                                                stopOpacity={0.1}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#3b82f6"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="colorProfit"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#10b981"
                                                stopOpacity={0.1}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#10b981"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f1f5f9"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                                        dy={10}
                                        tickFormatter={(str) =>
                                            new Date(str).toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                },
                                            )
                                        }
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "12px",
                                            border: "none",
                                            boxShadow:
                                                "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                            fontSize: "12px",
                                        }}
                                        formatter={(value, name) => [
                                            "Rp " +
                                                Number(value).toLocaleString(
                                                    "id-ID",
                                                ),
                                            name === "revenue"
                                                ? "Omzet"
                                                : name === "profit"
                                                  ? "Laba Bersih"
                                                  : "Pengeluaran",
                                        ]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRev)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="profit"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorProfit)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#f59e0b"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        fill="none"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Payment Method Pie */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
                            <CreditCard
                                size={16}
                                className="text-emerald-500"
                            />
                            Metode Pembayaran
                        </h3>
                        <div className="h-[240px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={paymentBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="count"
                                        nameKey="payment_method"
                                    >
                                        {paymentBreakdown.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ),
                                        )}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        iconType="circle"
                                        wrapperStyle={{
                                            fontSize: "11px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {paymentBreakdown.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between text-[11px] font-bold"
                                >
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    COLORS[i % COLORS.length],
                                            }}
                                        ></div>
                                        <span className="uppercase">
                                            {item.payment_method}
                                        </span>
                                    </div>
                                    <span className="text-gray-900">
                                        Rp{" "}
                                        {Number(item.revenue).toLocaleString(
                                            "id-ID",
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: TOP PRODUCTS & SPICY Popularity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Products Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" />
                                10 Produk Terlaris
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white">
                                        <th className="px-6 py-3">Menu</th>
                                        <th className="px-6 py-3 text-center">
                                            Terjual
                                        </th>
                                        <th className="px-6 py-3 text-right">
                                            Revenue
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {topProducts.map((p, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-3.5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-800">
                                                        {p.name}
                                                    </span>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase">
                                                        {p.category_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-center">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-black">
                                                    {p.total_qty}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 text-right">
                                                <span className="text-xs font-bold text-gray-900">
                                                    Rp{" "}
                                                    {Number(
                                                        p.total_revenue,
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Spicy Level Popularity */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
                            <Flame size={16} className="text-orange-500" />
                            Preferensi Level Pedas
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={spicyPopularity}
                                    layout="vertical"
                                    margin={{ left: 20 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        horizontal={true}
                                        vertical={false}
                                        stroke="#f1f5f9"
                                    />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="level_name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748b",
                                            fontSize: 11,
                                            fontWeight: "bold",
                                        }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#f8fafc" }}
                                        contentStyle={{
                                            borderRadius: "12px",
                                            border: "none",
                                            boxShadow:
                                                "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                        }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        radius={[0, 4, 4, 0]}
                                        barSize={24}
                                        name="Total Pesanan"
                                    >
                                        {spicyPopularity.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    index === 0
                                                        ? "#f59e0b"
                                                        : "#fdba74"
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-2 text-center text-[10px] font-medium text-gray-400">
                            Analisis tingkat kepedasan yang paling sering
                            dipesan pelanggan.
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
