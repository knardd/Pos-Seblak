import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    DollarSign,
    HandCoins,
    CircleDollarSign,
    Soup,
    ShoppingBasket,
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
} from "recharts";

export default function Dashboard({
    totalTransactionHariIni,
    totalPendapatanHariIni,
    totalProdukTerjualHariIni,
    chartData,
    topProducts,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                            <HandCoins className="text-blue-600 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Transaksi Hari ini
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {totalTransactionHariIni}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mr-4">
                            <CircleDollarSign className="text-green-600 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Pendapatan Hari ini
                            </p>
                            <p className="text-2xl font-bold text-emerald-600">
                                Rp{" "}
                                {Number(
                                    totalPendapatanHariIni,
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mr-4">
                            <Soup className="text-rose-600 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Produk Terjual
                            </p>
                            <p className="text-2xl font-bold text-rose-600">
                                {totalProdukTerjualHariIni}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-white w-1/2 mt-8 p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">
                            Grafik Transaksi 7 Hari Terakhir
                        </h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="total_transaction"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total_income"
                                    stroke="#16a34a"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>{" "}
                    <div className="w-1/2 bg-white ml-4 mt-8 p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">
                            Top 5 Produk Terlaris Hari Ini
                        </h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topProducts}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="total_sold"
                                    fill="#2563eb"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
