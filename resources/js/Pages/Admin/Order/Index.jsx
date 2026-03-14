import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import {
    Search,
    Calendar,
    Filter,
    Eye,
    XCircle,
    ShoppingBag,
    User,
    CreditCard,
    Banknote,
    ChevronLeft,
    ChevronRight,
    Clock,
    X,
} from "lucide-react";

export default function OrderIndex({ orders, filters }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");
    const [status, setStatus] = useState(filters.status || "");
    const [paymentMethod, setPaymentMethod] = useState(
        filters.payment_method || "",
    );

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("order.index"),
            {
                search: searchTerm,
                start_date: startDate,
                end_date: endDate,
                status: status,
                payment_method: paymentMethod,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleReset = () => {
        setSearchTerm("");
        setStartDate("");
        setEndDate("");
        setStatus("");
        setPaymentMethod("");
        router.get(route("order.index"));
    };

    const handleCancelOrder = (id) => {
        if (
            confirm(
                "Apakah Anda yakin ingin membatalkan pesanan ini? Stok produk akan dikembalikan otomatis.",
            )
        ) {
            router.delete(route("order.destroy", id), {
                onSuccess: () => setShowDetailModal(false),
            });
        }
    };

    const openDetail = (order) => {
        setSelectedOrder(order);
        setShowDetailModal(true);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Pesanan" />

            <div className="p-4 max-w-7xl mx-auto space-y-4">
                <Alert type="success" message={flash?.success} />
                <Alert type="error" message={flash?.error} />

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                        <ShoppingBag size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                            Riwayat Pesanan
                        </h2>
                        <p className="text-gray-500 text-xs font-medium tracking-tight">
                            Kelola dan pantau semua transaksi penjualan.
                        </p>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <form
                        onSubmit={handleFilter}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3"
                    >
                        <div className="relative group lg:col-span-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Search size={14} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari No. Invoice..."
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 lg:col-span-2">
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Calendar size={14} />
                                </div>
                                <input
                                    type="date"
                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Calendar size={14} />
                                </div>
                                <input
                                    type="date"
                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 lg:col-span-2">
                            <select
                                className="flex-1 px-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <option value="">Semua Pembayaran</option>
                                <option value="cash">Tunai</option>
                                <option value="qris">QRIS</option>
                            </select>

                            <select
                                className="flex-1 px-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Semua Status</option>
                                <option value="completed">Selesai</option>
                                <option value="cancelled">Dibatalkan</option>
                            </select>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[12px] font-bold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-[12px] font-bold hover:bg-gray-200 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* TABLE AREA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">
                                        No. Invoice
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">
                                        Kasir
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">
                                        Pembayaran
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.data.length > 0 ? (
                                    orders.data.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50/50 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-[12px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    #{order.invoice_number}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-medium text-gray-600">
                                                        {new Date(
                                                            order.created_at,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                        )}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400">
                                                        {new Date(
                                                            order.created_at,
                                                        ).toLocaleTimeString(
                                                            "id-ID",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-[10px]">
                                                        {order.user?.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <span className="text-[12px] font-semibold text-gray-700">
                                                        {order.user?.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold border ${
                                                        order.payment_method ===
                                                        "cash"
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                            : "bg-blue-50 text-blue-600 border-blue-100"
                                                    }`}
                                                >
                                                    {order.payment_method ===
                                                    "cash" ? (
                                                        <Banknote size={10} />
                                                    ) : (
                                                        <CreditCard size={10} />
                                                    )}
                                                    {order.payment_method.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-[13px] font-bold text-gray-900">
                                                    Rp{" "}
                                                    {Number(
                                                        order.total_price,
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                        order.status ===
                                                        "completed"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-rose-100 text-rose-700"
                                                    }`}
                                                >
                                                    {order.status ===
                                                    "completed"
                                                        ? "Selesai"
                                                        : "Dibatalkan"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-1">
                                                <button
                                                    onClick={() =>
                                                        openDetail(order)
                                                    }
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                {order.status ===
                                                    "completed" && (
                                                    <button
                                                        onClick={() =>
                                                            handleCancelOrder(
                                                                order.id,
                                                            )
                                                        }
                                                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Batalkan Pesanan"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <ShoppingBag
                                                    size={40}
                                                    className="mb-3 opacity-20"
                                                />
                                                <p className="text-[13px] font-bold tracking-tight">
                                                    Pesanan tidak ditemukan
                                                </p>
                                                <p className="text-[11px] font-medium opacity-60">
                                                    Coba ubah filter atau kata
                                                    kunci pencarian Anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {orders.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between bg-white">
                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                Menampilkan {orders.from || 0}-{orders.to || 0}{" "}
                                dari {orders.total} Pesanan
                            </div>
                            <div className="flex items-center gap-1">
                                {orders.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url || link.active}
                                        onClick={() =>
                                            router.get(
                                                link.url,
                                                {
                                                    search: searchTerm,
                                                    start_date: startDate,
                                                    end_date: endDate,
                                                    status: status,
                                                    payment_method:
                                                        paymentMethod,
                                                },
                                                { preserveState: true },
                                            )
                                        }
                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                            link.active
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : !link.url
                                                  ? "text-gray-200 cursor-not-allowed"
                                                  : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* DETAIL MODAL */}
            {showDetailModal && selectedOrder && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm">
                                    <Eye size={18} />
                                </div>
                                <div>
                                    <h2 className="text-[15px] font-bold text-gray-800">
                                        Detail Pesanan #
                                        {selectedOrder.invoice_number}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                            <Calendar size={10} />{" "}
                                            {new Date(
                                                selectedOrder.created_at,
                                            ).toLocaleDateString("id-ID", {
                                                dateStyle: "long",
                                            })}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                            <Clock size={10} />{" "}
                                            {new Date(
                                                selectedOrder.created_at,
                                            ).toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Order Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                        Informasi Pelanggan & Kasir
                                    </h3>
                                    <div className="space-y-2.5">
                                        <div className="flex justify-between items-center text-[12px]">
                                            <span className="text-gray-500 font-medium">
                                                Kasir Bertugas
                                            </span>
                                            <span className="text-gray-900 font-bold">
                                                {selectedOrder.user?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[12px]">
                                            <span className="text-gray-500 font-medium">
                                                Level Pedas
                                            </span>
                                            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-md font-bold text-[10px]">
                                                {
                                                    selectedOrder.spicy_level
                                                        ?.level_name
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[12px]">
                                            <span className="text-gray-500 font-medium">
                                                Metode Pembayaran
                                            </span>
                                            <span className="text-gray-900 font-bold uppercase">
                                                {selectedOrder.payment_method}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                        Rincian Pembayaran
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                        <div className="flex justify-between items-center text-[12px]">
                                            <span className="text-gray-500 font-medium">
                                                Subtotal
                                            </span>
                                            <span className="text-gray-700 font-bold">
                                                Rp{" "}
                                                {Number(
                                                    selectedOrder.subtotal,
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                        {selectedOrder.spicy_level
                                            ?.extra_price > 0 && (
                                            <div className="flex justify-between items-center text-[12px]">
                                                <span className="text-gray-500 font-medium">
                                                    Extra Pedas
                                                </span>
                                                <span className="text-gray-700 font-bold">
                                                    Rp{" "}
                                                    {Number(
                                                        selectedOrder
                                                            .spicy_level
                                                            .extra_price,
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </div>
                                        )}
                                        <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center">
                                            <span className="text-[13px] font-bold text-gray-900 uppercase">
                                                Total Bayar
                                            </span>
                                            <span className="text-[16px] font-black text-blue-600">
                                                Rp{" "}
                                                {Number(
                                                    selectedOrder.total_price,
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                        <div className="pt-1 flex justify-between items-center text-[11px]">
                                            <span className="text-gray-400 font-medium">
                                                Diterima
                                            </span>
                                            <span className="text-gray-600 font-bold">
                                                Rp{" "}
                                                {Number(
                                                    selectedOrder.amount_paid,
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px]">
                                            <span className="text-gray-400 font-medium">
                                                Kembali
                                            </span>
                                            <span className="text-emerald-600 font-bold">
                                                Rp{" "}
                                                {Number(
                                                    selectedOrder.change_amount,
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="flex flex-col">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                    Item Pesanan ({selectedOrder.details.length}
                                    )
                                </h3>
                                <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-2.5 custom-scrollbar">
                                    {selectedOrder.details.map((detail) => (
                                        <div
                                            key={detail.id}
                                            className="flex gap-3 py-2 border-b border-gray-50 last:border-0"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[12px] font-bold text-gray-800 truncate">
                                                    {detail.product?.name ||
                                                        "Produk dihapus"}
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-semibold uppercase">
                                                    {
                                                        detail.product?.category
                                                            ?.name
                                                    }
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[11px] font-medium text-gray-400">
                                                        Rp{" "}
                                                        {Number(
                                                            detail.price_at_time,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-blue-400">
                                                        × {detail.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[12px] font-bold text-gray-900">
                                                    Rp{" "}
                                                    {Number(
                                                        detail.subtotal,
                                                    ).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedOrder.status === "completed" && (
                                    <button
                                        onClick={() =>
                                            handleCancelOrder(selectedOrder.id)
                                        }
                                        className="mt-6 w-full py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-bold text-[12px] transition-all flex items-center justify-center gap-2 border border-rose-100"
                                    >
                                        <XCircle size={14} />
                                        Batalkan Pesanan Ini
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
