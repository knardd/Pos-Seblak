import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    DollarSign,
    HandCoins,
    CircleDollarSign,
    Soup,
    TrendingUp,
    LayoutDashboard,
    ArrowUpRight,
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

export default function Dashboard({
    totalTransactionHariIni,
    totalPendapatanHariIni,
    totalPendapatanBulanIni,
    totalTransaksiBulanIni,
    totalProdukTerjualHariIni,
    chartData,
    topProducts,
    lowStockProducts,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="p-4 max-w-7xl mx-auto space-y-4">
                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
                            <HandCoins className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                Transaksi Hari Ini
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold text-gray-800">
                                    {totalTransactionHariIni}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
                            <CircleDollarSign
                                className="text-emerald-600"
                                size={20}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                Pendapatan Hari Ini
                            </p>
                            <div className="flex items-center gap-1">
                                <p className="text-xl font-bold text-gray-800">
                                    <span className="text-xs font-medium text-gray-400 mr-0.5">
                                        Rp
                                    </span>
                                    {Number(
                                        totalPendapatanHariIni,
                                    ).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
                            <TrendingUp className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                Pendapatan Bulan Ini
                            </p>
                            <div className="flex items-center gap-1">
                                <p className="text-xl font-bold text-gray-800">
                                    <span className="text-xs font-medium text-gray-400 mr-0.5">
                                        Rp
                                    </span>
                                    {Number(
                                        totalPendapatanBulanIni,
                                    ).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
                            <Soup className="text-rose-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                Produk Terjual (Hari)
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold text-gray-800">
                                    {totalProdukTerjualHariIni}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHARTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                <LayoutDashboard
                                    size={16}
                                    className="text-blue-500"
                                />
                                Performa Penjualan (7 Hari)
                            </h3>
                        </div>

                        <div className="h-[260px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient
                                            id="colorTrans"
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
                                            id="colorInc"
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
                                        dy={5}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "none",
                                            boxShadow:
                                                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="total_income"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorInc)"
                                        name="Pendapatan"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-800">
                                Top 5 Produk Terlaris
                            </h3>
                            <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-md">
                                Hari Ini
                            </span>
                        </div>

                        <div className="h-[260px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={topProducts}
                                    margin={{ left: -25 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f1f5f9"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                                        dy={5}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#f8fafc" }}
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "none",
                                            boxShadow:
                                                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Bar
                                        dataKey="total_sold"
                                        fill="#3b82f6"
                                        radius={[4, 4, 4, 4]}
                                        barSize={32}
                                        name="Terjual"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* LOW STOCK ALERTS SECTION */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                            <h3 className="text-sm font-bold text-gray-800">Peringatan Stok Rendah</h3>
                        </div>
                        <span className="text-[10px] font-bold text-rose-600 px-2 py-0.5 bg-rose-50 rounded-full border border-rose-100">
                            {lowStockProducts.length} Produk Butuh Perhatian
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white border-b border-gray-100">
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Stok Saat Ini</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {lowStockProducts.length > 0 ? (
                                    lowStockProducts.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-3.5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-700 group-hover:text-rose-600 transition-colors">{p.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{p.category?.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-center">
                                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 rounded-lg border border-rose-100 font-bold text-sm">
                                                    {p.stock}
                                                    <span className="text-[9px] font-medium uppercase opacity-60 ml-0.5">{p.unit}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-center">
                                                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                    p.stock === 0 ? "bg-gray-100 text-gray-500" : "bg-rose-100 text-rose-700"
                                                }`}>
                                                    {p.stock === 0 ? "Habis" : "Stok Menipis"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-10 text-center text-gray-400 font-medium text-sm">
                                            Semua stok produk aman dan tersedia cukup.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
