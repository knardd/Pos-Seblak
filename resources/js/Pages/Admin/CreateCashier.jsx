import { useForm, router, usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import AdminTable from "@/Components/AdminTable";
import { Trash2, SquarePen, UserPlus, Users, X, Mail, Lock, UserCircle } from "lucide-react";

const CreateCashier = ({ users }) => {
    const { flash } = usePage().props;

    const [modal, setModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const openCreateModal = () => {
        setEditingUser(null);
        reset();
        setModal(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: "",
        });
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setEditingUser(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingUser) {
            put(route("cashier.update", editingUser.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("cashier.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus akun kasir ini?")) {
            router.delete(route("cashier.destroy", id));
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-4">
            <Head title="Manajemen Kasir" />
            
            <Alert type="success" message={flash?.success} />
            <Alert type="error" message={flash?.error} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm text-white">
                        <Users size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Manajemen Kasir</h2>
                        <p className="text-gray-500 text-xs font-medium">Kelola akun dan akses untuk staf kasir Anda.</p>
                    </div>
                </div>

                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all shadow-sm group"
                >
                    <UserPlus size={14} className="group-hover:scale-105 transition-transform duration-300" />
                    Tambah Kasir
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <AdminTable 
                    data={users}
                    emptyMessage="Belum ada akun kasir. Silakan tambahkan satu untuk memulai."
                    columns={[
                        { 
                            label: 'Informasi Kasir', 
                            key: 'name',
                            render: (item) => (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                        {item.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{item.email}</span>
                                    </div>
                                </div>
                            )
                        },
                        { 
                            label: 'Role', 
                            key: 'role',
                            render: (item) => (
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    item.role === 'admin' 
                                    ? "bg-purple-50 text-purple-600 border border-purple-100" 
                                    : "bg-blue-50 text-blue-600 border border-blue-100"
                                }`}>
                                    {item.role}
                                </span>
                            )
                        },
                        { 
                            label: 'Bergabung', 
                            key: 'created_at',
                            render: (item) => (
                                <div className="text-[11px] text-gray-500 font-medium">
                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
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
                                    {editingUser ? <SquarePen size={18} /> : <UserPlus size={18} />}
                                </div>
                                <h2 className="text-base font-bold text-gray-800">
                                    {editingUser ? "Edit Akun Kasir" : "Tambah Kasir Baru"}
                                </h2>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                        <UserCircle size={12} className="text-blue-500" /> Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nama Kasir"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                    {errors.name && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                        <Mail size={12} className="text-blue-500" /> Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="kasir@example.com"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                    {errors.email && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                        <Lock size={12} className="text-blue-500" /> Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder={editingUser ? "Kosongkan jika tetap" : "••••••••"}
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                    {errors.password && <p className="text-rose-500 text-[10px] mt-1 font-medium">{errors.password}</p>}
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
                                        {processing ? "Memproses..." : (editingUser ? "Simpan Perubahan" : "Simpan Akun")}
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

CreateCashier.layout = (page) => <AuthenticatedLayout children={page} />;

export default CreateCashier;
