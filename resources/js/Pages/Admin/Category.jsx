import { React, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, usePage, Head } from "@inertiajs/react";
import Alert from "@/Components/Alert";
import AdminTable from "@/Components/AdminTable";
import { Plus, X, Layers, Tag, SquarePen } from "lucide-react";

const Category = ({ categories }) => {
    const { flash } = usePage().props;

    const [modal, setModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: "",
    });

    const openCreateModal = () => {
        setEditingCategory(null);
        reset();
        setModal(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setData("name", category.name);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setEditingCategory(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            put(route("category.update", editingCategory.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("category.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
            router.delete(route("category.destroy", id));
        }
    };

    return (
        <div className="p-4 max-w-6xl mx-auto space-y-4">
            <Head title="Manajemen Kategori" />
            
            <Alert type="success" message={flash?.success} />
            <Alert type="error" message={flash?.error} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                        <Layers size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Manajemen Kategori</h2>
                        <p className="text-gray-500 text-xs font-medium">Atur kategori menu untuk memudahkan pesanan.</p>
                    </div>
                </div>

                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm group"
                >
                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                    Tambah Kategori
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <AdminTable 
                    data={categories}
                    emptyMessage="Belum ada kategori. Klik tombol di atas untuk menambahkan."
                    columns={[
                        { 
                            label: 'Nama Kategori', 
                            key: 'name',
                            render: (item) => (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                        {item.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                                </div>
                            )
                        },
                        { 
                            label: 'ID Kategori', 
                            key: 'id',
                            render: (item) => (
                                <span className="text-xs font-mono text-gray-400">#{item.id}</span>
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
                    <div className="bg-white w-full max-w-sm rounded-xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                        <div className="relative p-5">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                            >
                                <X size={16} />
                            </button>

                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    {editingCategory ? <SquarePen size={18} /> : <Plus size={18} />}
                                </div>
                                <h2 className="text-base font-bold text-gray-800">
                                    {editingCategory ? "Edit Kategori" : "Kategori Baru"}
                                </h2>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                        <Tag size={12} className="text-blue-500" /> Nama Kategori
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Makanan Berat"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        autoFocus
                                    />
                                    {errors.name && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
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
                                        {processing ? "Memproses..." : (editingCategory ? "Simpan Perubahan" : "Simpan Kategori")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Category.layout = (page) => <AuthenticatedLayout children={page} />;
export default Category;
