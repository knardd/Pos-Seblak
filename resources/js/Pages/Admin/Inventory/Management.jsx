import { Head, router, usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import AdminTable from "@/Components/AdminTable";
import { Box, SquarePen, X, Tag, Save } from "lucide-react";

export default function StockManagement({ products }) {
    const { flash } = usePage().props;
    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data, setData, put, reset, processing, errors } = useForm({
        stock: "",
        unit: "",
        note: "",
    });

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setData({
            stock: product.stock,
            unit: product.unit,
            note: "",
        });
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedProduct(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("inventory.stock.update", selectedProduct.inventory.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Stok" />

            <div className="p-4 max-w-7xl mx-auto space-y-4">
                <Alert type="success" message={flash?.success} />
                <Alert type="error" message={flash?.error} />

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                        <Box size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Manajemen Stok</h2>
                        <p className="text-gray-500 text-xs font-medium tracking-tight">Kelola persediaan barang dan unit produk Anda.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <AdminTable 
                        data={products}
                        emptyMessage="Belum ada produk untuk dikelola stoknya."
                        columns={[
                            { 
                                label: 'Produk', 
                                key: 'name',
                                render: (item) => (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.category?.name || 'Tanpa Kategori'}</span>
                                    </div>
                                )
                            },
                            { 
                                label: 'Stok Saat Ini', 
                                key: 'stock',
                                render: (item) => (
                                    <div className={`flex items-center gap-1.5 font-bold text-sm ${
                                        item.stock <= 0 
                                        ? "text-rose-600" 
                                        : item.stock <= 10 
                                            ? "text-orange-500" 
                                            : "text-gray-600"
                                    }`}>
                                        {item.stock} <span className="text-[10px] text-gray-400 font-normal uppercase">{item.unit}</span>
                                    </div>
                                )
                            },
                            { 
                                label: 'Terakhir Diperbarui', 
                                key: 'updated_at',
                                render: (item) => (
                                    <span className="text-[11px] text-gray-400 font-medium">
                                        {new Date(item.inventory?.updated_at || item.updated_at).toLocaleString('id-ID')}
                                    </span>
                                )
                            }
                        ]}
                        onEdit={(item) => openEditModal(item)}
                        // Deleting stock is not needed, you delete the product instead
                        onDelete={null} 
                    />
                </div>

                {/* EDIT MODAL */}
                {modal && selectedProduct && (
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                        <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                            <div className="relative p-5">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                                >
                                    <X size={16} />
                                </button>

                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <SquarePen size={18} />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-800">Update Stok</h2>
                                        <p className="text-[11px] text-gray-400 font-medium">{selectedProduct.name}</p>
                                    </div>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Jumlah Stok</label>
                                            <input
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData("stock", e.target.value)}
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                            />
                                            {errors.stock && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.stock}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Unit</label>
                                            <input
                                                type="text"
                                                placeholder="pcs, porsi, dll"
                                                value={data.unit}
                                                onChange={(e) => setData("unit", e.target.value)}
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                            />
                                            {errors.unit && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.unit}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                            Catatan Penyesuaian
                                        </label>
                                        <textarea
                                            placeholder="Contoh: Barang masuk dari supplier, atau barang rusak"
                                            value={data.note}
                                            onChange={(e) => setData("note", e.target.value)}
                                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none h-20 resize-none"
                                        />
                                        {errors.note && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.note}</p>}
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
                                            className="flex-[2] py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm disabled:bg-blue-300 flex items-center justify-center gap-2"
                                        >
                                            <Save size={14} />
                                            {processing ? "Menyimpan..." : "Simpan Stok"}
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
