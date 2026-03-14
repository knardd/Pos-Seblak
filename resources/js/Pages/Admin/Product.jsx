import { useForm, router, usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import AdminTable from "@/Components/AdminTable";
import { Trash2, SquarePen, Plus, ShoppingBasket, X, Tag } from "lucide-react";

const Product = ({ products, categories }) => {
    const { flash } = usePage().props;

    const [modal, setModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        category_id: "",
        name: "",
        price: "",
        cost_price: "",
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingProduct(null);
        reset();
        setModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setData({
            category_id: product.category_id,
            name: product.name,
            price: product.price,
            cost_price: product.cost_price,
            is_active: !!product.is_active,
        });
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setEditingProduct(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingProduct) {
            put(route("product.update", editingProduct.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("product.store"), {
                onSuccess: () => {
                    closeModal();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            router.delete(route("product.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4 max-w-7xl mx-auto space-y-4">
                <Head title="Manajemen Produk" />
                
                <Alert type="success" message={flash?.success} />
                <Alert type="error" message={flash?.error} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                            <ShoppingBasket size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Daftar Produk</h2>
                            <p className="text-gray-500 text-xs font-medium">Kelola informasi menu dan katalog Anda.</p>
                        </div>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm group"
                    >
                        <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                        Tambah Produk
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <AdminTable 
                        data={products}
                        emptyMessage="Belum ada produk. Klik tombol di atas untuk menambahkan."
                        columns={[
                            { 
                                label: 'Informasi Produk', 
                                key: 'name',
                                render: (item) => (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{item.category?.name || 'Tanpa Kategori'}</span>
                                    </div>
                                )
                            },
                            { 
                                label: 'Harga Modal', 
                                key: 'cost_price',
                                render: (item) => (
                                    <div className="font-semibold text-gray-500 text-xs italic">
                                        Rp {parseInt(item.cost_price || 0).toLocaleString("id-ID")}
                                    </div>
                                )
                            },
                            { 
                                label: 'Harga Jual', 
                                key: 'price',
                                render: (item) => (
                                    <div className="font-bold text-emerald-600 text-sm">
                                        Rp {parseInt(item.price).toLocaleString("id-ID")}
                                    </div>
                                )
                            },
                            { 
                                label: 'Status', 
                                key: 'is_active',
                                render: (item) => (
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        item.is_active 
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                        : "bg-rose-50 text-rose-600 border border-rose-100"
                                    }`}>
                                        {item.is_active ? "Aktif" : "Nonaktif"}
                                    </span>
                                )
                            }
                        ]}
                        onEdit={(item) => openEditModal(item)}
                        onDelete={(id) => handleDelete(id)}
                    />
                </div>

                {/* MODERN MODAL */}
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
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        {editingProduct ? <SquarePen size={18} /> : <Plus size={18} />}
                                    </div>
                                    <h2 className="text-base font-bold text-gray-800">
                                        {editingProduct ? "Edit Informasi Produk" : "Tambah Produk Baru"}
                                    </h2>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                                <Tag size={12} className="text-blue-500" /> Nama Produk
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Seblak Original"
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                            />
                                            {errors.name && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
                                            <select
                                                value={data.category_id}
                                                onChange={(e) => setData("category_id", e.target.value)}
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            {errors.category_id && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.category_id}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">Harga Modal (Rp)</label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={data.cost_price}
                                                    onChange={(e) => setData("cost_price", e.target.value)}
                                                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                                />
                                                {errors.cost_price && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.cost_price}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-1">Harga Jual (Rp)</label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={data.price}
                                                    onChange={(e) => setData("price", e.target.value)}
                                                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                                />
                                                {errors.price && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.price}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                                            <select
                                                value={data.is_active}
                                                onChange={(e) => setData("is_active", e.target.value === "true")}
                                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                            >
                                                <option value="true">Aktif</option>
                                                <option value="false">Nonaktif</option>
                                            </select>
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
                                            className="flex-[2] py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm disabled:bg-blue-300"
                                        >
                                            {processing ? "Memproses..." : (editingProduct ? "Simpan Perubahan" : "Simpan Produk")}
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
};

export default Product;
