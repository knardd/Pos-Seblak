import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { 
    Search, 
    Calendar, 
    Filter, 
    ShoppingBag, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    AlertCircle, 
    XCircle,
    ChevronLeft,
    ChevronRight,
    Box,
    Clock,
    User
} from "lucide-react";

export default function InventoryLogs({ logs, products, filters }) {
    const { flash } = usePage().props;
    const [productId, setProductId] = useState(filters.product_id || "");
    const [type, setType] = useState(filters.type || "");
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route("inventory.logs"), {
            product_id: productId,
            type: type,
            start_date: startDate,
            end_date: endDate,
        }, { preserveState: true, replace: true });
    };

    const handleReset = () => {
        setProductId("");
        setType("");
        setStartDate("");
        setEndDate("");
        router.get(route("inventory.logs"));
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'in': return <ArrowUpCircle size={14} className="text-emerald-500" />;
            case 'out': return <ArrowDownCircle size={14} className="text-blue-500" />;
            case 'adjustment': return <AlertCircle size={14} className="text-orange-500" />;
            case 'cancellation': return <XCircle size={14} className="text-rose-500" />;
            default: return null;
        }
    };

    const getTypeText = (type) => {
        switch (type) {
            case 'in': return 'Stok Masuk';
            case 'out': return 'Stok Keluar';
            case 'adjustment': return 'Penyesuaian';
            case 'cancellation': return 'Pembatalan';
            default: return type;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Log Inventaris" />

            <div className="p-4 max-w-7xl mx-auto space-y-4">
                {/* HEADER */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                        <Box size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Log Inventaris</h2>
                        <p className="text-gray-500 text-xs font-medium tracking-tight">Pantau setiap pergerakan stok produk Anda.</p>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="lg:col-span-1">
                            <select
                                className="w-full px-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            >
                                <option value="">Semua Produk</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="lg:col-span-1">
                            <select
                                className="w-full px-3 py-2 bg-gray-50 border-gray-100 rounded-lg text-[12px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none border"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Semua Tipe</option>
                                <option value="in">Stok Masuk</option>
                                <option value="out">Stok Keluar</option>
                                <option value="adjustment">Penyesuaian</option>
                                <option value="cancellation">Pembatalan</option>
                            </select>
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
                                    onChange={(e) => setStartDate(e.target.value)}
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

                        <div className="flex gap-2 lg:col-span-1">
                            <button
                                type="submit"
                                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-[12px] font-bold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-[12px] font-bold hover:bg-gray-200 transition-colors"
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
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Tanggal & Waktu</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Produk</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Tipe</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Perubahan</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Oleh</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {logs.data.length > 0 ? (
                                    logs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-bold text-gray-800">{new Date(log.created_at).toLocaleDateString('id-ID')}</span>
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                                                        <Clock size={10} />
                                                        {new Date(log.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-bold text-gray-700">{log.inventory?.product?.name || 'Produk dihapus'}</span>
                                                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-tighter">
                                                        {log.inventory?.unit || 'pcs'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold border ${
                                                    log.type === 'in' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    log.type === 'out' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                    log.type === 'adjustment' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-rose-50 text-rose-600 border-rose-100'
                                                }`}>
                                                    {getTypeIcon(log.type)}
                                                    {getTypeText(log.type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-[13px] font-black ${
                                                    log.quantity > 0 ? 'text-emerald-600' : 'text-rose-600'
                                                }`}>
                                                    {log.quantity > 0 ? '+' : ''}{log.quantity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-gray-100 text-gray-500 rounded flex items-center justify-center font-bold text-[10px]">
                                                        {log.user?.name ? log.user.name.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                    <span className="text-[12px] font-semibold text-gray-600">{log.user?.name || 'System'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[11px] font-medium text-gray-500 italic">
                                                    {log.note || '-'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <ShoppingBag size={40} className="mb-3 opacity-20" />
                                                <p className="text-[13px] font-bold tracking-tight">Log tidak ditemukan</p>
                                                <p className="text-[11px] font-medium opacity-60">Belum ada pergerakan stok untuk kriteria ini.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {logs.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between bg-white">
                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                Menampilkan {logs.from || 0}-{logs.to || 0} dari {logs.total} Log
                            </div>
                            <div className="flex items-center gap-1">
                                {logs.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url || link.active}
                                        onClick={() => router.get(link.url, {
                                            product_id: productId,
                                            type: type,
                                            start_date: startDate,
                                            end_date: endDate,
                                        }, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                            link.active 
                                            ? "bg-blue-600 text-white shadow-sm" 
                                            : !link.url 
                                                ? "text-gray-200 cursor-not-allowed" 
                                                : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
