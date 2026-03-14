import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, usePage, Head } from "@inertiajs/react";
import Alert from "@/Components/Alert";
import AdminTable from "@/Components/AdminTable";
import { Plus, Flame, Banknote } from "lucide-react";

const Level = ({ spicyLevels }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        level_name: "",
        extra_price: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("spicy.level.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus level ini?")) {
            router.delete(route("spicy.level.destroy", id));
        }
    };

    const flash = usePage().props.flash || {};

    return (
        <div className="p-4 max-w-5xl mx-auto space-y-4">
            <Head title="Manajemen Level Pedas" />
            
            <Alert type="success" message={flash.success} />
            <Alert type="error" message={flash.error} />

            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-600 rounded-xl shadow-sm">
                    <Flame className="text-white" size={18} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Level Pedas</h2>
                    <p className="text-gray-500 text-xs font-medium">Atur tingkat kepedasan dan biaya tambahannya.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-3">Tambah Level</h3>
                        
                        <form onSubmit={submit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Nama Level
                                </label>
                                <input
                                    type="text"
                                    value={data.level_name}
                                    onChange={(e) => setData("level_name", e.target.value)}
                                    placeholder="Contoh: Level 5"
                                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {errors.level_name && (
                                    <div className="text-red-500 text-[10px] mt-1 font-medium">{errors.level_name}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Harga Tambahan
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <span className="text-[10px] font-bold">Rp</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={data.extra_price}
                                        onChange={(e) => setData("extra_price", e.target.value)}
                                        className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                                {errors.extra_price && (
                                    <div className="text-red-500 text-[10px] mt-1 font-medium">{errors.extra_price}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm"
                            >
                                <Plus size={14} />
                                Simpan Level
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
                        <AdminTable 
                            data={spicyLevels}
                            emptyMessage="Belum ada level pedas. Mulai dengan menambahkan satu."
                            columns={[
                                { 
                                    label: 'Tingkat Pedas', 
                                    key: 'level_name',
                                    render: (item) => (
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                            <span className="font-semibold text-gray-800 text-sm">{item.level_name}</span>
                                        </div>
                                    )
                                },
                                { 
                                    label: 'Biaya Tambahan', 
                                    key: 'extra_price',
                                    render: (item) => (
                                        <div className="font-semibold text-emerald-600 text-sm">
                                            Rp {parseInt(item.extra_price).toLocaleString("id-ID")}
                                        </div>
                                    )
                                }
                            ]}
                            onEdit={(item) => {/* Spicy level update not yet implemented in controller */}}
                            onDelete={(id) => handleDelete(id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Level.layout = (page) => <AuthenticatedLayout children={page} />;
export default Level;
