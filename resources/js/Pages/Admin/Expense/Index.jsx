import { useForm, router, usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import AdminTable from "@/Components/AdminTable";
import {
    Trash2,
    Plus,
    Receipt,
    X,
    Calendar,
    Tag,
    CreditCard,
} from "lucide-react";

export default function Expense({ expenses = [] }) {
    const { flash } = usePage().props;

    const [modal, setModal] = useState(false);

    const { data, setData, post, reset, processing, errors } = useForm({
        category: "operasional",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
    });

    const openCreateModal = () => {
        reset();
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("expense.store"), {
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (id) => {
        if (
            confirm(
                "Apakah Anda yakin ingin menghapus catatan pengeluaran ini?",
            )
        ) {
            router.delete(route("expense.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4 max-w-7xl mx-auto space-y-4">
                <Head title="Manajemen Pengeluaran" />

                <Alert type="success" message={flash?.success} />
                <Alert type="error" message={flash?.error} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-rose-600 rounded-xl shadow-sm text-white">
                            <Receipt size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Manajemen Pengeluaran
                            </h2>
                            <p className="text-gray-500 text-xs font-medium">
                                Catat biaya gas, bumbu, cabe, dan biaya lainnya.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm group"
                    >
                        <Plus
                            size={14}
                            className="group-hover:rotate-90 transition-transform duration-300"
                        />
                        Tambah Pengeluaran
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <AdminTable
                        data={expenses}
                        emptyMessage="Belum ada catatan pengeluaran."
                        columns={[
                            {
                                label: "Tanggal",
                                key: "date",
                                render: (item) => (
                                    <div className="text-xs font-semibold text-gray-600">
                                        {new Date(item.date).toLocaleDateString(
                                            "id-ID",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            },
                                        )}
                                    </div>
                                ),
                            },
                            {
                                label: "Keterangan",
                                key: "description",
                                render: (item) => (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-sm">
                                            {item.description}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider italic">
                                            {item.category}
                                        </span>
                                    </div>
                                ),
                            },
                            {
                                label: "Jumlah (Rp)",
                                key: "amount",
                                render: (item) => (
                                    <div className="font-bold text-rose-600 text-sm">
                                        Rp{" "}
                                        {parseInt(item.amount).toLocaleString(
                                            "id-ID",
                                        )}
                                    </div>
                                ),
                            },
                            {
                                label: "Oleh",
                                key: "user",
                                render: (item) => (
                                    <span className="text-xs text-gray-400 font-medium">
                                        {item.user?.name || "Sistem"}
                                    </span>
                                ),
                            },
                        ]}
                        onEdit={null} // Tidak perlu edit untuk pengeluaran, hapus & input ulang saja
                        onDelete={(id) => handleDelete(id)}
                    />
                </div>

                {/* MODAL INPUT PENGELUARAN */}
                {modal && (
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                        <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                            <div className="relative p-5">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                                >
                                    <X size={16} />
                                </button>

                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                                        <Receipt size={18} />
                                    </div>
                                    <h2 className="text-base font-bold text-gray-800">
                                        Catat Pengeluaran Baru
                                    </h2>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                                <Calendar
                                                    size={12}
                                                    className="text-rose-500"
                                                />{" "}
                                                Tanggal
                                            </label>
                                            <input
                                                type="date"
                                                value={data.date}
                                                onChange={(e) =>
                                                    setData(
                                                        "date",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
                                            />
                                            {errors.date && (
                                                <p className="text-rose-500 text-[10px] mt-1 font-medium">
                                                    {errors.date}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                                <Tag
                                                    size={12}
                                                    className="text-rose-500"
                                                />{" "}
                                                Keterangan Barang/Jasa
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Beli Gas LPG 3kg / Beli Cabe 1kg"
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
                                            />
                                            {errors.description && (
                                                <p className="text-rose-500 text-[10px] mt-1 font-medium">
                                                    {errors.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                                    <CreditCard
                                                        size={12}
                                                        className="text-rose-500"
                                                    />{" "}
                                                    Biaya (Rp)
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={data.amount}
                                                    onChange={(e) =>
                                                        setData(
                                                            "amount",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
                                                />
                                                {errors.amount && (
                                                    <p className="text-rose-500 text-[10px] mt-1 font-medium">
                                                        {errors.amount}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                    Kategori
                                                </label>
                                                <select
                                                    value={data.category}
                                                    onChange={(e) =>
                                                        setData(
                                                            "category",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
                                                >
                                                    <option value="operasional">
                                                        Operasional (Gas,
                                                        Listrik, Tisu)
                                                    </option>
                                                    <option value="bahan_baku">
                                                        Bahan Baku (Cabe, Bumbu)
                                                    </option>
                                                    <option value="peralatan">
                                                        Peralatan (Sendok,
                                                        Mangkok)
                                                    </option>
                                                    <option value="lainnya">
                                                        Lain-lain
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-semibold text-xs transition-all"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-[2] py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm disabled:bg-rose-300"
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Simpan Pengeluaran"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
