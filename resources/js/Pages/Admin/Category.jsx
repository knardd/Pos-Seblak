import { React, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, usePage } from "@inertiajs/react";
import Alert from "@/Components/Alert";
import { Trash2, SquarePen, Plus } from "lucide-react";

const Category = ({ categories }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
    });

    const [editingId, setEditingId] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route("category.update", editingId), {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                },
            });
        } else {
            post(route("category.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);
        setData("name", category.name);
    };

    const handleDelete = (id) => {
        router.delete(route("category.destroy", id));
    };

    const flash = usePage().props.flash || {};
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* ALERT */}
            <Alert type="success" message={flash.success} />
            <Alert type="error" message={flash.error} />

            {/* CARD */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100">
                {/* TITLE */}
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                    Manajemen Kategori
                </h2>

                {/* FORM */}
                <form onSubmit={submit} className="flex gap-3 items-start mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Masukkan nama kategori..."
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-5 py-2 rounded-xl text-white font-medium transition 
                        ${
                            editingId
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {" "}
                        <span className="flex items-center gap-2">
                            <Plus />
                            {editingId ? "Update" : "Tambah"}
                        </span>
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                reset();
                            }}
                            className="px-5 py-2 rounded-xl bg-gray-400 hover:bg-gray-500 text-white font-medium"
                        >
                            Batal
                        </button>
                    )}
                </form>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-50 text-blue-700 text-left">
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="border-t hover:bg-blue-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {category.name}
                                    </td>

                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <SquarePen size={16} />
                                                Edit
                                            </span>
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Trash2 size={16} />
                                                Delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {categories.length === 0 && (
                        <div className="text-center text-gray-400 py-6">
                            Belum ada kategori
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Category.layout = (page) => <AuthenticatedLayout children={page} />;
export default Category;
