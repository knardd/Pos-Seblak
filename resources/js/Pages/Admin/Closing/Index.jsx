import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import {
    Banknote,
    CreditCard,
    History,
    CheckCircle2,
    Info,
    AlertCircle,
} from "lucide-react";

export default function ClosingIndex({
    expectedCash,
    totalQris,
    history = [],
}) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Monitoring Tutup Kasir" />
            
            <div className="p-4 max-w-7xl mx-auto space-y-4">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                            <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Monitoring Tutup Kasir</h2>
                            <p className="text-gray-500 text-xs font-medium">Pantau rekonsiliasi kasir dan riwayat penutupan shift.</p>
                        </div>
                    </div>
                </div>

                <Alert type="success" message={flash?.success} />
                <Alert type="error" message={flash?.error} />

                {/* Summary Info Area - Status Saat Ini */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <Banknote size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ekspektasi Tunai (Shift Aktif)</p>
                            <p className="text-lg font-bold text-gray-800">
                                Rp {Number(expectedCash).toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total QRIS (Shift Aktif)</p>
                            <p className="text-lg font-bold text-gray-800">
                                Rp {Number(totalQris).toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* History Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                        <div className="flex items-center gap-2">
                            <History size={16} className="text-gray-400" />
                            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                Log Riwayat Penutupan Kasir
                            </h3>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-white">
                                    <th className="px-4 py-3">Waktu & Tanggal</th>
                                    <th className="px-4 py-3">Petugas</th>
                                    <th className="px-4 py-3 text-right">Ekspektasi Sistem</th>
                                    <th className="px-4 py-3 text-right">Laporan Fisik</th>
                                    <th className="px-4 py-3 text-center">Selisih</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {history.map((item) => {
                                    const diff = parseFloat(item.difference);
                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-700">
                                                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 font-medium">
                                                        {new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-[10px] font-bold">
                                                        {item.user?.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-600">
                                                        {item.user?.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right text-xs font-medium text-gray-400">
                                                Rp {Number(item.total_cash_system).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 text-right text-xs font-bold text-gray-800">
                                                Rp {Number(item.total_cash_reported).toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                                        diff === 0 
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                                            : "bg-rose-50 text-rose-600 border-rose-100"
                                                    }`}>
                                                        {diff === 0 ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                                        {diff === 0 ? "Seimbang" : (diff > 0 ? `+${diff.toLocaleString("id-ID")}` : diff.toLocaleString("id-ID"))}
                                                    </span>
                                                    {item.notes && (
                                                        <div className="flex items-center gap-1 text-[9px] text-gray-400 max-w-[150px] truncate italic" title={item.notes}>
                                                            <Info size={10} className="shrink-0" /> {item.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {history.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <History size={32} className="text-gray-200 mb-2" />
                                                <p className="text-xs font-medium">Belum ada riwayat penutupan kasir.</p>
                                            </div>
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
