import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, usePage } from "@inertiajs/react";
import Alert from "@/Components/Alert";
import { Trash2, Plus } from "lucide-react";

const Level = ({ spicyLevels }) => {
    // Sesuaikan dengan kolom di database: level_name dan extra_price
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
        <div className="p-6 max-w-4xl mx-auto">
            <Alert type="success" message={flash.success} />
            <Alert type="error" message={flash.error} />

            <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                    Manajemen Level Pedas
                </h2>

                {/* FORM TAMBAH */}
                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start mb-6"
                >
                    {/* Input Nama Level */}
                    <div className="flex-1">
                        <input
                            type="text"
                            value={data.level_name}
                            onChange={(e) =>
                                setData("level_name", e.target.value)
                            }
                            placeholder="Contoh: Level 5..."
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.level_name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.level_name}
                            </div>
                        )}
                    </div>

                    {/* Input Harga (Number) */}
                    <div className="flex-1">
                        <input
                            type="number"
                            value={data.extra_price}
                            onChange={(e) =>
                                setData("extra_price", e.target.value)
                            }
                            placeholder="Harga tambahan (0 jika gratis)"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.extra_price && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.extra_price}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-5 py-2 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 h-[42px]"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Plus size={20} />
                            Tambah
                        </span>
                    </button>
                </form>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-50 text-blue-700 text-left">
                                <th className="px-4 py-3">Nama Level</th>
                                <th className="px-4 py-3">Harga Tambahan</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spicyLevels.map((level) => (
                                <tr
                                    key={level.id}
                                    className="border-t hover:bg-blue-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-700">
                                        {level.level_name}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        Rp{" "}
                                        {parseInt(
                                            level.extra_price,
                                        ).toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() =>
                                                handleDelete(level.id)
                                            }
                                            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
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

                    {spicyLevels.length === 0 && (
                        <div className="text-center text-gray-400 py-10 italic">
                            Belum ada level pedas tersedia.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Level.layout = (page) => <AuthenticatedLayout children={page} />;
export default Level;
