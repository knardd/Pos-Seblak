import { useForm, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import { Trash2, SquarePen, UserPlus } from "lucide-react";

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
        if (confirm("Yakin hapus user?")) {
            router.delete(route("cashier.destroy", id));
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Alert type="success" message={flash?.success} />
            <Alert type="error" message={flash?.error} />

            <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                    Manajemen Cashier
                </h2>

                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow"
                >
                    <span className="flex items-center gap-2">
                        <UserPlus />
                        Tambah Cashier
                    </span>
                </button>

                {/* MODAL */}
                {modal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-400"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-bold mb-4 text-blue-600">
                                {editingUser
                                    ? "Edit Cashier"
                                    : "Tambah Cashier"}
                            </h2>

                            <form onSubmit={submit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nama"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-xl"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name}
                                    </p>
                                )}

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-xl"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email}
                                    </p>
                                )}

                                <input
                                    type="password"
                                    placeholder={
                                        editingUser
                                            ? "Password (opsional)"
                                            : "Password"
                                    }
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-xl"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold"
                                >
                                    {editingUser
                                        ? "Update Cashier"
                                        : "Tambah Cashier"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TABLE */}
                <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-50 text-blue-700">
                                <th className="p-3 text-left">Nama</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-center">Role</th>
                                <th className="p-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-blue-50"
                                >
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3 text-center">
                                        {user.role}
                                    </td>
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            <SquarePen size={16} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className="text-center text-gray-400 py-6">
                            Belum ada cashier
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

CreateCashier.layout = (page) => <AuthenticatedLayout children={page} />;

export default CreateCashier;
